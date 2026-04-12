import type { ConversationSession } from '../conversation.types';
export interface IConversationStateStore {
    load(patientPhone: string, professionalId: string): Promise<ConversationSession | null>;
    save(patientPhone: string, professionalId: string, session: ConversationSession): Promise<void>;
    delete(patientPhone: string, professionalId: string): Promise<void>;
}
