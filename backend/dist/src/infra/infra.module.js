"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfraModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
const redis_service_1 = require("./redis.service");
const bcrypt_hashing_service_1 = require("./adapters/bcrypt-hashing.service");
const jwt_token_service_1 = require("./adapters/jwt-token.service");
const redis_refresh_token_store_1 = require("./adapters/redis-refresh-token.store");
const redis_slot_client_1 = require("./adapters/redis-slot-client");
const no_op_notification_service_1 = require("./adapters/no-op-notification.service");
const memory_sse_event_bus_1 = require("./adapters/memory-sse-event-bus");
const prisma_professional_repository_1 = require("./adapters/prisma-professional.repository");
const prisma_availability_repository_1 = require("./adapters/prisma-availability.repository");
const prisma_patient_repository_1 = require("./adapters/prisma-patient.repository");
const prisma_appointment_repository_1 = require("./adapters/prisma-appointment.repository");
let InfraModule = class InfraModule {
};
exports.InfraModule = InfraModule;
exports.InfraModule = InfraModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            prisma_service_1.PrismaService,
            redis_service_1.RedisService,
            bcrypt_hashing_service_1.BcryptHashingService,
            jwt_token_service_1.JwtTokenService,
            redis_refresh_token_store_1.RedisRefreshTokenStore,
            redis_slot_client_1.RedisSlotClient,
            no_op_notification_service_1.NoOpNotificationService,
            memory_sse_event_bus_1.MemorySSEEventBus,
            prisma_professional_repository_1.PrismaProfessionalRepository,
            prisma_availability_repository_1.PrismaAvailabilityRepository,
            prisma_patient_repository_1.PrismaPatientRepository,
            prisma_appointment_repository_1.PrismaAppointmentRepository,
        ],
        exports: [
            prisma_service_1.PrismaService,
            redis_service_1.RedisService,
            bcrypt_hashing_service_1.BcryptHashingService,
            jwt_token_service_1.JwtTokenService,
            redis_refresh_token_store_1.RedisRefreshTokenStore,
            redis_slot_client_1.RedisSlotClient,
            no_op_notification_service_1.NoOpNotificationService,
            memory_sse_event_bus_1.MemorySSEEventBus,
            prisma_professional_repository_1.PrismaProfessionalRepository,
            prisma_availability_repository_1.PrismaAvailabilityRepository,
            prisma_patient_repository_1.PrismaPatientRepository,
            prisma_appointment_repository_1.PrismaAppointmentRepository,
        ],
    })
], InfraModule);
//# sourceMappingURL=infra.module.js.map