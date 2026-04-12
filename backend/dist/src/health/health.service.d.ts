export interface DatabaseProbe {
    ping(): Promise<void>;
}
export interface RedisProbe {
    ping(): Promise<void>;
}
export interface HealthResult {
    status: 'ok' | 'error';
    postgres: 'up' | 'down';
    redis: 'up' | 'down';
}
export declare class HealthService {
    private readonly dbProbe;
    private readonly redisProbe;
    constructor(dbProbe: DatabaseProbe, redisProbe: RedisProbe);
    check(): Promise<HealthResult>;
}
