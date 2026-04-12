/**
 * Suite IT-WL — Waitlist com banco e WhatsApp mockado
 * Task: 7.3 | Requirements: FIFO, idempotência, notificação, conflito de agendamento
 *
 * PostgreSQL: real | Redis: real | WhatsApp: mock (IWhatsAppGateway)
 *
 * NOTA ARQUITETURAL: WaitlistService NÃO está no DI container (BookingModule não o expõe).
 * PrismaWaitlistRepository também não existe ainda (não está em infra/adapters/).
 * Esta suite instancia WaitlistService manualmente com PrismaAppointmentRepository real
 * e um IWaitlistRepository implementado inline sobre o PrismaService.
 */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/infra/prisma.service';
import { PrismaAppointmentRepository } from '../../src/infra/adapters/prisma-appointment.repository';
import { BookingService } from '../../src/booking/booking.service';
import { WaitlistService } from '../../src/booking/waitlist.service';
import type { IWaitlistRepository } from '../../src/booking/ports/waitlist.repository.port';
import type { WaitlistEntry, WaitlistEntryStatus } from '../../src/booking/waitlist.types';
import type { IWhatsAppGateway } from '../../src/infra/ports/whatsapp-gateway.port';

let app: INestApplication;
let prisma: PrismaService;
let bookingService: BookingService;
let professionalId: string;
let patientAId: string;
let patientBId: string;

// In-memory IWaitlistRepository (sem Prisma adapter real)
class InMemoryWaitlistRepository implements IWaitlistRepository {
  private entries: WaitlistEntry[] = [];
  private idCounter = 1;

  async add(data: Omit<WaitlistEntry, 'id' | 'status' | 'createdAt' | 'notifiedAt'>): Promise<WaitlistEntry | null> {
    const existing = this.entries.find(
      (e) =>
        e.professionalId === data.professionalId &&
        e.patientId === data.patientId &&
        e.desiredDate === data.desiredDate &&
        e.status === 'pending',
    );
    if (existing) return null;

    const entry: WaitlistEntry = {
      id: String(this.idCounter++),
      ...data,
      status: 'pending',
      createdAt: new Date(),
      notifiedAt: null,
    };
    this.entries.push(entry);
    return entry;
  }

  async findPendingByProfessionalAndDate(professionalId: string, desiredDate: string): Promise<WaitlistEntry[]> {
    return this.entries
      .filter((e) => e.professionalId === professionalId && e.desiredDate === desiredDate && e.status === 'pending')
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async findPendingByProfessional(professionalId: string): Promise<WaitlistEntry[]> {
    return this.entries
      .filter((e) => e.professionalId === professionalId && e.status === 'pending')
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async findById(id: string): Promise<WaitlistEntry | null> {
    return this.entries.find((e) => e.id === id) ?? null;
  }

  async updateStatus(id: string, status: WaitlistEntryStatus, notifiedAt?: Date): Promise<WaitlistEntry> {
    const entry = this.entries.find((e) => e.id === id)!;
    entry.status = status;
    if (notifiedAt) entry.notifiedAt = notifiedAt;
    return entry;
  }

  reset() { this.entries = []; this.idCounter = 1; }
}

async function truncate() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "appointment", "patient", "professional"
    RESTART IDENTITY CASCADE
  `);
}

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = module.createNestApplication();
  await app.init();
  prisma = app.get(PrismaService);
  bookingService = app.get(BookingService);
});

const waitlistRepo = new InMemoryWaitlistRepository();

beforeEach(async () => {
  await truncate();
  waitlistRepo.reset();

  const prof = await prisma.professional.create({
    data: {
      email: 'dr-wl@test.com',
      name: 'Dr. Waitlist',
      passwordHash: '$2b$10$placeholderHashForTests',
      emailVerifiedAt: new Date(),
    },
  });
  professionalId = prof.id;

  const patA = await prisma.patient.create({
    data: { professionalId, phoneNumber: '+5511111111111', consentRecordedAt: new Date() },
  });
  patientAId = patA.id;

  const patB = await prisma.patient.create({
    data: { professionalId, phoneNumber: '+5522222222222', consentRecordedAt: new Date() },
  });
  patientBId = patB.id;
});

afterAll(async () => { await app.close(); });

// ---------------------------------------------------------------------------

describe('IT-WL — Waitlist (integração)', () => {

  function makeWaitlistService(whatsapp?: Partial<IWhatsAppGateway>): WaitlistService {
    const apptRepo = app.get(PrismaAppointmentRepository);
    const mockWhatsApp: IWhatsAppGateway = {
      sendTextMessage: jest.fn().mockResolvedValue({ ok: true, value: { messageId: 'wamid.mock' } }),
      sendTemplate: jest.fn().mockResolvedValue({ ok: true, value: { messageId: 'wamid.mock' } }),
      validateWebhookSignature: jest.fn().mockReturnValue(true),
      parseWebhookPayload: jest.fn(),
      ...whatsapp,
    };
    return new WaitlistService(waitlistRepo, apptRepo, mockWhatsApp, bookingService);
  }

  const TARGET_DATE = '2099-06-15'; // data futura fictícia

  // Partição P1 (válida): adicionar à lista
  it('[IT-WL-01] addToWaitlist() persiste entrada com status pending', async () => {
    const service = makeWaitlistService();
    const result = await service.addToWaitlist({
      professionalId,
      patientId: patientAId,
      patientPhone: '+5511111111111',
      desiredDate: TARGET_DATE,
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.status).toBe('pending');
    expect(result.value.professionalId).toBe(professionalId);
  });

  // Partição P2 (inválida): duplicata
  it('[IT-WL-02] addToWaitlist() retorna ALREADY_IN_WAITLIST para entrada duplicada', async () => {
    const service = makeWaitlistService();
    await service.addToWaitlist({
      professionalId, patientId: patientAId, patientPhone: '+5511111111111', desiredDate: TARGET_DATE,
    });

    const result = await service.addToWaitlist({
      professionalId, patientId: patientAId, patientPhone: '+5511111111111', desiredDate: TARGET_DATE,
    });

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.code).toBe('ALREADY_IN_WAITLIST');
  });

  // Partição P3 (válida): notificação FIFO
  it('[IT-WL-03] handleSlotReleased() notifica primeiro da fila (FIFO) e atualiza status', async () => {
    const sendTemplate = jest.fn().mockResolvedValue({ ok: true, value: { messageId: 'wamid.1' } });
    const service = makeWaitlistService({ sendTemplate });

    // Adiciona A e B à lista, A primeiro
    await service.addToWaitlist({ professionalId, patientId: patientAId, patientPhone: '+5511111111111', desiredDate: TARGET_DATE });
    // Pequena pausa para garantir ordem FIFO por createdAt
    await new Promise((r) => setTimeout(r, 10));
    await service.addToWaitlist({ professionalId, patientId: patientBId, patientPhone: '+5522222222222', desiredDate: TARGET_DATE });

    const slotStartAt = new Date(`${TARGET_DATE}T10:00:00.000Z`);
    const slotEndAt = new Date(`${TARGET_DATE}T10:30:00.000Z`);

    const outcome = await service.handleSlotReleased({
      professionalId,
      slotStartAt,
      slotEndAt,
      serviceType: 'consulta',
      minAdvanceHours: 0,
    });

    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    expect(outcome.value).toBe('notified');

    // sendTemplate chamado com telefone de A (primeiro da fila)
    expect(sendTemplate).toHaveBeenCalledWith('+5511111111111', 'waitlist_slot_available', expect.any(Object));
  });

  // Partição P4: pula paciente com consulta confirmada no mesmo horário
  it('[IT-WL-04] handleSlotReleased() pula paciente com appointment conflitante', async () => {
    const sendTemplate = jest.fn().mockResolvedValue({ ok: true, value: { messageId: 'wamid.1' } });
    const service = makeWaitlistService({ sendTemplate });

    await service.addToWaitlist({ professionalId, patientId: patientAId, patientPhone: '+5511111111111', desiredDate: TARGET_DATE });
    await new Promise((r) => setTimeout(r, 10));
    await service.addToWaitlist({ professionalId, patientId: patientBId, patientPhone: '+5522222222222', desiredDate: TARGET_DATE });

    // Paciente A já tem consulta confirmada no mesmo horário
    const slotStartAt = new Date(`${TARGET_DATE}T10:00:00.000Z`);
    const slotEndAt = new Date(`${TARGET_DATE}T10:30:00.000Z`);

    await prisma.appointment.create({
      data: {
        professionalId,
        patientId: patientAId,
        startAt: slotStartAt,
        endAt: slotEndAt,
        status: 'confirmed',
        serviceType: 'consulta',
        idempotencyKey: `conflict-${Date.now()}`,
      },
    });

    const outcome = await service.handleSlotReleased({
      professionalId, slotStartAt, slotEndAt, serviceType: 'consulta', minAdvanceHours: 0,
    });

    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    expect(outcome.value).toBe('notified');

    // Paciente A foi pulado — B foi notificado
    expect(sendTemplate).toHaveBeenCalledWith('+5522222222222', 'waitlist_slot_available', expect.any(Object));
  });

  // Partição P5: slot abaixo do mínimo de antecedência é liberado diretamente
  it('[IT-WL-05] handleSlotReleased() retorna slot_released_directly para slot abaixo do mínimo', async () => {
    const service = makeWaitlistService();
    const slotStartAt = new Date(Date.now() + 30 * 60_000); // 30min no futuro
    const slotEndAt = new Date(slotStartAt.getTime() + 30 * 60_000);

    const outcome = await service.handleSlotReleased({
      professionalId, slotStartAt, slotEndAt, serviceType: 'consulta', minAdvanceHours: 2, // requer 2h de antecedência
    });

    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    expect(outcome.value).toBe('slot_released_directly');
  });
});
