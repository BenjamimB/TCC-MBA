import { Injectable } from '@nestjs/common';
import { RedisProbe } from '../health.service';
import { RedisService } from '../../infra/redis.service';

@Injectable()
export class RedisHealthProbe implements RedisProbe {
  constructor(private readonly redis: RedisService) {}

  async ping(): Promise<void> {
    await this.redis.client.ping();
  }
}
