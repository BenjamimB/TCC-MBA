import type { Result } from '../shared/result';
import type { TimeSlot } from './availability.types';
import type { IAvailabilityRepository } from './ports/availability.repository.port';
import type { IAppointmentQuery } from './ports/appointment-query.port';
import type { ISlotReservationChecker } from './ports/slot-reservation.port';
export declare class SlotCalculationService {
    private readonly availRepo;
    private readonly appointmentQuery;
    private readonly slotReservation;
    private readonly clock;
    constructor(availRepo: IAvailabilityRepository, appointmentQuery: IAppointmentQuery, slotReservation: ISlotReservationChecker, clock?: () => Date);
    getAvailableSlots(professionalId: string, from: Date, to: Date): Promise<Result<TimeSlot[]>>;
    private overlapsBooked;
}
