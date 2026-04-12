export interface IRedisSlotClient {
    setNxEx(key: string, value: string, ttlSeconds: number): Promise<boolean>;
    get(key: string): Promise<string | null>;
    atomicDelete(key: string, expectedValue: string): Promise<boolean>;
    atomicExpire(key: string, expectedValue: string, ttlSeconds: number): Promise<boolean>;
}
