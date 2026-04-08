import { Injectable } from '@nestjs/common';
import type { IRefreshTokenStore } from '../../auth/ports/refresh-token.store.port';
import { RedisService } from '../redis.service';

@Injectable()
export class RedisRefreshTokenStore implements IRefreshTokenStore {
  constructor(private readonly redis: RedisService) {}

  async store(token: string, professionalId: string, ttlSeconds: number): Promise<void> {
    await this.redis.client.set(`refresh:${token}`, professionalId, 'EX', ttlSeconds);
  }

  async find(token: string): Promise<string | null> {
    return this.redis.client.get(`refresh:${token}`);
  }

  async delete(token: string): Promise<void> {
    await this.redis.client.del(`refresh:${token}`);
  }
}
