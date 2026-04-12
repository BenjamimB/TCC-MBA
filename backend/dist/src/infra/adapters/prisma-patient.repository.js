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
exports.PrismaPatientRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
function toPatient(row) {
    return {
        id: row.id,
        professionalId: row.professionalId,
        phoneNumber: row.phoneNumber,
        name: row.name ?? null,
        dateOfBirth: row.dateOfBirth ?? null,
        consentRecordedAt: row.consentRecordedAt ?? null,
        anonymizedAt: row.anonymizedAt ?? null,
        createdAt: row.createdAt,
    };
}
let PrismaPatientRepository = class PrismaPatientRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByPhone(professionalId, phoneNumber) {
        const row = await this.prisma.patient.findUnique({
            where: { professionalId_phoneNumber: { professionalId, phoneNumber } },
        });
        return row ? toPatient(row) : null;
    }
    async findById(id) {
        const row = await this.prisma.patient.findUnique({ where: { id } });
        return row ? toPatient(row) : null;
    }
    async create(data) {
        const row = await this.prisma.patient.create({ data });
        return toPatient(row);
    }
    async update(id, data) {
        const row = await this.prisma.patient.update({ where: { id }, data: data });
        return toPatient(row);
    }
    async findInteractionHistory(patientId, professionalId) {
        const rows = await this.prisma.interactionRecord.findMany({
            where: { patientId, professionalId },
            orderBy: { createdAt: 'asc' },
        });
        return rows.map((r) => ({
            id: r.id,
            patientId: r.patientId,
            professionalId: r.professionalId,
            type: r.type,
            content: r.content,
            metadata: (r.metadata ?? {}),
            createdAt: r.createdAt,
        }));
    }
};
exports.PrismaPatientRepository = PrismaPatientRepository;
exports.PrismaPatientRepository = PrismaPatientRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaPatientRepository);
//# sourceMappingURL=prisma-patient.repository.js.map