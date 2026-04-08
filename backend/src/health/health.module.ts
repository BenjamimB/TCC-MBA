import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { PrismaHealthProbe } from './probes/prisma-health.probe';
import { RedisHealthProbe } from './probes/redis-health.probe';
import { PrismaService } from '../infra/prisma.service';
import { RedisService } from '../infra/redis.service';

@Module({
  controllers: [HealthController],
  providers: [
    // InfraModule is @Global — PrismaService and RedisService are already available.
    // We re-declare them here only so the probes can inject them in this module context.
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
