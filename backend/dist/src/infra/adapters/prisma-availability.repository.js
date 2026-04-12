"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAvailabilityRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PrismaAvailabilityRepository = class PrismaAvailabilityRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByProfessional(professionalId) {
        const rows = await this.prisma.availability.findMany({ where: { professionalId } });
        return rows.map((r) => ({
            id: r.id,
            professionalId: r.professionalId,
            dayOfWeek: r.dayOfWeek,
            startTime: r.startTime,
            endTime: r.endTime,
            slotDurationMinutes: r.slotDurationMinutes,
            breakDurationMinutes: r.breakDurationMinutes,
            isActive: r.isActive,
            minAdvanceHours: r.minAdvanceHours ?? 2,
        }));
    }
    async upsert(professionalId, config) {
        const row = await this.prisma.availability.upsert({
            where: { professionalId_dayOfWeek: { professionalId, dayOfWeek: config.dayOfWeek } },
            create: { professionalId, ...config },
            update: { ...config },
        });
        return {
            id: row.id,
            professionalId: row.professionalId,
            dayOfWeek: row.dayOfWeek,
            startTime: row.startTime,
            endTime: row.endTime,
            slotDurationMinutes: row.slotDurationMinutes,
            breakDurationMinutes: row.breakDurationMinutes,
            isActive: row.isActive,
            minAdvanceHours: row.minAdvanceHours ?? 2,
        };
    }
};
exports.PrismaAvailabilityRepository = PrismaAvailabilityRepository;
exports.PrismaAvailabilityRepository = PrismaAvailabilityRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaAvailabilityRepository);
//# sourceMappingURL=prisma-availability.repository.js.map