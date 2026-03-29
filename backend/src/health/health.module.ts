import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { PrismaHealthProbe } from './probes/prisma-health.probe';
import { RedisHealthProbe } from './probes/redis-health.probe';

@Module({
  controllers: [HealthController],
  providers: [
    PrismaHealthProbe,
    RedisHealthProbe,
    {
      provide: HealthService,
      useFactory: (db: PrismaHealthProbe, redis: RedisHealthProbe) =>
        new HealthService(db, redis),
      inject: [PrismaHealthProbe, RedisHealthProbe],
    },
  ],
})
export class HealthModule {}
