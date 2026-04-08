/**
 * Task 7.1 — BookingService unit tests
 *
 * Cobre: criar, cancelar, confirmar e consultar agendamentos com validação
 * de regras de negócio (passado, antecedência mínima, idempotência).
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.6, 5.7, 5.8, 5.10
 */
import { BookingService } from './booking.service';
import type { IAppointmentRepository } from './ports/appointment.repository.port';
import type { ISSEEventBus } from '../infra/ports/sse-event-bus.port';
import type { Appointment } from './booking.types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const FIXED_NOW = new Date('2025-06-10T10:00:00.000Z');
const PROF_ID = 'prof-1';
const PATIENT_ID = 'patient-1';

function futureDate(plusHours: number): Date {
  return new Date(FIXED_NOW.getTime() + plusHours * 60 * 60 * 1000);
}

function pastDate(minusHours: number): Date {
  return new Date(FIXED_NOW.getTime() - minusHours * 60 * 60 * 1000);
}

function makeAppointment(overrides: Partial<Appointment> = {}): Appointment {
  return {
    id: 'appt-1',
    professionalId: PROF_ID,
    patientId: PATIENT_ID,
    startAt: futureDate(2),
    endAt: futureDate(3),
    status: 'pending',
    serviceType: 'consulta',
    notes: null,
    externalCalendarEventId: null,
    idempotencyKey: 'idem-key-1',
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

describe('BookingService', () => {
  let service: BookingService;
  let repo: jest.Mocked<IAppointmentRepository>;
  let eventBus: jest.Mocked<ISSEEventBus>;

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      findById: jest.fn(),
      findByIdempotencyKey: jest.fn(),
      findByDay: jest.fn(),
      findByWeek: jest.fn(),
      updateStatus: jest.fn(),
    };
    eventBus = {
      publish: jest.fn(),
      subscribe: jest.fn(),
    };
    service = new BookingService(repo, eventBus, () => FIXED_NOW);
  });

  // =========================================================================
  // createAppointment()
  // =========================================================================

  describe('createAppointment()', () => {
    it('[TC-F-01] deve criar agendamento com dados válidos e horário futuro', async () => {
      repo.findByIdempotencyKey.mockResolvedValue(null);
      const appt = makeAppointment();
      repo.create.mockResolvedValue(appt);

      const result = await service.createAppointment({
        professionalId: PROF_ID,
        patientId: PATIENT_ID,
        startAt: futureDate(2),
        endAt: futureDate(3),
        serviceType: 'consulta',
        idempotencyKey: 'idem-key-1',
      });

      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value.id).toBe('appt-1');
    });

    it('[TC-F-02] deve retornar APPOINTMENT_IN_PAST quando startAt está no passado', async () => {
      const result = await service.createAppointment({
        professionalId: PROF_ID,
        patientId: PATIENT_ID,
        startAt: pastDate(1),
        endAt: pastDate(0.5),
        serviceType: 'consulta',
        idempotencyKey: 'idem-key-1',
      });

      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.error.code).toBe('APPOINTMENT_IN_PAST');
    });

    it('[TC-F-03] deve retornar BELOW_MIN_ADVANCE_NOTICE quando não respeita antecedência mínima', async () => {
      const result = await service.createAppointment({
        professionalId: PROF_ID,
        patientId: PATIENT_ID,
        startAt: futureDate(1),   // 1h no futuro
        endAt: futureDate(2),
        serviceType: 'consulta',
        idempotencyKey: 'idem-key-1',
        minAdvanceHours: 2,        // exige 2h
      });

      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.error.code).toBe('BELOW_MIN_ADVANCE_NOTICE');
    });

    it('[TC-F-04] deve retornar agendamento existente quando idempotencyKey já foi usada', async () => {
      const existing = makeAppointment({ id: 'appt-existing' });
      repo.findByIdempotencyKey.mockResolvedValue(existing);

      const result = await service.createAppointment({
        professionalId: PROF_ID,
        patientId: PATIENT_ID,
        startAt: futureDate(2),
        endAt: futureDate(3),
        serviceType: 'consulta',
        idempotencyKey: 'idem-key-1',
      });

      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value.id).toBe('appt-existing');
      expect(repo.create).not.toHaveBeenCalled();
    });

    it('[TC-F-05] deve publicar evento AppointmentCreated após criar agendamento', async () => {
      repo.findByIdempotencyKey.mockResolvedValue(null);
      repo.create.mockResolvedValue(makeAppointment());

      await service.createAppointment({
        professionalId: PROF_ID,
        patientId: PATIENT_ID,
        startAt: futureDate(2),
        endAt: futureDate(3),
        serviceType: 'consulta',
        idempotencyKey: 'idem-key-1',
      });

      expect(eventBus.publish).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'appointment_created', professionalId: PROF_ID }),
      );
    });

    it('[TC-F-06] não deve publicar evento quando idempotencyKey já existe', async () => {
      repo.findByIdempotencyKey.mockResolvedValue(makeAppointment());

      await service.createAppointment({
        professionalId: PROF_ID,
        patientId: PATIENT_ID,
        startAt: futureDate(2),
        endAt: futureDate(3),
        serviceType: 'consulta',
        idempotencyKey: 'idem-key-1',
      });

      expect(eventBus.publish).not.toHaveBeenCalled();
    });
  });

  // =========================================================================
  // cancelAppointment()
  // =========================================================================

  describe('cancelAppointment()', () => {
    it('[TC-F-07] deve cancelar agendamento futuro com sucesso', async () => {
      repo.findById.mockResolvedValue(makeAppointment());
      repo.updateStatus.mockResolvedValue(makeAppointment({ status: 'cancelled' }));

      const result = await service.cancelAppointment('appt-1', 'patient');

      expect(result.ok).toBe(true);
      expect(repo.updateStatus).toHaveBeenCalledWith('appt-1', 'cancelled');
    });

    it('[TC-F-08] deve retornar APPOINTMENT_NOT_FOUND quando agendamento não existe', async () => {
      repo.findById.mockResolvedValue(null);

      const result = await service.cancelAppointment('inexistente', 'patient');

      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.error.code).toBe('APPOINTMENT_NOT_FOUND');
    });

    it('[TC-F-09] deve retornar APPOINTMENT_ALREADY_PAST quando startAt está no passado', async () => {
      repo.findById.mockResolvedValue(makeAppointment({ startAt: pastDate(2), endAt: pastDate(1) }));

      const result = await service.cancelAppointment('appt-1', 'patient');

      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.error.code).toBe('APPOINTMENT_ALREADY_PAST');
    });

    it('[TC-F-10] deve publicar evento AppointmentCancelled após cancelar', async () => {
      repo.findById.mockResolvedValue(makeAppointment());
      repo.updateStatus.mockResolvedValue(makeAppointment({ status: 'cancelled' }));

      await service.cancelAppointment('appt-1', 'patient');

      expect(eventBus.publish).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'appointment_cancelled', professionalId: PROF_ID }),
      );
    });
  });

  // =========================================================================
  // confirmAppointment()
  // =========================================================================

  describe('confirmAppointment()', () => {
    it('[TC-F-11] deve confirmar agendamento pendente com sucesso', async () => {
      repo.findById.mockResolvedValue(makeAppointment());
      repo.updateStatus.mockResolvedValue(makeAppointment({ status: 'confirmed' }));

      const result = await service.confirmAppointment('appt-1');

      expect(result.ok).toBe(true);
      expect(repo.updateStatus).toHaveBeenCalledWith('appt-1', 'confirmed');
    });

    it('[TC-F-12] deve retornar APPOINTMENT_NOT_FOUND quando agendamento não existe', async () => {
      repo.findById.mockResolvedValue(null);

      const result = await service.confirmAppointment('inexistente');

      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.error.code).toBe('APPOINTMENT_NOT_FOUND');
    });

    it('[TC-F-13] deve publicar evento AppointmentConfirmed após confirmar', async () => {
      repo.findById.mockResolvedValue(makeAppointment());
      repo.updateStatus.mockResolvedValue(makeAppointment({ status: 'confirmed' }));

      await service.confirmAppointment('appt-1');

      expect(eventBus.publish).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'appointment_confirmed', professionalId: PROF_ID }),
      );
    });
  });

  // =========================================================================
  // getById() / getByDay() / getByWeek()
  // =========================================================================

  describe('getById()', () => {
    it('[TC-F-14] deve retornar agendamento existente por id', async () => {
      repo.findById.mockResolvedValue(makeAppointment());

      const result = await service.getById('appt-1');

      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value.id).toBe('appt-1');
    });

    it('[TC-F-15] deve retornar APPOINTMENT_NOT_FOUND para id inexistente', async () => {
      repo.findById.mockResolvedValue(null);

      const result = await service.getById('inexistente');

      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.error.code).toBe('APPOINTMENT_NOT_FOUND');
    });
  });

  describe('getByDay()', () => {
    it('[TC-F-16] deve retornar agendamentos do dia', async () => {
      repo.findByDay.mockResolvedValue([makeAppointment(), makeAppointment({ id: 'appt-2' })]);

      const result = await service.getByDay(PROF_ID, FIXED_NOW);

      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value).toHaveLength(2);
    });
  });

  describe('getByWeek()', () => {
    it('[TC-F-17] deve retornar agendamentos da semana', async () => {
      repo.findByWeek.mockResolvedValue([makeAppointment()]);

      const result = await service.getByWeek(PROF_ID, FIXED_NOW);

      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value).toHaveLength(1);
    });
  });
});
