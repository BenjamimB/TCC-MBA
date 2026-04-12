import type { IRefreshTokenStore } from '../../auth/ports/refresh-token.store.port';
import { RedisService } from '../redis.service';
export declare class RedisRefreshTokenStore implements IRefreshTokenStore {
    private readonly redis;
    constructor(redis: RedisService);
    store(token: string, professionalId: string, ttlSeconds: number): Promise<void>;
    find(token: string): Promise<string | null>;
    delete(token: string): Promise<void>;
}
