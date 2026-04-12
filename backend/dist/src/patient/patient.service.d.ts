import type { Result } from '../shared/result';
import type { Patient, InteractionRecord } from './patient.types';
import type { IPatientRepository } from './ports/patient.repository.port';
export declare class PatientService {
    private readonly repo;
    private readonly clock;
    constructor(repo: IPatientRepository, clock?: () => Date);
    findOrCreateByPhone(professionalId: string, phoneNumber: string): Promise<Result<Patient>>;
    updateProfile(id: string, professionalId: string, data: Partial<Pick<Patient, 'name' | 'dateOfBirth'>>): Promise<Result<Patient>>;
    getById(id: string, professionalId: string): Promise<Result<Patient>>;
    anonymize(id: string, professionalId: string): Promise<Result<void>>;
    getHistory(id: string, professionalId: string): Promise<Result<InteractionRecord[]>>;
    private checkAccess;
}
