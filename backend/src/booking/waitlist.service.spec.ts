/**
 * Task 7.3 — WaitlistService unit tests
 *
 * Cobre: adição à lista de espera, notificação FIFO após cancelamento,
 * aceitação de vaga, expiração e isolamento por profissional.
 * Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6
 */
import { WaitlistService } from './waitlist.service';
import type { IWaitlistRepository } from './ports/waitlist.repository.port';
import type { IAppointmentRepository } from './ports/appointment.repository.port';
import type { IWhatsAppGateway } from '../infra/ports/whatsapp-gateway.port';
import type { BookingService } from './booking.service';
import type { WaitlistEntry } from './waitlist.types';
import type { Appointment } from './booking.types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const FIXED_NOW = new Date('2025-06-10T10:00:00.000Z');
const PROF_ID = 'prof-1';
const PATIENT_A = 'patient-a';
const PATIENT_B = 'patient-b';
const PHONE_A = '+5511999990001';
const PHONE_B = '+5511999990002';
const DESIRED_DATE = '2025-06-12';
const SLOT_START = new Date('2025-06-12T14:00:00.000Z'); // 2 days ahead — above any min advance
const SLOT_END = new Date('2025-06-12T15:00:00.000Z');

function makeEntry(overrides: Partial<WaitlistEntry> = {}): WaitlistEntry {
  return {
    id: 'entry-1',
    professionalId: PROF_ID,
    patientId: PATIENT_A,
    patientPhone: PHONE_A,
    desiredDate: DESIRED_DATE,
    status: 'pending',
    createdAt: new Date('2025-06-10T08:00:00.000Z'),
    notifiedAt: null,
    ...overrides,
  };
}

function makeAppointment(overrides: Partial<Appointment> = {}): Appointment {
  return {
    id: 'appt-1',
    professionalId: PROF_ID,
    patientId: PATIENT_A,
    startAt: SLOT_START,
    endAt: SLOT_END,
    status: 'pending',
    serviceType: 'consulta',
    notes: null,
    externalCalendarEventId: null,
    idempotencyKey: 'idem-1',
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

describe('WaitlistService', () => {
  let service: WaitlistService;
  let waitlistRepo: jest.Mocked<IWaitlistRepository>;
  let appointmentRepo: jest.Mocked<IAppointmentRepository>;
  let whatsapp: jest.Mocked<IWhatsAppGateway>;
  let bookingService: jest.Mocked<BookingService>;

  beforeEach(() => {
    waitlistRepo = {
      add: jest.fn(),
      findPendingByProfessionalAndDate: jest.fn(),
      findPendingByProfessional: jest.fn(),
      findById: jest.fn(),
      updateStatus: jest.fn(),
    };
    appointmentRepo = {
      create: jest.fn(),
      findById: jest.fn(),
      findByIdempotencyKey: jest.fn(),
      findByDay: jest.fn(),
      findByWeek: jest.fn(),
      updateStatus: jest.fn(),
    };
    whatsapp = {
      sendTextMessage: jest.fn(),
      sendTemplate: jest.fn(),
      validateWebhookSignature: jest.fn(),
      parseWebhookPayload: jest.fn(),
    };
    bookingService = {
      createAppointment: jest.fn(),
      cancelAppointment: jest.fn(),
      confirmAppointment: jest.fn(),
      getById: jest.fn(),
      getByDay: jest.fn(),
      getByWeek: jest.fn(),
    } as unknown as jest.Mocked<BookingService>;

    service = new WaitlistService(waitlistRepo, appointmentRepo, whatsapp, bookingService, () => FIXED_NOW);
  });

  // =========================================================================
  // addToWaitlist()
  // =========================================================================

  describe('addToWaitlist()', () => {
    it('[TC-F-01] deve adicionar entrada com status pending e retornar id', async () => {
      const entry = makeEntry();
      waitlistRepo.add.mockResolvedValue(entry);

      const result = await service.addToWaitlist({
        professionalId: PROF_ID,
        patientId: PATIENT_A,
        patientPhone: PHONE_A,
        desiredDate: DESIRED_DATE,
      });

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.id).toBe('entry-1');
        expect(result.value.status).toBe('pending');
      }
    });

    it('[TC-F-02] deve retornar ALREADY_IN_WAITLIST quando já existe entrada duplicada', async () => {
      waitlistRepo.add.mockResolvedValue(null);

      const result = await service.addToWaitlist({
        professionalId: PROF_ID,
        patientId: PATIENT_A,
        patientPhone: PHONE_A,
        desiredDate: DESIRED_DATE,
      });

      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.error.code).toBe('ALREADY_IN_WAITLIST');
    });
  });

  // =========================================================================
  // handleSlotReleased()
  // =========================================================================

  describe('handleSlotReleased()', () => {
    const baseInput = {
      professionalId: PROF_ID,
      slotStartAt: SLOT_START,
      slotEndAt: SLOT_END,
      serviceType: 'consulta',
      minAdvanceHours: 1, // slot is 48h ahead → passes
    };

    it('[TC-F-03] deve ignorar lista quando slot tem antecedência inferior ao mínimo (AC 9.6)', async () => {
      const tooSoon = new Date(FIXED_NOW.getTime() + 30 * 60 * 1000); // 30 min ahead, min=1h

      const result = await service.handleSlotReleased({
        ...baseInput,
        slotStartAt: tooSoon,
        slotEndAt: new Date(tooSoon.getTime() + 60 * 60 * 1000),
        minAdvanceHours: 1,
      });

      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value).toBe('slot_released_directly');
      expect(waitlistRepo.findPendingByProfessionalAndDate).not.toHaveBeenCalled();
    });

    it('[TC-F-04] deve retornar no_waitlist_entries quando lista está vazia', async () => {
      waitlistRepo.findPendingByProfessionalAndDate.mockResolvedValue([]);

      const result = await service.handleSlotReleased(baseInput);

      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value).toBe('no_waitlist_entries');
    });

    it('[TC-F-05] deve notificar o primeiro da fila FIFO sem conflito', async () => {
      waitlistRepo.findPendingByProfessionalAndDate.mockResolvedValue([makeEntry()]);
      appointmentRepo.findByDay.mockResolvedValue([]); // no existing appointments
      whatsapp.sendTemplate.mockResolvedValue({ ok: true, value: { messageId: 'msg-1' } });
      waitlistRepo.updateStatus.mockResolvedValue(makeEntry({ status: 'notified', notifiedAt: FIXED_NOW }));

      const result = await service.handleSlotReleased(baseInput);

      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value).toBe('notified');
      expect(whatsapp.sendTemplate).toHaveBeenCalledWith(PHONE_A, 'waitlist_slot_available', expect.any(Object));
      expect(waitlistRepo.updateStatus).toHaveBeenCalledWith('entry-1', 'notified', expect.any(Date));
    });

    it('[TC-F-06] deve pular paciente com consulta confirmada no mesmo horário (AC 9.5)', async () => {
      const entryA = makeEntry({ id: 'entry-a', patientId: PATIENT_A, patientPhone: PHONE_A });
      const entryB = makeEntry({ id: 'entry-b', patientId: PATIENT_B, patientPhone: PHONE_B,
        createdAt: new Date('2025-06-10T09:00:00.000Z') });

      waitlistRepo.findPendingByProfessionalAndDate.mockResolvedValue([entryA, entryB]);

      // Patient A has a confirmed appointment at the same slot
      const conflictAppt = makeAppointment({ patientId: PATIENT_A, status: 'confirmed', startAt: SLOT_START });
      appointmentRepo.findByDay
        .mockResolvedValueOnce([conflictAppt]) // for entryA
        .mockResolvedValueOnce([]);            // for entryB

      whatsapp.sendTemplate.mockResolvedValue({ ok: true, value: { messageId: 'msg-2' } });
      waitlistRepo.updateStatus.mockResolvedValue(makeEntry({ id: 'entry-b', status: 'notified' }));

      const result = await service.handleSlotReleased(baseInput);

      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value).toBe('notified');
      // Only patient B was notified
      expect(whatsapp.sendTemplate).toHaveBeenCalledWith(PHONE_B, 'waitlist_slot_available', expect.any(Object));
    });

    it('[TC-F-07] deve pular e notificar próximo após 3 falhas de envio', async () => {
      const entryA = makeEntry({ id: 'entry-a', patientId: PATIENT_A, patientPhone: PHONE_A });
      const entryB = makeEntry({ id: 'entry-b', patientId: PATIENT_B, patientPhone: PHONE_B,
        createdAt: new Date('2025-06-10T09:00:00.000Z') });

      waitlistRepo.findPendingByProfessionalAndDate.mockResolvedValue([entryA, entryB]);
      appointmentRepo.findByDay.mockResolvedValue([]); // no conflicts

      // sendTemplate: fail 3 times for patient A, succeed for patient B
      whatsapp.sendTemplate
        .mockResolvedValueOnce({ ok: false, error: { code: 'SEND_FAILED' } })
        .mockResolvedValueOnce({ ok: false, error: { code: 'SEND_FAILED' } })
        .mockResolvedValueOnce({ ok: false, error: { code: 'SEND_FAILED' } })
        .mockResolvedValueOnce({ ok: true, value: { messageId: 'msg-b' } });

      waitlistRepo.updateStatus.mockResolvedValue(makeEntry({ id: 'entry-b', status: 'notified' }));

      const result = await service.handleSlotReleased(baseInput);

      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value).toBe('notified');
      expect(whatsapp.sendTemplate).toHaveBeenCalledTimes(4); // 3 fails + 1 success
      expect(waitlistRepo.updateStatus).toHaveBeenCalledWith('entry-b', 'notified', expect.any(Date));
    });

    it('[TC-F-12] deve retornar all_skipped quando todos candidatos têm conflito e fila se esgota', async () => {
      const entry = makeEntry({ patientId: PATIENT_A });
      waitlistRepo.findPendingByProfessionalAndDate.mockResolvedValue([entry]);

      const conflictAppt = makeAppointment({ patientId: PATIENT_A, status: 'confirmed', startAt: SLOT_START });
      appointmentRepo.findByDay.mockResolvedValue([conflictAppt]);

      const result = await service.handleSlotReleased(baseInput);

      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value).toBe('all_skipped');
    });
  });

  // =========================================================================
  // acceptWaitlistSlot()
  // =========================================================================

  describe('acceptWaitlistSlot()', () => {
    it('[TC-F-08] deve criar agendamento e marcar entrada como accepted', async () => {
      waitlistRepo.findById.mockResolvedValue(makeEntry());
      bookingService.createAppointment.mockResolvedValue({ ok: true, value: makeAppointment() });
      waitlistRepo.updateStatus.mockResolvedValue(makeEntry({ status: 'accepted' }));

      const result = await service.acceptWaitlistSlot('entry-1', SLOT_START, SLOT_END, 'consulta', 'idem-key');

      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value.appointmentId).toBe('appt-1');
      expect(waitlistRepo.updateStatus).toHaveBeenCalledWith('entry-1', 'accepted');
    });

    it('[TC-F-09] deve retornar WAITLIST_ENTRY_NOT_FOUND para entrada inexistente', async () => {
      waitlistRepo.findById.mockResolvedValue(null);

      const result = await service.acceptWaitlistSlot('non-existent', SLOT_START, SLOT_END, 'consulta', 'idem');

      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.error.code).toBe('WAITLIST_ENTRY_NOT_FOUND');
    });

    it('[TC-F-08b] deve propagar erro do BookingService quando slot já foi tomado', async () => {
      waitlistRepo.findById.mockResolvedValue(makeEntry());
      bookingService.createAppointment.mockResolvedValue({
        ok: false,
        error: { code: 'SLOT_NOT_AVAILABLE', slotId: 'slot-1' } as any,
      });

      const result = await service.acceptWaitlistSlot('entry-1', SLOT_START, SLOT_END, 'consulta', 'idem-key');

      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.error.code).toBe('SLOT_NOT_AVAILABLE');
      expect(waitlistRepo.updateStatus).not.toHaveBeenCalled();
    });
  });

  // =========================================================================
  // expireEntry()
  // =========================================================================

  describe('expireEntry()', () => {
    it('[TC-F-10] deve marcar entrada como expired', async () => {
      waitlistRepo.findById.mockResolvedValue(makeEntry({ status: 'notified' }));
      waitlistRepo.updateStatus.mockResolvedValue(makeEntry({ status: 'expired' }));

      const result = await service.expireEntry('entry-1');

      expect(result.ok).toBe(true);
      expect(waitlistRepo.updateStatus).toHaveBeenCalledWith('entry-1', 'expired');
    });

    it('[TC-F-10b] deve retornar WAITLIST_ENTRY_NOT_FOUND ao expirar entrada inexistente', async () => {
      waitlistRepo.findById.mockResolvedValue(null);

      const result = await service.expireEntry('non-existent');

      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.error.code).toBe('WAITLIST_ENTRY_NOT_FOUND');
    });
  });

  // =========================================================================
  // getByProfessional()
  // =========================================================================

  describe('getByProfessional()', () => {
    it('[TC-F-11] deve retornar entradas pendentes em ordem FIFO', async () => {
      const entries = [
        makeEntry({ id: 'entry-1', createdAt: new Date('2025-06-10T08:00:00.000Z') }),
        makeEntry({ id: 'entry-2', createdAt: new Date('2025-06-10T09:00:00.000Z') }),
      ];
      waitlistRepo.findPendingByProfessional.mockResolvedValue(entries);

      const result = await service.getByProfessional(PROF_ID);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toHaveLength(2);
        expect(result.value[0].id).toBe('entry-1');
        expect(result.value[1].id).toBe('entry-2');
      }
      expect(waitlistRepo.findPendingByProfessional).toHaveBeenCalledWith(PROF_ID);
    });
  });
});
