import { Injectable } from '@nestjs/common';
import { RedisProbe } from '../health.service';

@Injectable()
export class RedisHealthProbe implements RedisProbe {
  async ping(): Promise<void> {
    // Placeholder — will be replaced when Redis/BullMQ is configured in task 1.3
    // In production: await this.redis.ping()
  }
}
