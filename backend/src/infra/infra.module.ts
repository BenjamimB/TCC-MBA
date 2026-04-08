import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RedisService } from './redis.service';
import { BcryptHashingService } from './adapters/bcrypt-hashing.service';
import { JwtTokenService } from './adapters/jwt-token.service';
import { RedisRefreshTokenStore } from './adapters/redis-refresh-token.store';
import { RedisSlotClient } from './adapters/redis-slot-client';
import { NoOpNotificationService } from './adapters/no-op-notification.service';
import { MemorySSEEventBus } from './adapters/memory-sse-event-bus';
import { PrismaProfessionalRepository } from './adapters/prisma-professional.repository';
import { PrismaAvailabilityRepository } from './adapters/prisma-availability.repository';
import { PrismaPatientRepository } from './adapters/prisma-patient.repository';
import { PrismaAppointmentRepository } from './adapters/prisma-appointment.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    RedisService,
    BcryptHashingService,
    JwtTokenService,
    RedisRefreshTokenStore,
    RedisSlotClient,
    NoOpNotificationService,
    MemorySSEEventBus,
    PrismaProfessionalRepository,
    PrismaAvailabilityRepository,
    PrismaPatientRepository,
    PrismaAppointmentRepository,
  ],
  exports: [
    PrismaService,
    RedisService,
    BcryptHashingService,
    JwtTokenService,
    RedisRefreshTokenStore,
    RedisSlotClient,
    NoOpNotificationService,
    MemorySSEEventBus,
    PrismaProfessionalRepository,
    PrismaAvailabilityRepository,
    PrismaPatientRepository,
    PrismaAppointmentRepository,
  ],
})
export class InfraModule {}
