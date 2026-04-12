import type { WhatsAppInboundPayload, IWhatsAppGateway } from '../infra/ports/whatsapp-gateway.port';
import type { AITriageService } from './ai-triage.service';
import type { BookingService } from '../booking/booking.service';
import type { SlotReservationService } from '../booking/slot-reservation.service';
import type { PatientService } from '../patient/patient.service';
import type { IConversationStateStore } from './ports/conversation-state.store.port';
import type { ISlotQuery } from './ports/slot-query.port';
export declare class ConversationOrchestrator {
    private readonly stateStore;
    private readonly whatsapp;
    private readonly aiTriage;
    private readonly bookingService;
    private readonly slotReservation;
    private readonly patientService;
    private readonly slotQuery;
    private readonly clock;
    constructor(stateStore: IConversationStateStore, whatsapp: IWhatsAppGateway, aiTriage: AITriageService, bookingService: BookingService, slotReservation: SlotReservationService, patientService: PatientService, slotQuery: ISlotQuery, clock?: () => Date);
    handleIncomingMessage(payload: WhatsAppInboundPayload, professionalId: string): Promise<void>;
    private dispatch;
    private handleTriaging;
    private handleBookingCollecting;
    private handleBookingConfirming;
    private handleCancelling;
    private offerSlots;
    private newSession;
}
