/**
 * Suite IT-SC — Cálculo de slots com banco e Redis reais
 * Task: 3.2 | Requirements: performance < 200ms, Redis reservation
 *
 * PostgreSQL: real | Redis: real
 */
import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/infra/prisma.service';
import { RedisService } from '../../src/infra/redis.service';

let app: INestApplication;
let prisma: PrismaService;
let redis: RedisService;
let professionalId: string;

async function truncate() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "appointment", "availability", "patient", "professional"
    RESTART IDENTITY CASCADE
  `);
}

async function flushRedis() {
  await redis.client.flushdb();
}

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = module.createNestApplication();
  await app.init();
  prisma = app.get(PrismaService);
  redis = app.get(RedisService);
});

beforeEach(async () => {
  await truncate();
  await flushRedis();
  const prof = await prisma.professional.create({
    data: {
      email: 'dr-sc@test.com',
      name: 'Dr. Slots',
      passwordHash: '$2b$10$placeholderHashForTests',
      emailVerifiedAt: new Date(),
    },
  });
  professionalId = prof.id;
});

afterAll(async () => { await app.close(); });

// ---------------------------------------------------------------------------

describe('IT-SC — Slot Calculation (integração)', () => {

  // Próxima segunda-feira (para garantir que o slot está no futuro)
  function nextMonday(): string {
    const d = new Date();
    d.setUTCHours(0, 0, 0, 0);
    const day = d.getUTCDay();
    const daysUntilMonday = day === 1 ? 7 : (8 - day) % 7 || 7;
    d.setUTCDate(d.getUTCDate() + daysUntilMonday);
    return d.toISOString().slice(0, 10);
  }

  async function createAvailability(dayOfWeek = 1) {
    await prisma.availability.create({
      data: {
        professionalId,
        dayOfWeek,
        startTime: '08:00',
        endTime: '10:00',
        slotDurationMinutes: 30,
        breakDurationMinutes: 10,
        isActive: true,
        minAdvanceHours: 0,
      },
    });
  }

  // Partição P1 (válida): retorna slots disponíveis
  it('[IT-SC-01] GET /schedule/slots retorna slots para dia com disponibilidade configurada', async () => {
    await createAvailability(1); // segunda-feira
    const monday = nextMonday();

    const res = await request(app.getHttpServer())
      .get(`/schedule/slots?professionalId=${professionalId}&from=${monday}&to=${monday}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    // Formato do slotId: {profId}:{date}:{HHmm}
    const firstSlot = res.body[0];
    expect(firstSlot.slotId).toMatch(new RegExp(`^${professionalId}:${monday}:\\d{4}$`));
    expect(firstSlot.startAt).toBeDefined();
    expect(firstSlot.endAt).toBeDefined();
    expect(firstSlot.isReserved).toBe(false);
  });

  // Partição P2: slot com agendamento confirmado é excluído
  it('[IT-SC-02] exclui slot com agendamento confirmado no banco', async () => {
    await createAvailability(1);
    const monday = nextMonday();

    // Criar um paciente e um agendamento no primeiro slot (08:00)
    const patient = await prisma.patient.create({
      data: {
        professionalId,
        phoneNumber: '+5511999990001',
        consentRecordedAt: new Date(),
      },
    });

    const slotStart = new Date(`${monday}T08:00:00.000Z`);
    const slotEnd = new Date(`${monday}T08:30:00.000Z`);

    await prisma.appointment.create({
      data: {
        professionalId,
        patientId: patient.id,
        startAt: slotStart,
        endAt: slotEnd,
        status: 'confirmed',
        serviceType: 'consulta',
        idempotencyKey: `test-idem-${Date.now()}`,
      },
    });

    const res = await request(app.getHttpServer())
      .get(`/schedule/slots?professionalId=${professionalId}&from=${monday}&to=${monday}`);

    expect(res.status).toBe(200);
    const bookedSlotIds = res.body
      .filter((s: { slotId: string }) => s.slotId.endsWith(':0800'));
    expect(bookedSlotIds.length).toBe(0);
  });

  // Partição P3: slot com lock Redis ativo é marcado isReserved=true
  it('[IT-SC-03] marca isReserved=true para slot com lock Redis ativo', async () => {
    await createAvailability(1);
    const monday = nextMonday();

    const slotId = `${professionalId}:${monday}:0800`;
    await redis.client.set(`slot:${slotId}`, 'session-abc', 'EX', 600);

    const res = await request(app.getHttpServer())
      .get(`/schedule/slots?professionalId=${professionalId}&from=${monday}&to=${monday}`);

    expect(res.status).toBe(200);
    const reservedSlot = res.body.find((s: { slotId: string }) => s.slotId === slotId);
    expect(reservedSlot).toBeDefined();
    expect(reservedSlot!.isReserved).toBe(true);
  });

  // Partição P4: dia inativo retorna lista vazia
  it('[IT-SC-05] retorna lista vazia para dia inativo', async () => {
    await prisma.availability.create({
      data: {
        professionalId,
        dayOfWeek: 1,
        startTime: '08:00',
        endTime: '10:00',
        slotDurationMinutes: 30,
        breakDurationMinutes: 10,
        isActive: false,
        minAdvanceHours: 0,
      },
    });
    const monday = nextMonday();

    const res = await request(app.getHttpServer())
      .get(`/schedule/slots?professionalId=${professionalId}&from=${monday}&to=${monday}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  // Performance: resposta < 200ms
  it('[IT-SC-04] resposta GET /schedule/slots em < 200ms para 7 dias', async () => {
    // Criar disponibilidade para segunda a sexta
    for (const day of [1, 2, 3, 4, 5]) {
      await prisma.availability.create({
        data: {
          professionalId,
          dayOfWeek: day,
          startTime: '08:00',
          endTime: '18:00',
          slotDurationMinutes: 30,
          breakDurationMinutes: 10,
          isActive: true,
          minAdvanceHours: 0,
        },
      });
    }

    const monday = nextMonday();
    const friday = new Date(monday);
    friday.setUTCDate(friday.getUTCDate() + 4);
    const fridayStr = friday.toISOString().slice(0, 10);

    const start = Date.now();
    const res = await request(app.getHttpServer())
      .get(`/schedule/slots?professionalId=${professionalId}&from=${monday}&to=${fridayStr}`);
    const elapsed = Date.now() - start;

    expect(res.status).toBe(200);
    expect(elapsed).toBeLessThan(200);
  });
});
