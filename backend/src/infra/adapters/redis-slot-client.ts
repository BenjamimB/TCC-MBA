import { Injectable } from '@nestjs/common';
import type { IRedisSlotClient } from '../../booking/ports/redis-slot-client.port';
import { RedisService } from '../redis.service';

// Lua: deleta key somente se o valor for igual ao esperado
const RELEASE_SCRIPT = `
if redis.call("get", KEYS[1]) == ARGV[1] then
  return redis.call("del", KEYS[1])
else
  return 0
end
`;

// Lua: renova TTL somente se o valor for igual ao esperado
const EXTEND_SCRIPT = `
if redis.call("get", KEYS[1]) == ARGV[1] then
  return redis.call("expire", KEYS[1], ARGV[2])
else
  return 0
end
`;

@Injectable()
export class RedisSlotClient implements IRedisSlotClient {
  constructor(private readonly redis: RedisService) {}

  async setNxEx(key: string, value: string, ttlSeconds: number): Promise<boolean> {
    const result = await this.redis.client.set(key, value, 'NX', 'EX', ttlSeconds);
    return result === 'OK';
  }

  async get(key: string): Promise<string | null> {
    return this.redis.client.get(key);
  }

  async atomicDelete(key: string, expectedValue: string): Promise<boolean> {
    const result = await this.redis.client.eval(RELEASE_SCRIPT, 1, key, expectedValue);
    return result === 1;
  }

  async atomicExpire(key: string, expectedValue: string, ttlSeconds: number): Promise<boolean> {
    const result = await this.redis.client.eval(EXTEND_SCRIPT, 1, key, expectedValue, String(ttlSeconds));
    return result === 1;
  }
}
