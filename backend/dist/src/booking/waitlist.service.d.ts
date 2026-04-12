import type { Result } from '../shared/result';
import type { WaitlistEntry, AddToWaitlistInput, SlotReleasedInput, HandleSlotReleasedOutcome } from './waitlist.types';
import type { IWaitlistRepository } from './ports/waitlist.repository.port';
import type { IAppointmentRepository } from './ports/appointment.repository.port';
import type { IWhatsAppGateway } from '../infra/ports/whatsapp-gateway.port';
import type { BookingService } from './booking.service';
export declare class WaitlistService {
    private readonly waitlistRepo;
    private readonly appointmentRepo;
    private readonly whatsapp;
    private readonly bookingService;
    private readonly clock;
    constructor(waitlistRepo: IWaitlistRepository, appointmentRepo: IAppointmentRepository, whatsapp: IWhatsAppGateway, bookingService: BookingService, clock?: () => Date);
    addToWaitlist(input: AddToWaitlistInput): Promise<Result<WaitlistEntry>>;
    handleSlotReleased(input: SlotReleasedInput): Promise<Result<HandleSlotReleasedOutcome>>;
    acceptWaitlistSlot(entryId: string, slotStartAt: Date, slotEndAt: Date, serviceType: string, idempotencyKey: string): Promise<Result<{
        appointmentId: string;
    }>>;
    expireEntry(entryId: string): Promise<Result<void>>;
    getByProfessional(professionalId: string): Promise<Result<WaitlistEntry[]>>;
}
