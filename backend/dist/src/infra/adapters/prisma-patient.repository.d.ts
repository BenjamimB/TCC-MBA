import type { IPatientRepository, CreatePatientData, UpdatePatientData } from '../../patient/ports/patient.repository.port';
import type { Patient, InteractionRecord } from '../../patient/patient.types';
import { PrismaService } from '../prisma.service';
export declare class PrismaPatientRepository implements IPatientRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByPhone(professionalId: string, phoneNumber: string): Promise<Patient | null>;
    findById(id: string): Promise<Patient | null>;
    create(data: CreatePatientData): Promise<Patient>;
    update(id: string, data: UpdatePatientData): Promise<Patient>;
    findInteractionHistory(patientId: string, professionalId: string): Promise<InteractionRecord[]>;
}
