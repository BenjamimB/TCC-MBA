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
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("./booking.service");
let BookingController = class BookingController {
    bookingService;
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    async create(body) {
        const result = await this.bookingService.createAppointment(body);
        if (!result.ok)
            throw Object.assign(new Error(result.error.code), { status: 422, error: result.error });
        return result.value;
    }
    async getByDay(professionalId, date) {
        const result = await this.bookingService.getByDay(professionalId, new Date(date));
        if (!result.ok)
            throw Object.assign(new Error(result.error.code), { status: 400 });
        return result.value;
    }
    async getByWeek(professionalId, weekStart) {
        const result = await this.bookingService.getByWeek(professionalId, new Date(weekStart));
        if (!result.ok)
            throw Object.assign(new Error(result.error.code), { status: 400 });
        return result.value;
    }
    async getById(id) {
        const result = await this.bookingService.getById(id);
        if (!result.ok)
            throw Object.assign(new Error(result.error.code), { status: 404, error: result.error });
        return result.value;
    }
    async cancel(id, requestedBy = 'patient') {
        const result = await this.bookingService.cancelAppointment(id, requestedBy);
        if (!result.ok)
            throw Object.assign(new Error(result.error.code), { status: 422, error: result.error });
    }
    async confirm(id) {
        const result = await this.bookingService.confirmAppointment(id);
        if (!result.ok)
            throw Object.assign(new Error(result.error.code), { status: 422, error: result.error });
        return { message: 'Consulta confirmada.' };
    }
};
exports.BookingController = BookingController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('day'),
    __param(0, (0, common_1.Query)('professionalId')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getByDay", null);
__decorate([
    (0, common_1.Get)('week'),
    __param(0, (0, common_1.Query)('professionalId')),
    __param(1, (0, common_1.Query)('weekStart')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getByWeek", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('requestedBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "cancel", null);
__decorate([
    (0, common_1.Patch)(':id/confirm'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "confirm", null);
exports.BookingController = BookingController = __decorate([
    (0, common_1.Controller)('appointments'),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingController);
//# sourceMappingURL=booking.controller.js.map