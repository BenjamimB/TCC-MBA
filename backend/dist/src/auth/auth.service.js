"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const result_1 = require("../shared/result");
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
const LOCK_THRESHOLD = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000;
const RESET_TOKEN_TTL_MS = 60 * 60 * 1000;
const REFRESH_TOKEN_TTL_S = 7 * 24 * 60 * 60;
class AuthService {
    professionalRepo;
    hashing;
    tokenService;
    refreshStore;
    notifications;
    clock;
    constructor(professionalRepo, hashing, tokenService, refreshStore, notifications, clock = () => new Date()) {
        this.professionalRepo = professionalRepo;
        this.hashing = hashing;
        this.tokenService = tokenService;
        this.refreshStore = refreshStore;
        this.notifications = notifications;
        this.clock = clock;
    }
    async register(email, password, name) {
        if (!PASSWORD_REGEX.test(password)) {
            return (0, result_1.err)({ code: 'VALIDATION_ERROR', fields: { password: 'Senha inválida: mínimo 8 caracteres, letras e números.' } });
        }
        const existing = await this.professionalRepo.findByEmail(email);
        if (existing) {
            return (0, result_1.err)({ code: 'CONFLICT', resource: 'email' });
        }
        const passwordHash = await this.hashing.hash(password);
        const emailVerifyToken = this.tokenService.generateOpaqueToken();
        await this.professionalRepo.create({ email, name, passwordHash, emailVerifyToken });
        await this.notifications.sendVerificationEmail(email, emailVerifyToken);
        return (0, result_1.ok)(undefined);
    }
    async login(email, password) {
        const professional = await this.professionalRepo.findByEmail(email);
        if (!professional) {
            return (0, result_1.err)({ code: 'UNAUTHORIZED' });
        }
        const now = this.clock();
        if (professional.lockedUntil && professional.lockedUntil > now) {
            const retryAfterSeconds = Math.ceil((professional.lockedUntil.getTime() - now.getTime()) / 1000);
            return (0, result_1.err)({ code: 'RATE_LIMITED', retryAfterSeconds });
        }
        if (!professional.emailVerifiedAt) {
            return (0, result_1.err)({ code: 'EMAIL_NOT_VERIFIED' });
        }
        const passwordMatch = professional.passwordHash
            ? await this.hashing.compare(password, professional.passwordHash)
            : false;
        if (!passwordMatch) {
            const newAttempts = professional.failedLoginAttempts + 1;
            const shouldLock = newAttempts >= LOCK_THRESHOLD;
            await this.professionalRepo.update(professional.id, {
                failedLoginAttempts: newAttempts,
                ...(shouldLock && { lockedUntil: new Date(now.getTime() + LOCK_DURATION_MS) }),
            });
            if (shouldLock) {
                await this.notifications.sendAccountLockedEmail(professional.email);
            }
            return (0, result_1.err)({ code: 'UNAUTHORIZED' });
        }
        await this.professionalRepo.update(professional.id, {
            failedLoginAttempts: 0,
            lockedUntil: null,
        });
        const accessToken = this.tokenService.generateAccessToken(professional.id);
        const refreshToken = this.tokenService.generateRefreshToken();
        await this.refreshStore.store(refreshToken, professional.id, REFRESH_TOKEN_TTL_S);
        return (0, result_1.ok)({ accessToken, refreshToken, expiresIn: 900 });
    }
    async verifyEmail(token) {
        const professional = await this.professionalRepo.findByEmailVerifyToken(token);
        if (!professional) {
            return (0, result_1.err)({ code: 'UNAUTHORIZED' });
        }
        await this.professionalRepo.update(professional.id, {
            emailVerifiedAt: this.clock(),
            emailVerifyToken: null,
        });
        return (0, result_1.ok)(undefined);
    }
    async requestPasswordReset(email) {
        const professional = await this.professionalRepo.findByEmail(email);
        if (!professional) {
            return (0, result_1.ok)(undefined);
        }
        const resetToken = this.tokenService.generateOpaqueToken();
        const expiresAt = new Date(this.clock().getTime() + RESET_TOKEN_TTL_MS);
        await this.professionalRepo.update(professional.id, {
            resetPasswordToken: resetToken,
            resetPasswordExpiresAt: expiresAt,
        });
        await this.notifications.sendPasswordResetEmail(professional.email, resetToken);
        return (0, result_1.ok)(undefined);
    }
    async resetPassword(token, newPassword) {
        const professional = await this.professionalRepo.findByResetPasswordToken(token);
        if (!professional) {
            return (0, result_1.err)({ code: 'UNAUTHORIZED' });
        }
        const now = this.clock();
        if (!professional.resetPasswordExpiresAt || professional.resetPasswordExpiresAt <= now) {
            return (0, result_1.err)({ code: 'UNAUTHORIZED' });
        }
        if (!PASSWORD_REGEX.test(newPassword)) {
            return (0, result_1.err)({ code: 'VALIDATION_ERROR', fields: { password: 'Senha inválida: mínimo 8 caracteres, letras e números.' } });
        }
        const passwordHash = await this.hashing.hash(newPassword);
        await this.professionalRepo.update(professional.id, {
            passwordHash,
            resetPasswordToken: null,
            resetPasswordExpiresAt: null,
        });
        return (0, result_1.ok)(undefined);
    }
    async refresh(refreshToken) {
        const professionalId = await this.refreshStore.find(refreshToken);
        if (!professionalId) {
            return (0, result_1.err)({ code: 'UNAUTHORIZED' });
        }
        await this.refreshStore.delete(refreshToken);
        const newAccessToken = this.tokenService.generateAccessToken(professionalId);
        const newRefreshToken = this.tokenService.generateRefreshToken();
        await this.refreshStore.store(newRefreshToken, professionalId, REFRESH_TOKEN_TTL_S);
        return (0, result_1.ok)({ accessToken: newAccessToken, refreshToken: newRefreshToken, expiresIn: 900 });
    }
    async logout(refreshToken) {
        const professionalId = await this.refreshStore.find(refreshToken);
        if (!professionalId) {
            return (0, result_1.err)({ code: 'UNAUTHORIZED' });
        }
        await this.refreshStore.delete(refreshToken);
        return (0, result_1.ok)(undefined);
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map