"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleModule = void 0;
const common_1 = require("@nestjs/common");
const availability_service_1 = require("./availability.service");
const slot_calculation_service_1 = require("./slot-calculation.service");
const schedule_controller_1 = require("./schedule.controller");
const prisma_availability_repository_1 = require("../infra/adapters/prisma-availability.repository");
const prisma_appointment_repository_1 = require("../infra/adapters/prisma-appointment.repository");
const redis_slot_client_1 = require("../infra/adapters/redis-slot-client");
const memory_sse_event_bus_1 = require("../infra/adapters/memory-sse-event-bus");
let ScheduleModule = class ScheduleModule {
};
exports.ScheduleModule = ScheduleModule;
exports.ScheduleModule = ScheduleModule = __decorate([
    (0, common_1.Module)({
        controllers: [schedule_controller_1.ScheduleController],
        providers: [
            {
                provide: availability_service_1.AvailabilityService,
                useFactory: (repo, eventBus) => new availability_service_1.AvailabilityService(repo, { publishAvailabilityUpdated: async () => eventBus.publish({ type: 'appointment_created', professionalId: '', payload: null }) }),
                inject: [prisma_availability_repository_1.PrismaAvailabilityRepository, memory_sse_event_bus_1.MemorySSEEventBus],
            },
            {
                provide: slot_calculation_service_1.SlotCalculationService,
                useFactory: (availRepo, apptRepo, slotClient) => new slot_calculation_service_1.SlotCalculationService(availRepo, apptRepo, slotClient),
                inject: [prisma_availability_repository_1.PrismaAvailabilityRepository, prisma_appointment_repository_1.PrismaAppointmentRepository, redis_slot_client_1.RedisSlotClient],
            },
        ],
        exports: [availability_service_1.AvailabilityService, slot_calculation_service_1.SlotCalculationService],
    })
], ScheduleModule);
//# sourceMappingURL=schedule.module.js.map