export type ConversationIntent =
  | 'booking'
  | 'cancellation'
  | 'reschedule'
  | 'price_inquiry'
  | 'general_info'
  | 'human_handoff'
  | 'unclear';

export interface IntentDetectionResult {
  intent: ConversationIntent;
  confidence: number;
}

export interface ConversationContext {
  patientName?: string;
  professionalName?: string;
  clinicAddress?: string;
  currentState?: string;
  /** Last few messages for context (capped to avoid token overflow) */
  recentMessages?: Array<{ role: 'user' | 'assistant'; content: string }>;
}
