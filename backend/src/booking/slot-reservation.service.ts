import type { Result } from '../shared/result';
import { ok, err } from '../shared/result';
import type { IRedisSlotClient } from './ports/redis-slot-client.port';

const SLOT_KEY_PREFIX = 'slot:';
const DEFAULT_TTL_SECONDS = 600;

export class SlotReservationService {
  constructor(private readonly redis: IRedisSlotClient) {}

  async reserve(slotId: string, sessionId: string, ttlSeconds = DEFAULT_TTL_SECONDS): Promise<Result<void>> {
    const key = `${SLOT_KEY_PREFIX}${slotId}`;
    const acquired = await this.redis.setNxEx(key, sessionId, ttlSeconds);
    if (!acquired) {
      return err({ code: 'SLOT_NOT_AVAILABLE', slotId });
    }
    return ok(undefined);
  }

  async release(slotId: string, sessionId: string): Promise<Result<void>> {
    const key = `${SLOT_KEY_PREFIX}${slotId}`;
    const deleted = await this.redis.atomicDelete(key, sessionId);
    if (!deleted) {
      return err({ code: 'UNAUTHORIZED' });
    }
    return ok(undefined);
  }

  async extend(slotId: string, sessionId: string, ttlSeconds: number): Promise<Result<void>> {
    const key = `${SLOT_KEY_PREFIX}${slotId}`;
    const renewed = await this.redis.atomicExpire(key, sessionId, ttlSeconds);
    if (!renewed) {
      return err({ code: 'UNAUTHORIZED' });
    }
    return ok(undefined);
  }

  async isReserved(slotId: string): Promise<boolean> {
    const key = `${SLOT_KEY_PREFIX}${slotId}`;
    const value = await this.redis.get(key);
    return value !== null;
  }
}
