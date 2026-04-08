export interface Patient {
  id: string;
  professionalId: string;
  phoneNumber: string;
  name: string | null;
  dateOfBirth: Date | null;
  consentRecordedAt: Date | null;
  anonymizedAt: Date | null;
  createdAt: Date;
}

export interface InteractionRecord {
  id: string;
  patientId: string;
  professionalId: string;
  type: 'whatsapp_message' | 'appointment' | 'manual_note';
  content: string | null;
  metadata: Record<string, unknown>;
  createdAt: Date;
}
