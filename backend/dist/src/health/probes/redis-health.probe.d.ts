import { RedisProbe } from '../health.service';
import { RedisService } from '../../infra/redis.service';
export declare class RedisHealthProbe implements RedisProbe {
    private readonly redis;
    constructor(redis: RedisService);
    ping(): Promise<void>;
}
