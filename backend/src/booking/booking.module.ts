import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { SlotReservationService } from './slot-reservation.service';
import { BookingController } from './booking.controller';
import { PrismaAppointmentRepository } from '../infra/adapters/prisma-appointment.repository';
import { RedisSlotClient } from '../infra/adapters/redis-slot-client';
import { MemorySSEEventBus } from '../infra/adapters/memory-sse-event-bus';

@Module({
  controllers: [BookingController],
  providers: [
    {
      provide: BookingService,
      useFactory: (repo: PrismaAppointmentRepository, eventBus: MemorySSEEventBus) =>
        new BookingService(repo, eventBus),
      inject: [PrismaAppointmentRepository, MemorySSEEventBus],
    },
    {
      provide: SlotReservationService,
      useFactory: (redis: RedisSlotClient) => new SlotReservationService(redis),
      inject: [RedisSlotClient],
    },
  ],
  exports: [BookingService, SlotReservationService],
})
export class BookingModule {}
