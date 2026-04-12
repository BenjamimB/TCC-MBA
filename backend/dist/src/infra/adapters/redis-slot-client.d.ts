import type { IRedisSlotClient } from '../../booking/ports/redis-slot-client.port';
import type { ISlotReservationChecker } from '../../schedule/ports/slot-reservation.port';
import { RedisService } from '../redis.service';
export declare class RedisSlotClient implements IRedisSlotClient, ISlotReservationChecker {
    private readonly redis;
    constructor(redis: RedisService);
    setNxEx(key: string, value: string, ttlSeconds: number): Promise<boolean>;
    get(key: string): Promise<string | null>;
    atomicDelete(key: string, expectedValue: string): Promise<boolean>;
    atomicExpire(key: string, expectedValue: string, ttlSeconds: number): Promise<boolean>;
    isReserved(slotId: string): Promise<boolean>;
}
