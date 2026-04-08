export type ConversationState =
  | 'IDLE'
  | 'TRIAGING'
  | 'BOOKING_COLLECTING'
  | 'BOOKING_CONFIRMING'
  | 'CANCELLING'
  | 'RESCHEDULING'
  | 'FAQ'
  | 'ESCALATED'
  | 'CONCLUDED';

export interface ConversationSession {
  conversationId: string;
  patientId: string;
  professionalId: string;
  state: ConversationState;
  pendingSlotId: string | null;
  pendingSlotStartAt: string | null; // ISO string
  pendingSlotEndAt: string | null;   // ISO string
  collectedServiceType: string | null;
  targetAppointmentId: string | null;
  /** Recent messages kept for AI context (capped at 10) */
  recentMessages: Array<{ role: 'user' | 'assistant'; content: string }>;
  idempotencyKey: string | null;
}
