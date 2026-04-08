import type { Result } from '../shared/result';
import { ok, err } from '../shared/result';
import type { Appointment, CreateAppointmentInput } from './booking.types';
import type { IAppointmentRepository } from './ports/appointment.repository.port';
import type { ISSEEventBus } from '../infra/ports/sse-event-bus.port';

export class BookingService {
  constructor(
    private readonly repo: IAppointmentRepository,
    private readonly eventBus: ISSEEventBus,
    private readonly clock: () => Date = () => new Date(),
  ) {}

  async createAppointment(input: CreateAppointmentInput): Promise<Result<Appointment>> {
    const now = this.clock();

    if (input.startAt <= now) {
      return err({ code: 'APPOINTMENT_IN_PAST' });
    }

    const minAdvanceHours = input.minAdvanceHours ?? 0;
    const minAllowed = new Date(now.getTime() + minAdvanceHours * 60 * 60 * 1000);
    if (input.startAt < minAllowed) {
      return err({ code: 'BELOW_MIN_ADVANCE_NOTICE', minHours: minAdvanceHours });
    }

    // Idempotência: retorna agendamento existente sem criar duplicata
    const existing = await this.repo.findByIdempotencyKey(input.idempotencyKey);
    if (existing) {
      return ok(existing);
    }

    const appointment = await this.repo.create({
      professionalId: input.professionalId,
      patientId: input.patientId,
      startAt: input.startAt,
      endAt: input.endAt,
      serviceType: input.serviceType,
      idempotencyKey: input.idempotencyKey,
    });

    this.eventBus.publish({
      type: 'appointment_created',
      professionalId: appointment.professionalId,
      payload: { appointmentId: appointment.id, startAt: appointment.startAt },
    });

    return ok(appointment);
  }

  async cancelAppointment(id: string, requestedBy: 'patient' | 'professional'): Promise<Result<void>> {
    const appointment = await this.repo.findById(id);
    if (!appointment) {
      return err({ code: 'APPOINTMENT_NOT_FOUND', id });
    }

    const now = this.clock();
    if (appointment.startAt <= now) {
      return err({ code: 'APPOINTMENT_ALREADY_PAST', id });
    }

    await this.repo.updateStatus(id, 'cancelled');

    this.eventBus.publish({
      type: 'appointment_cancelled',
      professionalId: appointment.professionalId,
      payload: { appointmentId: id, requestedBy },
    });

    return ok(undefined);
  }

  async confirmAppointment(id: string): Promise<Result<void>> {
    const appointment = await this.repo.findById(id);
    if (!appointment) {
      return err({ code: 'APPOINTMENT_NOT_FOUND', id });
    }

    await this.repo.updateStatus(id, 'confirmed');

    this.eventBus.publish({
      type: 'appointment_confirmed',
      professionalId: appointment.professionalId,
      payload: { appointmentId: id },
    });

    return ok(undefined);
  }

  async getById(id: string): Promise<Result<Appointment>> {
    const appointment = await this.repo.findById(id);
    if (!appointment) {
      return err({ code: 'APPOINTMENT_NOT_FOUND', id });
    }
    return ok(appointment);
  }

  async getByDay(professionalId: string, date: Date): Promise<Result<Appointment[]>> {
    const appointments = await this.repo.findByDay(professionalId, date);
    return ok(appointments);
  }

  async getByWeek(professionalId: string, weekStart: Date): Promise<Result<Appointment[]>> {
    const appointments = await this.repo.findByWeek(professionalId, weekStart);
    return ok(appointments);
  }
}
