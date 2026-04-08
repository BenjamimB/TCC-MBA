/**
 * Task 3.1 — AvailabilityService unit tests
 *
 * Cobre: CRUD de templates semanais de disponibilidade, validação de regras
 * e publicação do evento AvailabilityUpdated.
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6
 */
import { AvailabilityService } from './availability.service';
import type { IAvailabilityRepository, AvailabilityRecord } from './ports/availability.repository.port';
import type { IEventPublisher } from './ports/event-publisher.port';
import type { AvailabilityConfig } from './availability.types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const FIXED_NOW = new Date('2025-06-10T10:00:00Z');
const PROFESSIONAL_ID = 'prof-1';

function makeConfig(overrides: Partial<AvailabilityConfig> = {}): AvailabilityConfig {
  return {
    dayOfWeek: 1, // segunda
    startTime: '08:00',
    endTime: '18:00',
    slotDurationMinutes: 60,
    breakDurationMinutes: 10,
    isActive: true,
    minAdvanceHours: 2,
    ...overrides,
  };
}

function makeRecord(overrides: Partial<AvailabilityRecord> = {}): AvailabilityRecord {
  return {
    id: 'avail-1',
    professionalId: PROFESSIONAL_ID,
    ...makeConfig(),
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

describe('AvailabilityService', () => {
  let service: AvailabilityService;
  let repo: jest.Mocked<IAvailabilityRepository>;
  let eventPublisher: jest.Mocked<IEventPublisher>;

  beforeEach(() => {
    repo = {
      findByProfessional: jest.fn(),
      upsert: jest.fn(),
    };
    eventPublisher = {
      publishAvailabilityUpdated: jest.fn().mockResolvedValue(undefined),
    };
    service = new AvailabilityService(repo, eventPublisher, () => FIXED_NOW);
  });

  // =========================================================================
  // getConfig()
  // =========================================================================

  describe('getConfig()', () => {
    it('[TC-F-01] deve retornar configurações de disponibilidade do profissional', async () => {
      repo.findByProfessional.mockResolvedValue([makeRecord()]);

      const result = await service.getConfig(PROFESSIONAL_ID);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toHaveLength(1);
        expect(result.value[0].dayOfWeek).toBe(1);
      }
    });

    it('[TC-F-02] deve retornar lista vazia quando nenhuma configuração existe', async () => {
      repo.findByProfessional.mockResolvedValue([]);

      const result = await service.getConfig(PROFESSIONAL_ID);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toHaveLength(0);
      }
    });
  });

  // =========================================================================
  // updateConfig()
  // =========================================================================

  describe('updateConfig()', () => {
    it('[TC-F-03] deve salvar configuração válida com upsert', async () => {
      const config = makeConfig();
      repo.upsert.mockResolvedValue(makeRecord(config));

      const result = await service.updateConfig(PROFESSIONAL_ID, [config]);

      expect(result.ok).toBe(true);
      expect(repo.upsert).toHaveBeenCalledWith(PROFESSIONAL_ID, config);
    });

    it('[TC-F-04] deve fazer upsert de múltiplos dias em sequência', async () => {
      const configs = [makeConfig({ dayOfWeek: 1 }), makeConfig({ dayOfWeek: 2 })];
      repo.upsert.mockResolvedValue(makeRecord());

      const result = await service.updateConfig(PROFESSIONAL_ID, configs);

      expect(result.ok).toBe(true);
      expect(repo.upsert).toHaveBeenCalledTimes(2);
    });

    it('[TC-F-05] deve retornar VALIDATION_ERROR quando endTime <= startTime', async () => {
      const config = makeConfig({ startTime: '18:00', endTime: '08:00' });

      const result = await service.updateConfig(PROFESSIONAL_ID, [config]);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('VALIDATION_ERROR');
        if (result.error.code === 'VALIDATION_ERROR') {
          expect(result.error.fields).toHaveProperty('endTime');
        }
      }
    });

    it('[TC-F-06] deve retornar VALIDATION_ERROR quando endTime igual a startTime', async () => {
      const config = makeConfig({ startTime: '08:00', endTime: '08:00' });

      const result = await service.updateConfig(PROFESSIONAL_ID, [config]);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('VALIDATION_ERROR');
      }
    });

    it('[TC-F-07] deve retornar VALIDATION_ERROR quando slotDurationMinutes < 15', async () => {
      const config = makeConfig({ slotDurationMinutes: 10 });

      const result = await service.updateConfig(PROFESSIONAL_ID, [config]);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('VALIDATION_ERROR');
        if (result.error.code === 'VALIDATION_ERROR') {
          expect(result.error.fields).toHaveProperty('slotDurationMinutes');
        }
      }
    });

    it('[TC-F-08] deve aceitar slotDurationMinutes exatamente 15 (limite mínimo válido)', async () => {
      const config = makeConfig({ slotDurationMinutes: 15 });
      repo.upsert.mockResolvedValue(makeRecord(config));

      const result = await service.updateConfig(PROFESSIONAL_ID, [config]);

      expect(result.ok).toBe(true);
    });

    it('[TC-F-09] deve retornar VALIDATION_ERROR quando breakDurationMinutes < 0', async () => {
      const config = makeConfig({ breakDurationMinutes: -1 });

      const result = await service.updateConfig(PROFESSIONAL_ID, [config]);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('VALIDATION_ERROR');
      }
    });

    it('[TC-F-10] deve publicar evento AvailabilityUpdated após salvar configuração', async () => {
      const config = makeConfig();
      repo.upsert.mockResolvedValue(makeRecord());

      await service.updateConfig(PROFESSIONAL_ID, [config]);

      expect(eventPublisher.publishAvailabilityUpdated).toHaveBeenCalledWith({
        professionalId: PROFESSIONAL_ID,
        updatedAt: FIXED_NOW,
      });
    });

    it('[TC-F-11] deve publicar evento apenas uma vez mesmo com múltiplos dias', async () => {
      const configs = [makeConfig({ dayOfWeek: 1 }), makeConfig({ dayOfWeek: 3 })];
      repo.upsert.mockResolvedValue(makeRecord());

      await service.updateConfig(PROFESSIONAL_ID, configs);

      expect(eventPublisher.publishAvailabilityUpdated).toHaveBeenCalledTimes(1);
    });

    it('[TC-F-12] deve retornar VALIDATION_ERROR quando dois configs têm o mesmo dayOfWeek', async () => {
      const configs = [makeConfig({ dayOfWeek: 1 }), makeConfig({ dayOfWeek: 1 })];

      const result = await service.updateConfig(PROFESSIONAL_ID, configs);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('VALIDATION_ERROR');
      }
    });

    it('[TC-F-13] não deve publicar evento quando a validação falha', async () => {
      const config = makeConfig({ slotDurationMinutes: 5 });

      await service.updateConfig(PROFESSIONAL_ID, [config]);

      expect(eventPublisher.publishAvailabilityUpdated).not.toHaveBeenCalled();
    });
  });
});
