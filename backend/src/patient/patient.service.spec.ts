/**
 * Task 4.1 — PatientService unit tests
 *
 * Cobre: cadastro automático idempotente, atualização progressiva de perfil,
 * busca com controle de acesso por profissional e anonimização LGPD.
 * Requirements: 7.1, 7.2, 7.3, 7.4
 */
import { PatientService } from './patient.service';
import type { IPatientRepository } from './ports/patient.repository.port';
import type { Patient, InteractionRecord } from './patient.types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const FIXED_NOW = new Date('2025-06-01T12:00:00Z');
const PROF_ID = 'prof-1';
const OTHER_PROF_ID = 'prof-other';

function makePatient(overrides: Partial<Patient> = {}): Patient {
  return {
    id: 'patient-1',
    professionalId: PROF_ID,
    phoneNumber: '+5511999999999',
    name: 'João Silva',
    dateOfBirth: null,
    consentRecordedAt: FIXED_NOW,
    anonymizedAt: null,
    createdAt: FIXED_NOW,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

describe('PatientService', () => {
  let service: PatientService;
  let repo: jest.Mocked<IPatientRepository>;

  beforeEach(() => {
    repo = {
      findByPhone: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findInteractionHistory: jest.fn(),
    };
    service = new PatientService(repo, () => FIXED_NOW);
  });

  // =========================================================================
  // findOrCreateByPhone()
  // =========================================================================

  describe('findOrCreateByPhone()', () => {
    it('[TC-F-01] deve criar novo paciente no primeiro contato', async () => {
      repo.findByPhone.mockResolvedValue(null);
      repo.create.mockResolvedValue(makePatient({ name: null }));

      const result = await service.findOrCreateByPhone(PROF_ID, '+5511999999999');

      expect(result.ok).toBe(true);
      expect(repo.create).toHaveBeenCalledWith({
        professionalId: PROF_ID,
        phoneNumber: '+5511999999999',
        consentRecordedAt: FIXED_NOW,
      });
    });

    it('[TC-F-02] deve registrar consentRecordedAt no momento da criação', async () => {
      repo.findByPhone.mockResolvedValue(null);
      repo.create.mockResolvedValue(makePatient());

      await service.findOrCreateByPhone(PROF_ID, '+5511999999999');

      expect(repo.create).toHaveBeenCalledWith(
        expect.objectContaining({ consentRecordedAt: FIXED_NOW }),
      );
    });

    it('[TC-F-03] deve retornar paciente existente (idempotência) no segundo contato', async () => {
      const existing = makePatient();
      repo.findByPhone.mockResolvedValue(existing);

      const result = await service.findOrCreateByPhone(PROF_ID, '+5511999999999');

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.id).toBe('patient-1');
      }
      expect(repo.create).not.toHaveBeenCalled();
    });

    it('[TC-F-04] deve usar o professionalId correto na busca', async () => {
      repo.findByPhone.mockResolvedValue(null);
      repo.create.mockResolvedValue(makePatient());

      await service.findOrCreateByPhone(PROF_ID, '+5511999999999');

      expect(repo.findByPhone).toHaveBeenCalledWith(PROF_ID, '+5511999999999');
    });
  });

  // =========================================================================
  // updateProfile()
  // =========================================================================

  describe('updateProfile()', () => {
    it('[TC-F-05] deve atualizar nome do paciente', async () => {
      repo.findById.mockResolvedValue(makePatient());
      repo.update.mockResolvedValue(makePatient({ name: 'Maria' }));

      const result = await service.updateProfile('patient-1', PROF_ID, { name: 'Maria' });

      expect(result.ok).toBe(true);
      expect(repo.update).toHaveBeenCalledWith('patient-1', expect.objectContaining({ name: 'Maria' }));
    });

    it('[TC-F-06] deve atualizar data de nascimento do paciente', async () => {
      repo.findById.mockResolvedValue(makePatient());
      const dob = new Date('1990-05-15');
      repo.update.mockResolvedValue(makePatient({ dateOfBirth: dob }));

      const result = await service.updateProfile('patient-1', PROF_ID, { dateOfBirth: dob });

      expect(result.ok).toBe(true);
      expect(repo.update).toHaveBeenCalledWith('patient-1', expect.objectContaining({ dateOfBirth: dob }));
    });

    it('[TC-F-07] deve retornar PATIENT_NOT_FOUND quando paciente não existe', async () => {
      repo.findById.mockResolvedValue(null);

      const result = await service.updateProfile('inexistente', PROF_ID, { name: 'Test' });

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('PATIENT_NOT_FOUND');
      }
    });

    it('[TC-F-08] deve retornar UNAUTHORIZED quando profissionalId não coincide', async () => {
      repo.findById.mockResolvedValue(makePatient({ professionalId: OTHER_PROF_ID }));

      const result = await service.updateProfile('patient-1', PROF_ID, { name: 'Test' });

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('UNAUTHORIZED');
      }
    });
  });

  // =========================================================================
  // getById()
  // =========================================================================

  describe('getById()', () => {
    it('[TC-F-09] deve retornar paciente quando profissionalId coincide', async () => {
      repo.findById.mockResolvedValue(makePatient());

      const result = await service.getById('patient-1', PROF_ID);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.id).toBe('patient-1');
      }
    });

    it('[TC-F-10] deve retornar PATIENT_NOT_FOUND quando paciente não existe', async () => {
      repo.findById.mockResolvedValue(null);

      const result = await service.getById('inexistente', PROF_ID);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('PATIENT_NOT_FOUND');
      }
    });

    it('[TC-F-11] deve retornar UNAUTHORIZED quando paciente pertence a outro profissional', async () => {
      repo.findById.mockResolvedValue(makePatient({ professionalId: OTHER_PROF_ID }));

      const result = await service.getById('patient-1', PROF_ID);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('UNAUTHORIZED');
      }
    });
  });

  // =========================================================================
  // anonymize() — LGPD direito ao esquecimento
  // =========================================================================

  describe('anonymize()', () => {
    it('[TC-F-12] deve substituir dados pessoais por nulos', async () => {
      repo.findById.mockResolvedValue(makePatient());
      repo.update.mockResolvedValue(makePatient({ name: null, dateOfBirth: null, phoneNumber: 'ANONYMIZED' }));

      const result = await service.anonymize('patient-1', PROF_ID);

      expect(result.ok).toBe(true);
      expect(repo.update).toHaveBeenCalledWith(
        'patient-1',
        expect.objectContaining({
          name: null,
          dateOfBirth: null,
          anonymizedAt: FIXED_NOW,
        }),
      );
    });

    it('[TC-F-13] deve definir phoneNumber como hash irreversível na anonimização', async () => {
      repo.findById.mockResolvedValue(makePatient());
      repo.update.mockResolvedValue(makePatient());

      await service.anonymize('patient-1', PROF_ID);

      const call = repo.update.mock.calls[0];
      const updateData = call[1];
      // phoneNumber não deve ser o original, mas um valor opaco/hash
      expect(updateData.phoneNumber).toBeDefined();
      expect(updateData.phoneNumber).not.toBe('+5511999999999');
    });

    it('[TC-F-14] deve retornar PATIENT_NOT_FOUND quando paciente não existe', async () => {
      repo.findById.mockResolvedValue(null);

      const result = await service.anonymize('inexistente', PROF_ID);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('PATIENT_NOT_FOUND');
      }
    });

    it('[TC-F-15] deve retornar UNAUTHORIZED quando profissionalId não coincide', async () => {
      repo.findById.mockResolvedValue(makePatient({ professionalId: OTHER_PROF_ID }));

      const result = await service.anonymize('patient-1', PROF_ID);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('UNAUTHORIZED');
      }
    });
  });

  // =========================================================================
  // getHistory()
  // =========================================================================

  describe('getHistory()', () => {
    it('[TC-F-16] deve retornar histórico de interações do paciente', async () => {
      repo.findById.mockResolvedValue(makePatient());
      const interactions: InteractionRecord[] = [
        {
          id: 'int-1',
          patientId: 'patient-1',
          professionalId: PROF_ID,
          type: 'whatsapp_message',
          content: 'Olá',
          metadata: {},
          createdAt: FIXED_NOW,
        },
      ];
      repo.findInteractionHistory.mockResolvedValue(interactions);

      const result = await service.getHistory('patient-1', PROF_ID);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toHaveLength(1);
        expect(result.value[0].type).toBe('whatsapp_message');
      }
    });

    it('[TC-F-17] deve retornar UNAUTHORIZED para acesso de outro profissional', async () => {
      repo.findById.mockResolvedValue(makePatient({ professionalId: OTHER_PROF_ID }));

      const result = await service.getHistory('patient-1', PROF_ID);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('UNAUTHORIZED');
      }
    });
  });
});
