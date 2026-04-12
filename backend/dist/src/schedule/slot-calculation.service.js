"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotCalculationService = void 0;
const result_1 = require("../shared/result");
class SlotCalculationService {
    availRepo;
    appointmentQuery;
    slotReservation;
    clock;
    constructor(availRepo, appointmentQuery, slotReservation, clock = () => new Date()) {
        this.availRepo = availRepo;
        this.appointmentQuery = appointmentQuery;
        this.slotReservation = slotReservation;
        this.clock = clock;
    }
    async getAvailableSlots(professionalId, from, to) {
        const availabilities = await this.availRepo.findByProfessional(professionalId);
        const now = this.clock();
        const rangeEnd = new Date(to);
        rangeEnd.setUTCHours(23, 59, 59, 999);
        const bookedSlots = await this.appointmentQuery.findBookedSlots(professionalId, from, rangeEnd);
        const slots = [];
        const current = new Date(from);
        current.setUTCHours(0, 0, 0, 0);
        while (current <= rangeEnd) {
            const dayOfWeek = current.getUTCDay();
            const avail = availabilities.find((a) => a.dayOfWeek === dayOfWeek && a.isActive);
            if (avail) {
                const [startH, startM] = avail.startTime.split(':').map(Number);
                const [endH, endM] = avail.endTime.split(':').map(Number);
                const endMinutes = endH * 60 + endM;
                const stepMinutes = avail.slotDurationMinutes + avail.breakDurationMinutes;
                let slotStartMinutes = startH * 60 + startM;
                while (slotStartMinutes + avail.slotDurationMinutes <= endMinutes) {
                    const slotStart = new Date(current);
                    slotStart.setUTCHours(Math.floor(slotStartMinutes / 60), slotStartMinutes % 60, 0, 0);
                    const slotEnd = new Date(slotStart);
                    slotEnd.setUTCMinutes(slotEnd.getUTCMinutes() + avail.slotDurationMinutes);
                    const minAdvanceMs = avail.minAdvanceHours * 60 * 60 * 1000;
                    const earliestAllowed = new Date(now.getTime() + minAdvanceMs);
                    if (slotStart >= earliestAllowed && !this.overlapsBooked(slotStart, slotEnd, bookedSlots)) {
                        const dateStr = current.toISOString().slice(0, 10);
                        const hh = String(Math.floor(slotStartMinutes / 60)).padStart(2, '0');
                        const mm = String(slotStartMinutes % 60).padStart(2, '0');
                        const slotId = `${professionalId}:${dateStr}:${hh}${mm}`;
                        slots.push({ slotId, startAt: slotStart, endAt: slotEnd, isReserved: false });
                    }
                    slotStartMinutes += stepMinutes;
                }
            }
            current.setUTCDate(current.getUTCDate() + 1);
        }
        await Promise.all(slots.map(async (slot) => {
            slot.isReserved = await this.slotReservation.isReserved(slot.slotId);
        }));
        return (0, result_1.ok)(slots);
    }
    overlapsBooked(start, end, booked) {
        return booked.some((b) => start < b.endAt && end > b.startAt);
    }
}
exports.SlotCalculationService = SlotCalculationService;
//# sourceMappingURL=slot-calculation.service.js.map