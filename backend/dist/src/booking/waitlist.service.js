"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitlistService = void 0;
const result_1 = require("../shared/result");
const MAX_NOTIFY_ATTEMPTS = 3;
class WaitlistService {
    waitlistRepo;
    appointmentRepo;
    whatsapp;
    bookingService;
    clock;
    constructor(waitlistRepo, appointmentRepo, whatsapp, bookingService, clock = () => new Date()) {
        this.waitlistRepo = waitlistRepo;
        this.appointmentRepo = appointmentRepo;
        this.whatsapp = whatsapp;
        this.bookingService = bookingService;
        this.clock = clock;
    }
    async addToWaitlist(input) {
        const entry = await this.waitlistRepo.add({
            professionalId: input.professionalId,
            patientId: input.patientId,
            patientPhone: input.patientPhone,
            desiredDate: input.desiredDate,
            desiredTimeRange: input.desiredTimeRange,
        });
        if (!entry) {
            return (0, result_1.err)({ code: 'ALREADY_IN_WAITLIST' });
        }
        return (0, result_1.ok)(entry);
    }
    async handleSlotReleased(input) {
        const now = this.clock();
        const minAllowed = new Date(now.getTime() + input.minAdvanceHours * 60 * 60 * 1000);
        if (input.slotStartAt <= minAllowed) {
            return (0, result_1.ok)('slot_released_directly');
        }
        const desiredDate = input.slotStartAt.toISOString().slice(0, 10);
        const entries = await this.waitlistRepo.findPendingByProfessionalAndDate(input.professionalId, desiredDate);
        if (entries.length === 0) {
            return (0, result_1.ok)('no_waitlist_entries');
        }
        for (const entry of entries) {
            const dayAppointments = await this.appointmentRepo.findByDay(input.professionalId, input.slotStartAt);
            const hasConflict = dayAppointments.some((a) => a.patientId === entry.patientId &&
                a.status === 'confirmed' &&
                a.startAt.getTime() === input.slotStartAt.getTime());
            if (hasConflict) {
                continue;
            }
            let sent = false;
            for (let attempt = 1; attempt <= MAX_NOTIFY_ATTEMPTS; attempt++) {
                const result = await this.whatsapp.sendTemplate(entry.patientPhone, 'waitlist_slot_available', {
                    date: desiredDate,
                    time: input.slotStartAt.toISOString().slice(11, 16),
                });
                if (result.ok) {
                    sent = true;
                    break;
                }
            }
            if (!sent) {
                continue;
            }
            await this.waitlistRepo.updateStatus(entry.id, 'notified', this.clock());
            return (0, result_1.ok)('notified');
        }
        return (0, result_1.ok)('all_skipped');
    }
    async acceptWaitlistSlot(entryId, slotStartAt, slotEndAt, serviceType, idempotencyKey) {
        const entry = await this.waitlistRepo.findById(entryId);
        if (!entry) {
            return (0, result_1.err)({ code: 'WAITLIST_ENTRY_NOT_FOUND', id: entryId });
        }
        const appointmentResult = await this.bookingService.createAppointment({
            professionalId: entry.professionalId,
            patientId: entry.patientId,
            startAt: slotStartAt,
            endAt: slotEndAt,
            serviceType,
            idempotencyKey,
        });
        if (!appointmentResult.ok) {
            return (0, result_1.err)(appointmentResult.error);
        }
        await this.waitlistRepo.updateStatus(entry.id, 'accepted');
        return (0, result_1.ok)({ appointmentId: appointmentResult.value.id });
    }
    async expireEntry(entryId) {
        const entry = await this.waitlistRepo.findById(entryId);
        if (!entry) {
            return (0, result_1.err)({ code: 'WAITLIST_ENTRY_NOT_FOUND', id: entryId });
        }
        await this.waitlistRepo.updateStatus(entry.id, 'expired');
        return (0, result_1.ok)(undefined);
    }
    async getByProfessional(professionalId) {
        const entries = await this.waitlistRepo.findPendingByProfessional(professionalId);
        return (0, result_1.ok)(entries);
    }
}
exports.WaitlistService = WaitlistService;
//# sourceMappingURL=waitlist.service.js.map