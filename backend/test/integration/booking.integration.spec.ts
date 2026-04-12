/**
 * Suite IT-B — Fluxo de agendamento com banco real
 * Task: 7.1 | Requirements: idempotência, unicidade de slot, contrato HTTP (BUG-01)
 *
 * PostgreSQL: real | Redis: real
 * Detecta BUG-01: frontend chamava GET /schedule/{id}/appointments/week
 *                 backend expõe GET /appointments/week?professionalId=...
 */
import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/infra/prisma.service';

let app: INestApplication;
let prisma: PrismaService;
let professionalId: string;
let patientId: string;

async function truncate() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "appointment", "patient", "professional"
    RESTART IDENTITY CASCADE
  `);
}

async function setup() {
  const prof = await prisma.professional.create({
    data: {
      email: 'dr-booking@test.com',
      name: 'Dr. Booking',
      passwordHash: '$2b$10$placeholderHashForTests',
      emailVerifiedAt: new Date(),
    },
  });
  professionalId = prof.id;

  const patient = await prisma.patient.create({
    data: {
      professionalId,
      phoneNumber: '+5511999990001',
      consentRecordedAt: new Date(),
    },
  });
  patientId = patient.id;
}

function futureDate(daysAhead = 7, hour = 10): Date {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + daysAhead);
  d.setUTCHours(hour, 0, 0, 0);
  return d;
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
  await setup();
});

afterAll(async () => { await app.close(); });

// ---------------------------------------------------------------------------

describe('IT-B — Booking (integração)', () => {

  function makeAppointmentBody(overrides: Partial<{
    startAt: Date;
    endAt: Date;
    idempotencyKey: string;
  }> = {}) {
    const startAt = overrides.startAt ?? futureDate(7, 10);
    const endAt = overrides.endAt ?? new Date(startAt.getTime() + 30 * 60_000);
    return {
      professionalId,
      patientId,
      startAt: startAt.toISOString(),
      endAt: endAt.toISOString(),
      serviceType: 'consulta',
      idempotencyKey: overrides.idempotencyKey ?? `idem-${Date.now()}-${Math.random()}`,
    };
  }

  // Partição P1 (válida): criação de agendamento
  it('[IT-B-01] POST /appointments cria agendamento e persiste no banco', async () => {
    const body = makeAppointmentBody();

    const res = await request(app.getHttpServer())
      .post('/appointments')
      .send(body);

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();

    const row = await prisma.appointment.findUnique({ where: { id: res.body.id } });
    expect(row).not.toBeNull();
    expect(row!.status).toBe('pending');
  });

  // Partição P2 (válida): idempotência
  it('[IT-B-02] segundo POST com mesma idempotencyKey retorna agendamento existente sem duplicar', async () => {
    const body = makeAppointmentBody({ idempotencyKey: 'fixed-key-idem-test' });

    const res1 = await request(app.getHttpServer()).post('/appointments').send(body);
    const res2 = await request(app.getHttpServer()).post('/appointments').send(body);

    expect(res1.status).toBe(201);
    // Controller não distingue create vs. found — retorna 201 em ambos
    expect([200, 201]).toContain(res2.status);
    expect(res1.body.id).toBe(res2.body.id);

    const count = await prisma.appointment.count({ where: { idempotencyKey: 'fixed-key-idem-test' } });
    expect(count).toBe(1);
  });

  // Partição P3 (inválida): slot duplo
  it('[IT-B-03] UNIQUE constraint (professionalId, startAt) impede dois agendamentos no mesmo horário', async () => {
    const startAt = futureDate(7, 10);
    const endAt = new Date(startAt.getTime() + 30 * 60_000);

    // Primeiro agendamento — chave diferente
    await request(app.getHttpServer()).post('/appointments').send({
      ...makeAppointmentBody({ startAt, endAt }),
      idempotencyKey: 'key-slot-1',
    });

    // Segundo agendamento — mesmo horário, chave diferente
    const res = await request(app.getHttpServer()).post('/appointments').send({
      ...makeAppointmentBody({ startAt, endAt }),
      idempotencyKey: 'key-slot-2',
    });

    // Espera erro (UNIQUE constraint ou SLOT_UNAVAILABLE)
    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  // Partição P4 (válida): cancelamento
  it('[IT-B-04] DELETE /appointments/:id cancela agendamento futuro', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/appointments')
      .send(makeAppointmentBody());

    expect(createRes.status).toBe(201);

    const deleteRes = await request(app.getHttpServer())
      .delete(`/appointments/${createRes.body.id}`);

    expect(deleteRes.status).toBe(204);

    const row = await prisma.appointment.findUnique({ where: { id: createRes.body.id } });
    expect(row!.status).toBe('cancelled');
  });

  // Partição P5 (inválida): cancelamento de agendamento passado
  it('[IT-B-05] DELETE /appointments/:id para agendamento passado retorna 422', async () => {
    // Inserir diretamente no banco com startAt no passado
    const startAt = new Date(Date.now() - 3600_000); // 1 hora atrás
    const endAt = new Date(startAt.getTime() + 30 * 60_000);

    const row = await prisma.appointment.create({
      data: {
        professionalId,
        patientId,
        startAt,
        endAt,
        serviceType: 'consulta',
        idempotencyKey: `past-idem-${Date.now()}`,
      },
    });

    const res = await request(app.getHttpServer())
      .delete(`/appointments/${row.id}`);

    expect(res.status).toBe(422);
  });

  // Partição P6 (contrato BUG-01): GET /appointments/week usa query params
  it('[IT-B-06] BUG-01: GET /appointments/week?professionalId=&weekStart= retorna agendamentos da semana', async () => {
    // Criar 2 agendamentos: um nesta semana, um na próxima
    const thisMonday = new Date();
    thisMonday.setUTCDate(thisMonday.getUTCDate() - thisMonday.getUTCDay() + 1);
    thisMonday.setUTCHours(10, 0, 0, 0);

    const nextMonday = new Date(thisMonday);
    nextMonday.setUTCDate(nextMonday.getUTCDate() + 7);

    await prisma.appointment.create({
      data: {
        professionalId, patientId,
        startAt: thisMonday,
        endAt: new Date(thisMonday.getTime() + 30 * 60_000),
        serviceType: 'consulta',
        idempotencyKey: `this-week-${Date.now()}`,
      },
    });

    await prisma.appointment.create({
      data: {
        professionalId, patientId,
        startAt: nextMonday,
        endAt: new Date(nextMonday.getTime() + 30 * 60_000),
        serviceType: 'consulta',
        idempotencyKey: `next-week-${Date.now()}`,
      },
    });

    const weekStart = thisMonday.toISOString().slice(0, 10);
    const res = await request(app.getHttpServer())
      .get(`/appointments/week?professionalId=${professionalId}&weekStart=${weekStart}`);

    // Confirma que o endpoint correto usa query params (não path params)
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1); // apenas o desta semana
  });

  // Partição P7 (válida): confirmação de agendamento
  it('[IT-B-07] PATCH /appointments/:id/confirm confirma agendamento pendente', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/appointments')
      .send(makeAppointmentBody());

    expect(createRes.status).toBe(201);

    const confirmRes = await request(app.getHttpServer())
      .patch(`/appointments/${createRes.body.id}/confirm`);

    expect(confirmRes.status).toBe(200);

    const row = await prisma.appointment.findUnique({ where: { id: createRes.body.id } });
    expect(row!.status).toBe('confirmed');
  });
});
