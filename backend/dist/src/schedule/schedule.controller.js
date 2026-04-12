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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleController = void 0;
const common_1 = require("@nestjs/common");
const availability_service_1 = require("./availability.service");
const slot_calculation_service_1 = require("./slot-calculation.service");
let ScheduleController = class ScheduleController {
    availabilityService;
    slotCalculationService;
    constructor(availabilityService, slotCalculationService) {
        this.availabilityService = availabilityService;
        this.slotCalculationService = slotCalculationService;
    }
    async getAvailability(professionalId) {
        const result = await this.availabilityService.getConfig(professionalId);
        if (!result.ok)
            throw Object.assign(new Error(result.error.code), { status: 400 });
        return result.value;
    }
    async updateAvailability(professionalId, body) {
        const result = await this.availabilityService.updateConfig(professionalId, body.configs);
        if (!result.ok)
            throw Object.assign(new Error(result.error.code), { status: 422, error: result.error });
        return { message: 'Disponibilidade atualizada.' };
    }
    async getSlots(professionalId, from, to) {
        const result = await this.slotCalculationService.getAvailableSlots(professionalId, new Date(from), new Date(to));
        if (!result.ok)
            throw Object.assign(new Error(result.error.code), { status: 400 });
        return result.value;
    }
};
exports.ScheduleController = ScheduleController;
__decorate([
    (0, common_1.Get)('availability'),
    __param(0, (0, common_1.Query)('professionalId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "getAvailability", null);
__decorate([
    (0, common_1.Put)('availability'),
    __param(0, (0, common_1.Query)('professionalId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "updateAvailability", null);
__decorate([
    (0, common_1.Get)('slots'),
    __param(0, (0, common_1.Query)('professionalId')),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "getSlots", null);
exports.ScheduleController = ScheduleController = __decorate([
    (0, common_1.Controller)('schedule'),
    __metadata("design:paramtypes", [availability_service_1.AvailabilityService,
        slot_calculation_service_1.SlotCalculationService])
], ScheduleController);
//# sourceMappingURL=schedule.controller.js.map