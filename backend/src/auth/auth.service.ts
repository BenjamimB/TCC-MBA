import type { Result } from '../shared/result';
import { ok, err } from '../shared/result';
import type { AuthTokens } from './auth.types';
import type { IProfessionalRepository } from './ports/professional.repository.port';
import type { IHashingService } from './ports/hashing.service.port';
import type { ITokenService } from './ports/token.service.port';
import type { IRefreshTokenStore } from './ports/refresh-token.store.port';
import type { IAuthNotificationService } from './ports/auth-notification.service.port';

// AC 11.3 — mín. 8 chars, ao menos uma letra e ao menos um número
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

const LOCK_THRESHOLD = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000;
const RESET_TOKEN_TTL_MS = 60 * 60 * 1000;
const REFRESH_TOKEN_TTL_S = 7 * 24 * 60 * 60;

export class AuthService {
  constructor(
    private readonly professionalRepo: IProfessionalRepository,
    private readonly hashing: IHashingService,
    private readonly tokenService: ITokenService,
    private readonly refreshStore: IRefreshTokenStore,
    private readonly notifications: IAuthNotificationService,
    private readonly clock: () => Date = () => new Date(),
  ) {}

  async register(email: string, password: string, name: string): Promise<Result<void>> {
    if (!PASSWORD_REGEX.test(password)) {
      return err({ code: 'VALIDATION_ERROR', fields: { password: 'Senha inválida: mínimo 8 caracteres, letras e números.' } });
    }

    const existing = await this.professionalRepo.findByEmail(email);
    if (existing) {
      return err({ code: 'CONFLICT', resource: 'email' });
    }

    const passwordHash = await this.hashing.hash(password);
    const emailVerifyToken = this.tokenService.generateOpaqueToken();

    await this.professionalRepo.create({ email, name, passwordHash, emailVerifyToken });
    await this.notifications.sendVerificationEmail(email, emailVerifyToken);

    return ok(undefined);
  }

  async login(email: string, password: string): Promise<Result<AuthTokens>> {
    const professional = await this.professionalRepo.findByEmail(email);
    if (!professional) {
      return err({ code: 'UNAUTHORIZED' });
    }

    const now = this.clock();

    if (professional.lockedUntil && professional.lockedUntil > now) {
      const retryAfterSeconds = Math.ceil((professional.lockedUntil.getTime() - now.getTime()) / 1000);
      return err({ code: 'RATE_LIMITED', retryAfterSeconds });
    }

    if (!professional.emailVerifiedAt) {
      return err({ code: 'EMAIL_NOT_VERIFIED' });
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
      return err({ code: 'UNAUTHORIZED' });
    }

    await this.professionalRepo.update(professional.id, {
      failedLoginAttempts: 0,
      lockedUntil: null,
    });

    const accessToken = this.tokenService.generateAccessToken(professional.id);
    const refreshToken = this.tokenService.generateRefreshToken();
    await this.refreshStore.store(refreshToken, professional.id, REFRESH_TOKEN_TTL_S);

    return ok({ accessToken, refreshToken, expiresIn: 900 });
  }

  async verifyEmail(token: string): Promise<Result<void>> {
    const professional = await this.professionalRepo.findByEmailVerifyToken(token);
    if (!professional) {
      return err({ code: 'UNAUTHORIZED' });
    }

    await this.professionalRepo.update(professional.id, {
      emailVerifiedAt: this.clock(),
      emailVerifyToken: null,
    });

    return ok(undefined);
  }

  async requestPasswordReset(email: string): Promise<Result<void>> {
    const professional = await this.professionalRepo.findByEmail(email);
    if (!professional) {
      return ok(undefined);
    }

    const resetToken = this.tokenService.generateOpaqueToken();
    const expiresAt = new Date(this.clock().getTime() + RESET_TOKEN_TTL_MS);

    await this.professionalRepo.update(professional.id, {
      resetPasswordToken: resetToken,
      resetPasswordExpiresAt: expiresAt,
    });
    await this.notifications.sendPasswordResetEmail(professional.email, resetToken);

    return ok(undefined);
  }

  async resetPassword(token: string, newPassword: string): Promise<Result<void>> {
    const professional = await this.professionalRepo.findByResetPasswordToken(token);
    if (!professional) {
      return err({ code: 'UNAUTHORIZED' });
    }

    const now = this.clock();
    if (!professional.resetPasswordExpiresAt || professional.resetPasswordExpiresAt <= now) {
      return err({ code: 'UNAUTHORIZED' });
    }

    if (!PASSWORD_REGEX.test(newPassword)) {
      return err({ code: 'VALIDATION_ERROR', fields: { password: 'Senha inválida: mínimo 8 caracteres, letras e números.' } });
    }

    const passwordHash = await this.hashing.hash(newPassword);
    await this.professionalRepo.update(professional.id, {
      passwordHash,
      resetPasswordToken: null,
      resetPasswordExpiresAt: null,
    });

    return ok(undefined);
  }

  async refresh(refreshToken: string): Promise<Result<AuthTokens>> {
    const professionalId = await this.refreshStore.find(refreshToken);
    if (!professionalId) {
      return err({ code: 'UNAUTHORIZED' });
    }

    await this.refreshStore.delete(refreshToken);

    const newAccessToken = this.tokenService.generateAccessToken(professionalId);
    const newRefreshToken = this.tokenService.generateRefreshToken();
    await this.refreshStore.store(newRefreshToken, professionalId, REFRESH_TOKEN_TTL_S);

    return ok({ accessToken: newAccessToken, refreshToken: newRefreshToken, expiresIn: 900 });
  }

  async logout(refreshToken: string): Promise<Result<void>> {
    const professionalId = await this.refreshStore.find(refreshToken);
    if (!professionalId) {
      return err({ code: 'UNAUTHORIZED' });
    }
    await this.refreshStore.delete(refreshToken);
    return ok(undefined);
  }
}
