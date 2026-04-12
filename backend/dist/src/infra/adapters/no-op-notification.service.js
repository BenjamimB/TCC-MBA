"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NoOpNotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoOpNotificationService = void 0;
const common_1 = require("@nestjs/common");
let NoOpNotificationService = NoOpNotificationService_1 = class NoOpNotificationService {
    logger = new common_1.Logger(NoOpNotificationService_1.name);
    async sendVerificationEmail(email, token) {
        this.logger.log(`[EMAIL] Verificação → ${email} | token: ${token}`);
    }
    async sendPasswordResetEmail(email, token) {
        this.logger.log(`[EMAIL] Reset de senha → ${email} | token: ${token}`);
    }
    async sendAccountLockedEmail(email) {
        this.logger.log(`[EMAIL] Conta bloqueada → ${email}`);
    }
};
exports.NoOpNotificationService = NoOpNotificationService;
exports.NoOpNotificationService = NoOpNotificationService = NoOpNotificationService_1 = __decorate([
    (0, common_1.Injectable)()
], NoOpNotificationService);
//# sourceMappingURL=no-op-notification.service.js.map