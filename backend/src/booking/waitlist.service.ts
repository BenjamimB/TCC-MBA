import type { Result } from '../shared/result';
import { ok, err } from '../shared/result';
import type { WaitlistEntry, AddToWaitlistInput, SlotReleasedInput, HandleSlotReleasedOutcome } from './waitlist.types';
import type { IWaitlistRepository } from './ports/waitlist.repository.port';
import type { IAppointmentRepository } from './ports/appointment.repository.port';
import type { IWhatsAppGateway } from '../infra/ports/whatsapp-gateway.port';
import type { BookingService } from './booking.service';

const MAX_NOTIFY_ATTEMPTS = 3;

export class WaitlistService {
  constructor(
    private readonly waitlistRepo: IWaitlistRepository,
    private readonly appointmentRepo: IAppointmentRepository,
    private readonly whatsapp: IWhatsAppGateway,
    private readonly bookingService: BookingService,
    private readonly clock: () => Date = () => new Date(),
  ) {}

  async addToWaitlist(input: AddToWaitlistInput): Promise<Result<WaitlistEntry>> {
    const entry = await this.waitlistRepo.add({
      professionalId: input.professionalId,
      patientId: input.patientId,
      patientPhone: input.patientPhone,
      desiredDate: input.desiredDate,
      desiredTimeRange: input.desiredTimeRange,
    });

    if (!entry) {
      return err({ code: 'ALREADY_IN_WAITLIST' });
    }

    return ok(entry);
  }

  async handleSlotReleased(input: SlotReleasedInput): Promise<Result<HandleSlotReleasedOutcome>> {
    const now = this.clock();
    const minAllowed = new Date(now.getTime() + input.minAdvanceHours * 60 * 60 * 1000);

    // AC 9.6: if slot is below minimum advance notice, release directly
    if (input.slotStartAt <= minAllowed) {
      return ok('slot_released_directly');
    }

    const desiredDate = input.slotStartAt.toISOString().slice(0, 10);
    const entries = await this.waitlistRepo.findPendingByProfessionalAndDate(
      input.professionalId,
      desiredDate,
    );

    if (entries.length === 0) {
      return ok('no_waitlist_entries');
    }

    for (const entry of entries) {
      // AC 9.5: skip patient that already has a confirmed appointment at the same time
      const dayAppointments = await this.appointmentRepo.findByDay(
        input.professionalId,
        input.slotStartAt,
      );
      const hasConflict = dayAppointments.some(
        (a) =>
          a.patientId === entry.patientId &&
          a.status === 'confirmed' &&
          a.startAt.getTime() === input.slotStartAt.getTime(),
      );

      if (hasConflict) {
        continue;
      }

      // Attempt to notify with retries
      let sent = false;
      for (let attempt = 1; attempt <= MAX_NOTIFY_ATTEMPTS; attempt++) {
        const result = await this.whatsapp.sendTemplate(entry.patientPhone, 'waitlist_slot_available', {
          date: desiredDate,
          time: input.slotStartAt.toISOString().slice(11, 16),
        });
        if (result.ok) {
          sent = true;
          break;
        }
      }

      if (!sent) {
        continue;
      }

      await this.waitlistRepo.updateStatus(entry.id, 'notified', this.clock());
      return ok('notified');
    }

    return ok('all_skipped');
  }

  async acceptWaitlistSlot(
    entryId: string,
    slotStartAt: Date,
    slotEndAt: Date,
    serviceType: string,
    idempotencyKey: string,
  ): Promise<Result<{ appointmentId: string }>> {
    const entry = await this.waitlistRepo.findById(entryId);
    if (!entry) {
      return err({ code: 'WAITLIST_ENTRY_NOT_FOUND', id: entryId });
    }

    const appointmentResult = await this.bookingService.createAppointment({
      professionalId: entry.professionalId,
      patientId: entry.patientId,
      startAt: slotStartAt,
      endAt: slotEndAt,
      serviceType,
      idempotencyKey,
    });

    if (!appointmentResult.ok) {
      return err(appointmentResult.error);
    }

    await this.waitlistRepo.updateStatus(entry.id, 'accepted');

    return ok({ appointmentId: appointmentResult.value.id });
  }

  async expireEntry(entryId: string): Promise<Result<void>> {
    const entry = await this.waitlistRepo.findById(entryId);
    if (!entry) {
      return err({ code: 'WAITLIST_ENTRY_NOT_FOUND', id: entryId });
    }

    await this.waitlistRepo.updateStatus(entry.id, 'expired');
    return ok(undefined);
  }

  async getByProfessional(professionalId: string): Promise<Result<WaitlistEntry[]>> {
    const entries = await this.waitlistRepo.findPendingByProfessional(professionalId);
    return ok(entries);
  }
}
