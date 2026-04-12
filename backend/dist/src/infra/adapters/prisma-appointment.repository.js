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
exports.PrismaAppointmentRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
function toAppointment(row) {
    return {
        id: row.id,
        professionalId: row.professionalId,
        patientId: row.patientId,
        startAt: row.startAt,
        endAt: row.endAt,
        status: row.status,
        serviceType: row.serviceType,
        notes: row.notes ?? null,
        externalCalendarEventId: row.externalCalendarEventId ?? null,
        idempotencyKey: row.idempotencyKey,
    };
}
let PrismaAppointmentRepository = class PrismaAppointmentRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const row = await this.prisma.appointment.create({
            data: { ...data, serviceType: data.serviceType },
        });
        return toAppointment(row);
    }
    async findById(id) {
        const row = await this.prisma.appointment.findUnique({ where: { id } });
        return row ? toAppointment(row) : null;
    }
    async findByIdempotencyKey(key) {
        const row = await this.prisma.appointment.findUnique({ where: { idempotencyKey: key } });
        return row ? toAppointment(row) : null;
    }
    async findByDay(professionalId, date) {
        const start = new Date(date);
        start.setUTCHours(0, 0, 0, 0);
        const end = new Date(date);
        end.setUTCHours(23, 59, 59, 999);
        const rows = await this.prisma.appointment.findMany({
            where: { professionalId, startAt: { gte: start, lte: end } },
            orderBy: { startAt: 'asc' },
        });
        return rows.map((r) => toAppointment(r));
    }
    async findByWeek(professionalId, weekStart) {
        const start = new Date(weekStart);
        start.setUTCHours(0, 0, 0, 0);
        const end = new Date(weekStart);
        end.setUTCDate(end.getUTCDate() + 6);
        end.setUTCHours(23, 59, 59, 999);
        const rows = await this.prisma.appointment.findMany({
            where: { professionalId, startAt: { gte: start, lte: end } },
            orderBy: { startAt: 'asc' },
        });
        return rows.map((r) => toAppointment(r));
    }
    async updateStatus(id, status) {
        const row = await this.prisma.appointment.update({ where: { id }, data: { status } });
        return toAppointment(row);
    }
    async findBookedSlots(professionalId, from, to) {
        const rows = await this.prisma.appointment.findMany({
            where: {
                professionalId,
                startAt: { gte: from, lte: to },
                status: { notIn: ['cancelled', 'no_show'] },
            },
            select: { startAt: true, endAt: true },
            orderBy: { startAt: 'asc' },
        });
        return rows;
    }
};
exports.PrismaAppointmentRepository = PrismaAppointmentRepository;
exports.PrismaAppointmentRepository = PrismaAppointmentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaAppointmentRepository);
//# sourceMappingURL=prisma-appointment.repository.js.map