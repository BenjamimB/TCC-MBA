"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityService = void 0;
const result_1 = require("../shared/result");
function toMinutes(time) {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
}
class AvailabilityService {
    repo;
    eventPublisher;
    clock;
    constructor(repo, eventPublisher, clock = () => new Date()) {
        this.repo = repo;
        this.eventPublisher = eventPublisher;
        this.clock = clock;
    }
    async getConfig(professionalId) {
        const records = await this.repo.findByProfessional(professionalId);
        return (0, result_1.ok)(records);
    }
    async updateConfig(professionalId, configs) {
        const days = configs.map((c) => c.dayOfWeek);
        if (new Set(days).size !== days.length) {
            return (0, result_1.err)({
                code: 'VALIDATION_ERROR',
                fields: { dayOfWeek: 'Não é permitido dois horários para o mesmo dia da semana.' },
            });
        }
        for (const config of configs) {
            const validationError = this.validate(config);
            if (validationError)
                return (0, result_1.err)(validationError);
        }
        for (const config of configs) {
            await this.repo.upsert(professionalId, config);
        }
        await this.eventPublisher.publishAvailabilityUpdated({
            professionalId,
            updatedAt: this.clock(),
        });
        return (0, result_1.ok)(undefined);
    }
    validate(config) {
        const startMinutes = toMinutes(config.startTime);
        const endMinutes = toMinutes(config.endTime);
        if (endMinutes <= startMinutes) {
            return { code: 'VALIDATION_ERROR', fields: { endTime: 'Horário de fim deve ser posterior ao de início.' } };
        }
        if (config.slotDurationMinutes < 15) {
            return { code: 'VALIDATION_ERROR', fields: { slotDurationMinutes: 'Duração mínima é 15 minutos.' } };
        }
        if (config.breakDurationMinutes < 0) {
            return { code: 'VALIDATION_ERROR', fields: { breakDurationMinutes: 'Intervalo não pode ser negativo.' } };
        }
        return null;
    }
}
exports.AvailabilityService = AvailabilityService;
//# sourceMappingURL=availability.service.js.map