"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const result_1 = require("../shared/result");
class BookingService {
    repo;
    eventBus;
    clock;
    constructor(repo, eventBus, clock = () => new Date()) {
        this.repo = repo;
        this.eventBus = eventBus;
        this.clock = clock;
    }
    async createAppointment(input) {
        const now = this.clock();
        if (input.startAt <= now) {
            return (0, result_1.err)({ code: 'APPOINTMENT_IN_PAST' });
        }
        const minAdvanceHours = input.minAdvanceHours ?? 0;
        const minAllowed = new Date(now.getTime() + minAdvanceHours * 60 * 60 * 1000);
        if (input.startAt < minAllowed) {
            return (0, result_1.err)({ code: 'BELOW_MIN_ADVANCE_NOTICE', minHours: minAdvanceHours });
        }
        const existing = await this.repo.findByIdempotencyKey(input.idempotencyKey);
        if (existing) {
            return (0, result_1.ok)(existing);
        }
        const appointment = await this.repo.create({
            professionalId: input.professionalId,
            patientId: input.patientId,
            startAt: input.startAt,
            endAt: input.endAt,
            serviceType: input.serviceType,
            idempotencyKey: input.idempotencyKey,
        });
        this.eventBus.publish({
            type: 'appointment_created',
            professionalId: appointment.professionalId,
            payload: { appointmentId: appointment.id, startAt: appointment.startAt },
        });
        return (0, result_1.ok)(appointment);
    }
    async cancelAppointment(id, requestedBy) {
        const appointment = await this.repo.findById(id);
        if (!appointment) {
            return (0, result_1.err)({ code: 'APPOINTMENT_NOT_FOUND', id });
        }
        const now = this.clock();
        if (appointment.startAt <= now) {
            return (0, result_1.err)({ code: 'APPOINTMENT_ALREADY_PAST', id });
        }
        await this.repo.updateStatus(id, 'cancelled');
        this.eventBus.publish({
            type: 'appointment_cancelled',
            professionalId: appointment.professionalId,
            payload: { appointmentId: id, requestedBy },
        });
        return (0, result_1.ok)(undefined);
    }
    async confirmAppointment(id) {
        const appointment = await this.repo.findById(id);
        if (!appointment) {
            return (0, result_1.err)({ code: 'APPOINTMENT_NOT_FOUND', id });
        }
        await this.repo.updateStatus(id, 'confirmed');
        this.eventBus.publish({
            type: 'appointment_confirmed',
            professionalId: appointment.professionalId,
            payload: { appointmentId: id },
        });
        return (0, result_1.ok)(undefined);
    }
    async getById(id) {
        const appointment = await this.repo.findById(id);
        if (!appointment) {
            return (0, result_1.err)({ code: 'APPOINTMENT_NOT_FOUND', id });
        }
        return (0, result_1.ok)(appointment);
    }
    async getByDay(professionalId, date) {
        const appointments = await this.repo.findByDay(professionalId, date);
        return (0, result_1.ok)(appointments);
    }
    async getByWeek(professionalId, weekStart) {
        const appointments = await this.repo.findByWeek(professionalId, weekStart);
        return (0, result_1.ok)(appointments);
    }
}
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map