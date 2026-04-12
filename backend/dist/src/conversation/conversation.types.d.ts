export type ConversationState = 'IDLE' | 'TRIAGING' | 'BOOKING_COLLECTING' | 'BOOKING_CONFIRMING' | 'CANCELLING' | 'RESCHEDULING' | 'FAQ' | 'ESCALATED' | 'CONCLUDED';
export interface ConversationSession {
    conversationId: string;
    patientId: string;
    professionalId: string;
    state: ConversationState;
    pendingSlotId: string | null;
    pendingSlotStartAt: string | null;
    pendingSlotEndAt: string | null;
    collectedServiceType: string | null;
    targetAppointmentId: string | null;
    recentMessages: Array<{
        role: 'user' | 'assistant';
        content: string;
    }>;
    idempotencyKey: string | null;
}
