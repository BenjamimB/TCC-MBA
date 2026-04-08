import type { Result } from '../shared/result';
import { ok } from '../shared/result';
import type { TimeSlot } from './availability.types';
import type { IAvailabilityRepository } from './ports/availability.repository.port';
import type { IAppointmentQuery, BookedSlot } from './ports/appointment-query.port';
import type { ISlotReservationChecker } from './ports/slot-reservation.port';

export class SlotCalculationService {
  constructor(
    private readonly availRepo: IAvailabilityRepository,
    private readonly appointmentQuery: IAppointmentQuery,
    private readonly slotReservation: ISlotReservationChecker,
    private readonly clock: () => Date = () => new Date(),
  ) {}

  async getAvailableSlots(professionalId: string, from: Date, to: Date): Promise<Result<TimeSlot[]>> {
    const availabilities = await this.availRepo.findByProfessional(professionalId);
    const now = this.clock();

    // Expande o intervalo to incluir todos os milissegundos do dia final
    const rangeEnd = new Date(to);
    rangeEnd.setUTCHours(23, 59, 59, 999);

    const bookedSlots = await this.appointmentQuery.findBookedSlots(professionalId, from, rangeEnd);

    const slots: TimeSlot[] = [];
    const current = new Date(from);
    current.setUTCHours(0, 0, 0, 0);

    while (current <= rangeEnd) {
      const dayOfWeek = current.getUTCDay();
      const avail = availabilities.find((a) => a.dayOfWeek === dayOfWeek && a.isActive);

      if (avail) {
        const [startH, startM] = avail.startTime.split(':').map(Number);
        const [endH, endM] = avail.endTime.split(':').map(Number);
        const endMinutes = endH * 60 + endM;
        const stepMinutes = avail.slotDurationMinutes + avail.breakDurationMinutes;

        let slotStartMinutes = startH * 60 + startM;

        while (slotStartMinutes + avail.slotDurationMinutes <= endMinutes) {
          const slotStart = new Date(current);
          slotStart.setUTCHours(Math.floor(slotStartMinutes / 60), slotStartMinutes % 60, 0, 0);

          const slotEnd = new Date(slotStart);
          slotEnd.setUTCMinutes(slotEnd.getUTCMinutes() + avail.slotDurationMinutes);

          const minAdvanceMs = avail.minAdvanceHours * 60 * 60 * 1000;
          const earliestAllowed = new Date(now.getTime() + minAdvanceMs);

          if (slotStart >= earliestAllowed && !this.overlapsBooked(slotStart, slotEnd, bookedSlots)) {
            const dateStr = current.toISOString().slice(0, 10);
            const hh = String(Math.floor(slotStartMinutes / 60)).padStart(2, '0');
            const mm = String(slotStartMinutes % 60).padStart(2, '0');
            const slotId = `${professionalId}:${dateStr}:${hh}${mm}`;

            slots.push({ slotId, startAt: slotStart, endAt: slotEnd, isReserved: false });
          }

          slotStartMinutes += stepMinutes;
        }
      }

      current.setUTCDate(current.getUTCDate() + 1);
    }

    // Check Redis reservations in parallel
    await Promise.all(
      slots.map(async (slot) => {
        slot.isReserved = await this.slotReservation.isReserved(slot.slotId);
      }),
    );

    return ok(slots);
  }

  private overlapsBooked(start: Date, end: Date, booked: BookedSlot[]): boolean {
    return booked.some((b) => start < b.endAt && end > b.startAt);
  }
}
