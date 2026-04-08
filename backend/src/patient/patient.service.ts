import { createHash } from 'crypto';
import type { Result } from '../shared/result';
import { ok, err } from '../shared/result';
import type { Patient, InteractionRecord } from './patient.types';
import type { IPatientRepository } from './ports/patient.repository.port';

export class PatientService {
  constructor(
    private readonly repo: IPatientRepository,
    private readonly clock: () => Date = () => new Date(),
  ) {}

  // AC 7.1 — idempotente; registra consentRecordedAt no primeiro contato
  async findOrCreateByPhone(professionalId: string, phoneNumber: string): Promise<Result<Patient>> {
    const existing = await this.repo.findByPhone(professionalId, phoneNumber);
    if (existing) {
      return ok(existing);
    }
    const created = await this.repo.create({
      professionalId,
      phoneNumber,
      consentRecordedAt: this.clock(),
    });
    return ok(created);
  }

  // AC 7.2 — atualização progressiva de perfil
  async updateProfile(
    id: string,
    professionalId: string,
    data: Partial<Pick<Patient, 'name' | 'dateOfBirth'>>,
  ): Promise<Result<Patient>> {
    const accessError = await this.checkAccess(id, professionalId);
    if (accessError) return accessError;

    const updated = await this.repo.update(id, data);
    return ok(updated);
  }

  // AC 7.3 — acesso restrito ao profissionalId responsável
  async getById(id: string, professionalId: string): Promise<Result<Patient>> {
    const accessError = await this.checkAccess(id, professionalId);
    if (accessError) return accessError;

    const patient = await this.repo.findById(id);
    return ok(patient!);
  }

  // AC 8.5 — anonimização LGPD
  async anonymize(id: string, professionalId: string): Promise<Result<void>> {
    const accessError = await this.checkAccess(id, professionalId);
    if (accessError) return accessError;

    const anonymizedPhone = createHash('sha256').update(id).digest('hex');

    await this.repo.update(id, {
      name: null,
      dateOfBirth: null,
      phoneNumber: anonymizedPhone,
      anonymizedAt: this.clock(),
    });

    return ok(undefined);
  }

  async getHistory(id: string, professionalId: string): Promise<Result<InteractionRecord[]>> {
    const accessError = await this.checkAccess(id, professionalId);
    if (accessError) return accessError;

    const history = await this.repo.findInteractionHistory(id, professionalId);
    return ok(history);
  }

  // Verifica existência e ownership em um único passo
  private async checkAccess(id: string, professionalId: string): Promise<Result<never> | null> {
    const patient = await this.repo.findById(id);
    if (!patient) {
      return err({ code: 'PATIENT_NOT_FOUND', id });
    }
    if (patient.professionalId !== professionalId) {
      return err({ code: 'UNAUTHORIZED' });
    }
    return null;
  }
}
