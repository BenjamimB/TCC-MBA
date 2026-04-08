/**
 * Task 7.2 — SlotReservationService unit tests
 *
 * Cobre: reserva atômica de slot (SET NX), liberação com verificação de
 * ownership (Lua), extensão de TTL e consulta de reserva.
 * Requirements: 5.1, 5.5
 */
import { SlotReservationService } from './slot-reservation.service';
import type { IRedisSlotClient } from './ports/redis-slot-client.port';

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const SLOT_ID = 'prof-1:2025-06-10:0800';
const SESSION_A = 'session-a';
const SESSION_B = 'session-b';
const DEFAULT_TTL = 600;

describe('SlotReservationService', () => {
  let service: SlotReservationService;
  let redis: jest.Mocked<IRedisSlotClient>;

  beforeEach(() => {
    redis = {
      setNxEx: jest.fn(),
      get: jest.fn(),
      atomicDelete: jest.fn(),
      atomicExpire: jest.fn(),
    };
    service = new SlotReservationService(redis);
  });

  // =========================================================================
  // reserve()
  // =========================================================================

  describe('reserve()', () => {
    it('[TC-F-01] deve retornar ok quando slot está livre (SET NX retorna true)', async () => {
      redis.setNxEx.mockResolvedValue(true);

      const result = await service.reserve(SLOT_ID, SESSION_A);

      expect(result.ok).toBe(true);
    });

    it('[TC-F-02] deve usar chave no formato slot:{slotId}', async () => {
      redis.setNxEx.mockResolvedValue(true);

      await service.reserve(SLOT_ID, SESSION_A);

      expect(redis.setNxEx).toHaveBeenCalledWith(`slot:${SLOT_ID}`, SESSION_A, expect.any(Number));
    });

    it('[TC-F-03] deve retornar SLOT_NOT_AVAILABLE quando slot já está reservado', async () => {
      redis.setNxEx.mockResolvedValue(false);

      const result = await service.reserve(SLOT_ID, SESSION_A);

      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.error.code).toBe('SLOT_NOT_AVAILABLE');
    });

    it('[TC-F-04] deve usar TTL padrão de 600s quando não especificado', async () => {
      redis.setNxEx.mockResolvedValue(true);

      await service.reserve(SLOT_ID, SESSION_A);

      expect(redis.setNxEx).toHaveBeenCalledWith(expect.any(String), expect.any(String), DEFAULT_TTL);
    });

    it('[TC-F-05] deve usar TTL customizado quando fornecido', async () => {
      redis.setNxEx.mockResolvedValue(true);

      await service.reserve(SLOT_ID, SESSION_A, 300);

      expect(redis.setNxEx).toHaveBeenCalledWith(expect.any(String), expect.any(String), 300);
    });

    it('[TC-F-06] deve incluir slotId no erro SLOT_NOT_AVAILABLE', async () => {
      redis.setNxEx.mockResolvedValue(false);

      const result = await service.reserve(SLOT_ID, SESSION_A);

      expect(result.ok).toBe(false);
      if (!result.ok && result.error.code === 'SLOT_NOT_AVAILABLE') {
        expect(result.error.slotId).toBe(SLOT_ID);
      }
    });
  });

  // =========================================================================
  // release()
  // =========================================================================

  describe('release()', () => {
    it('[TC-F-07] deve liberar slot quando sessionId é o owner', async () => {
      redis.atomicDelete.mockResolvedValue(true);

      const result = await service.release(SLOT_ID, SESSION_A);

      expect(result.ok).toBe(true);
    });

    it('[TC-F-08] deve retornar UNAUTHORIZED quando sessionId não é o owner', async () => {
      redis.atomicDelete.mockResolvedValue(false);

      const result = await service.release(SLOT_ID, SESSION_B);

      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.error.code).toBe('UNAUTHORIZED');
    });

    it('[TC-F-09] deve usar chave no formato slot:{slotId} na liberação', async () => {
      redis.atomicDelete.mockResolvedValue(true);

      await service.release(SLOT_ID, SESSION_A);

      expect(redis.atomicDelete).toHaveBeenCalledWith(`slot:${SLOT_ID}`, SESSION_A);
    });
  });

  // =========================================================================
  // extend()
  // =========================================================================

  describe('extend()', () => {
    it('[TC-F-10] deve renovar TTL quando sessionId é o owner', async () => {
      redis.atomicExpire.mockResolvedValue(true);

      const result = await service.extend(SLOT_ID, SESSION_A, 600);

      expect(result.ok).toBe(true);
    });

    it('[TC-F-11] deve retornar UNAUTHORIZED quando sessionId não é o owner', async () => {
      redis.atomicExpire.mockResolvedValue(false);

      const result = await service.extend(SLOT_ID, SESSION_B, 600);

      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.error.code).toBe('UNAUTHORIZED');
    });

    it('[TC-F-12] deve passar TTL correto para atomicExpire', async () => {
      redis.atomicExpire.mockResolvedValue(true);

      await service.extend(SLOT_ID, SESSION_A, 300);

      expect(redis.atomicExpire).toHaveBeenCalledWith(`slot:${SLOT_ID}`, SESSION_A, 300);
    });
  });

  // =========================================================================
  // isReserved()
  // =========================================================================

  describe('isReserved()', () => {
    it('[TC-F-13] deve retornar true quando slot tem lock ativo', async () => {
      redis.get.mockResolvedValue(SESSION_A);

      const result = await service.isReserved(SLOT_ID);

      expect(result).toBe(true);
    });

    it('[TC-F-14] deve retornar false quando slot não tem lock', async () => {
      redis.get.mockResolvedValue(null);

      const result = await service.isReserved(SLOT_ID);

      expect(result).toBe(false);
    });

    it('[TC-F-15] deve usar chave no formato slot:{slotId} na consulta', async () => {
      redis.get.mockResolvedValue(null);

      await service.isReserved(SLOT_ID);

      expect(redis.get).toHaveBeenCalledWith(`slot:${SLOT_ID}`);
    });
  });
});
