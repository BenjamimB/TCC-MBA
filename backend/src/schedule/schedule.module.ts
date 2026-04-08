import { Module } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { SlotCalculationService } from './slot-calculation.service';
import { ScheduleController } from './schedule.controller';
import { PrismaAvailabilityRepository } from '../infra/adapters/prisma-availability.repository';
import { PrismaAppointmentRepository } from '../infra/adapters/prisma-appointment.repository';
import { RedisSlotClient } from '../infra/adapters/redis-slot-client';
import { MemorySSEEventBus } from '../infra/adapters/memory-sse-event-bus';

@Module({
  controllers: [ScheduleController],
  providers: [
    {
      provide: AvailabilityService,
      useFactory: (repo: PrismaAvailabilityRepository, eventBus: MemorySSEEventBus) =>
        new AvailabilityService(repo, { publishAvailabilityUpdated: async () => eventBus.publish({ type: 'appointment_created', professionalId: '', payload: null }) }),
      inject: [PrismaAvailabilityRepository, MemorySSEEventBus],
    },
    {
      provide: SlotCalculationService,
      useFactory: (
        availRepo: PrismaAvailabilityRepository,
        apptRepo: PrismaAppointmentRepository,
        slotClient: RedisSlotClient,
      ) => new SlotCalculationService(availRepo, apptRepo, slotClient),
      inject: [PrismaAvailabilityRepository, PrismaAppointmentRepository, RedisSlotClient],
    },
  ],
  exports: [AvailabilityService, SlotCalculationService],
})
export class ScheduleModule {}
