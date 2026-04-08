import type { Patient, InteractionRecord } from '../patient.types';

export interface CreatePatientData {
  professionalId: string;
  phoneNumber: string;
  consentRecordedAt: Date;
}

export interface UpdatePatientData {
  name?: string | null;
  dateOfBirth?: Date | null;
  anonymizedAt?: Date | null;
  phoneNumber?: string | null;
}

export interface IPatientRepository {
  findByPhone(professionalId: string, phoneNumber: string): Promise<Patient | null>;
  findById(id: string): Promise<Patient | null>;
  create(data: CreatePatientData): Promise<Patient>;
  update(id: string, data: UpdatePatientData): Promise<Patient>;
  findInteractionHistory(patientId: string, professionalId: string): Promise<InteractionRecord[]>;
}
