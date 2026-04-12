"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModule = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("./booking.service");
const slot_reservation_service_1 = require("./slot-reservation.service");
const booking_controller_1 = require("./booking.controller");
const prisma_appointment_repository_1 = require("../infra/adapters/prisma-appointment.repository");
const redis_slot_client_1 = require("../infra/adapters/redis-slot-client");
const memory_sse_event_bus_1 = require("../infra/adapters/memory-sse-event-bus");
let BookingModule = class BookingModule {
};
exports.BookingModule = BookingModule;
exports.BookingModule = BookingModule = __decorate([
    (0, common_1.Module)({
        controllers: [booking_controller_1.BookingController],
        providers: [
            {
                provide: booking_service_1.BookingService,
                useFactory: (repo, eventBus) => new booking_service_1.BookingService(repo, eventBus),
                inject: [prisma_appointment_repository_1.PrismaAppointmentRepository, memory_sse_event_bus_1.MemorySSEEventBus],
            },
            {
                provide: slot_reservation_service_1.SlotReservationService,
                useFactory: (redis) => new slot_reservation_service_1.SlotReservationService(redis),
                inject: [redis_slot_client_1.RedisSlotClient],
            },
        ],
        exports: [booking_service_1.BookingService, slot_reservation_service_1.SlotReservationService],
    })
], BookingModule);
//# sourceMappingURL=booking.module.js.map