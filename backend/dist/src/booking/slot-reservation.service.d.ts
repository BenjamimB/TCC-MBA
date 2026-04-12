import type { Result } from '../shared/result';
import type { IRedisSlotClient } from './ports/redis-slot-client.port';
export declare class SlotReservationService {
    private readonly redis;
    constructor(redis: IRedisSlotClient);
    reserve(slotId: string, sessionId: string, ttlSeconds?: number): Promise<Result<void>>;
    release(slotId: string, sessionId: string): Promise<Result<void>>;
    extend(slotId: string, sessionId: string, ttlSeconds: number): Promise<Result<void>>;
    isReserved(slotId: string): Promise<boolean>;
}
