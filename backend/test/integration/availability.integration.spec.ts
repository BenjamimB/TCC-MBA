/**
 * Suite IT-AV — Gerenciamento de disponibilidade com banco real
 * Task: 3.1 | Requirements: BUG-02a, BUG-02b
 *
 * PostgreSQL: real | Redis: real | Email: NoOpNotificationService (no-op)
 * Detecta desalinhamento de contrato HTTP frontend↔backend (bugs BUG-02a e BUG-02b)
 */
import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/infra/prisma.service';

let app: INestApplication;
let prisma: PrismaService;
let professionalId: string;

async function truncate() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "availability", "professional"
    RESTART IDENTITY CASCADE
  `);
}

async function createProfessional(): Promise<string> {
  const prof = await prisma.professional.create({
    data: {
      email: 'dr-av@test.com',
      name: 'Dr. Availability',
      passwordHash: '$2b$10$placeholderHashForTests',
      emailVerifiedAt: new Date(),
    },
  });
  return prof.id;
}

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = module.createNestApplication();
  await app.init();
  prisma = app.get(PrismaService);
});

beforeEach(async () => {
  await truncate();
  professionalId = await createProfessional();
});

afterAll(async () => { await app.close(); });

// ---------------------------------------------------------------------------

describe('IT-AV — Availability (integração)', () => {

  const mondayConfig = {
    dayOfWeek: 1,
    startTime: '08:00',
    endTime: '17:00',
    slotDurationMinutes: 30,
    breakDurationMinutes: 10,
    isActive: true,
    minAdvanceHours: 2,
  };

  const sevenDays = [0, 1, 2, 3, 4, 5, 6].map((day) => ({
    dayOfWeek: day,
    startTime: '08:00',
    endTime: '17:00',
    slotDurationMinutes: 30,
    breakDurationMinutes: 10,
    isActive: true,
    minAdvanceHours: 2,
  }));

  // Partição P1 (válida): salvar 7 dias
  it('[IT-AV-01] PUT /schedule/availability?professionalId= salva 7 dias no banco', async () => {
    const res = await request(app.getHttpServer())
      .put(`/schedule/availability?professionalId=${professionalId}`)
      .send({ configs: sevenDays });

    expect(res.status).toBe(200);
    expect(res.body.message).toBeDefined();

    const rows = await prisma.availability.findMany({ where: { professionalId } });
    expect(rows.length).toBe(7);
  });

  // Partição P2 (válida): leitura
  it('[IT-AV-02] GET /schedule/availability?professionalId= retorna configs salvas', async () => {
    await prisma.availability.createMany({
      data: sevenDays.map((c) => ({
        professionalId,
        dayOfWeek: c.dayOfWeek,
        startTime: c.startTime,
        endTime: c.endTime,
        slotDurationMinutes: c.slotDurationMinutes,
        breakDurationMinutes: c.breakDurationMinutes,
        isActive: c.isActive,
      })),
    });

    const res = await request(app.getHttpServer())
      .get(`/schedule/availability?professionalId=${professionalId}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(7);
    const days = res.body.map((c: { dayOfWeek: number }) => c.dayOfWeek).sort();
    expect(days).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  // Partição P3 (inválida): endTime <= startTime
  it('[IT-AV-03] PUT com endTime <= startTime retorna 422 VALIDATION_ERROR', async () => {
    const res = await request(app.getHttpServer())
      .put(`/schedule/availability?professionalId=${professionalId}`)
      .send({ configs: [{ ...mondayConfig, startTime: '17:00', endTime: '08:00' }] });

    expect(res.status).toBe(422);
  });

  // Partição P4 (inválida): slotDurationMinutes < 15
  it('[IT-AV-04] PUT com slotDurationMinutes < 15 retorna 422 VALIDATION_ERROR', async () => {
    const res = await request(app.getHttpServer())
      .put(`/schedule/availability?professionalId=${professionalId}`)
      .send({ configs: [{ ...mondayConfig, slotDurationMinutes: 10 }] });

    expect(res.status).toBe(422);
  });

  // Partição P5 (válida): idempotência — upsert por dayOfWeek
  it('[IT-AV-05] PUT é idempotente — segundo PUT para mesmo dia não duplica linha', async () => {
    await request(app.getHttpServer())
      .put(`/schedule/availability?professionalId=${professionalId}`)
      .send({ configs: [mondayConfig] });

    await request(app.getHttpServer())
      .put(`/schedule/availability?professionalId=${professionalId}`)
      .send({ configs: [{ ...mondayConfig, startTime: '09:00' }] });

    const rows = await prisma.availability.findMany({
      where: { professionalId, dayOfWeek: 1 },
    });
    expect(rows.length).toBe(1);
    expect(rows[0].startTime).toBe('09:00');
  });

  // Partição P6 (contrato): BUG-02b — body como array direto
  it('[IT-AV-06] BUG-02b: body enviado como array direto retorna erro (backend espera { configs: [...] })', async () => {
    const res = await request(app.getHttpServer())
      .put(`/schedule/availability?professionalId=${professionalId}`)
      .send([mondayConfig]); // array direto, sem chave "configs"

    // Backend não encontra body.configs, por isso falhará (configs será undefined/null)
    expect(res.status).not.toBe(200);
  });
});
