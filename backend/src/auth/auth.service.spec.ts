/**
 * Task 2.1 — AuthService unit tests
 *
 * Cobre: registro, login, verificação de e-mail, recuperação de acesso,
 * bloqueio de conta após tentativas falhas, refresh e logout.
 * Requirements: 11.1, 11.3, 11.4, 11.5
 */
import { AuthService } from './auth.service';
import type { IProfessionalRepository } from './ports/professional.repository.port';
import type { IHashingService } from './ports/hashing.service.port';
import type { ITokenService } from './ports/token.service.port';
import type { IRefreshTokenStore } from './ports/refresh-token.store.port';
import type { IAuthNotificationService } from './ports/auth-notification.service.port';
import type { ProfessionalRecord } from './auth.types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const LOCK_THRESHOLD = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000;
const RESET_TOKEN_TTL_MS = 60 * 60 * 1000;
const REFRESH_TOKEN_TTL_S = 7 * 24 * 60 * 60;

const FIXED_NOW = new Date('2025-01-01T12:00:00Z');

function makeProfessional(overrides: Partial<ProfessionalRecord> = {}): ProfessionalRecord {
  return {
    id: 'prof-1',
    email: 'dr@example.com',
    name: 'Dr. Test',
    passwordHash: 'hashed-password',
    emailVerifiedAt: new Date('2024-01-01'),
    emailVerifyToken: null,
    resetPasswordToken: null,
    resetPasswordExpiresAt: null,
    failedLoginAttempts: 0,
    lockedUntil: null,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

describe('AuthService', () => {
  let service: AuthService;
  let repo: jest.Mocked<IProfessionalRepository>;
  let hashing: jest.Mocked<IHashingService>;
  let tokens: jest.Mocked<ITokenService>;
  let refreshStore: jest.Mocked<IRefreshTokenStore>;
  let notifications: jest.Mocked<IAuthNotificationService>;

  beforeEach(() => {
    repo = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      findByEmailVerifyToken: jest.fn(),
      findByResetPasswordToken: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
    hashing = {
      hash: jest.fn(),
      compare: jest.fn(),
    };
    tokens = {
      generateAccessToken: jest.fn().mockReturnValue('access-token-jwt'),
      generateRefreshToken: jest.fn().mockReturnValue('refresh-token-opaque'),
      generateOpaqueToken: jest.fn().mockReturnValue('opaque-token-123'),
    };
    refreshStore = {
      store: jest.fn().mockResolvedValue(undefined),
      find: jest.fn(),
      delete: jest.fn().mockResolvedValue(undefined),
    };
    notifications = {
      sendVerificationEmail: jest.fn().mockResolvedValue(undefined),
      sendPasswordResetEmail: jest.fn().mockResolvedValue(undefined),
      sendAccountLockedEmail: jest.fn().mockResolvedValue(undefined),
    };

    service = new AuthService(repo, hashing, tokens, refreshStore, notifications, () => FIXED_NOW);
  });

  // =========================================================================
  // register()
  // =========================================================================

  describe('register()', () => {
    it('[TC-F-01] deve criar profissional com e-mail e senha válidos', async () => {
      repo.findByEmail.mockResolvedValue(null);
      hashing.hash.mockResolvedValue('bcrypt-hash');
      const created = makeProfessional({ email: 'new@example.com', name: 'Novo' });
      repo.create.mockResolvedValue(created);

      const result = await service.register('new@example.com', 'senha123', 'Novo');

      expect(result.ok).toBe(true);
      expect(hashing.hash).toHaveBeenCalledWith('senha123');
      expect(repo.create).toHaveBeenCalledWith(
        expect.objectContaining({ email: 'new@example.com', name: 'Novo', passwordHash: 'bcrypt-hash' }),
      );
    });

    it('[TC-F-02] deve retornar CONFLICT quando e-mail já está cadastrado', async () => {
      repo.findByEmail.mockResolvedValue(makeProfessional());

      const result = await service.register('dr@example.com', 'senha123', 'Test');

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('CONFLICT');
      }
    });

    it('[TC-F-03] deve retornar VALIDATION_ERROR quando senha tem menos de 8 caracteres', async () => {
      repo.findByEmail.mockResolvedValue(null);

      const result = await service.register('new@example.com', 'ab1', 'Test');

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('VALIDATION_ERROR');
      }
    });

    it('[TC-F-04] deve retornar VALIDATION_ERROR quando senha não contém letras', async () => {
      repo.findByEmail.mockResolvedValue(null);

      const result = await service.register('new@example.com', '12345678', 'Test');

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('VALIDATION_ERROR');
      }
    });

    it('[TC-F-05] deve retornar VALIDATION_ERROR quando senha não contém números', async () => {
      repo.findByEmail.mockResolvedValue(null);

      const result = await service.register('new@example.com', 'senhasemnum', 'Test');

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('VALIDATION_ERROR');
      }
    });

    it('[TC-F-06] deve enviar e-mail de verificação após registro bem-sucedido', async () => {
      repo.findByEmail.mockResolvedValue(null);
      hashing.hash.mockResolvedValue('hash');
      repo.create.mockResolvedValue(makeProfessional({ email: 'new@example.com' }));

      await service.register('new@example.com', 'senha123', 'Test');

      expect(notifications.sendVerificationEmail).toHaveBeenCalledWith(
        'new@example.com',
        expect.any(String),
      );
    });

    it('[TC-F-07] deve incluir token de verificação no registro da conta criada', async () => {
      repo.findByEmail.mockResolvedValue(null);
      hashing.hash.mockResolvedValue('hash');
      tokens.generateOpaqueToken.mockReturnValue('verify-token-xyz');
      repo.create.mockResolvedValue(makeProfessional());

      await service.register('new@example.com', 'senha123', 'Test');

      expect(repo.create).toHaveBeenCalledWith(
        expect.objectContaining({ emailVerifyToken: 'verify-token-xyz' }),
      );
      expect(notifications.sendVerificationEmail).toHaveBeenCalledWith('new@example.com', 'verify-token-xyz');
    });
  });

  // =========================================================================
  // login()
  // =========================================================================

  describe('login()', () => {
    it('[TC-F-08] deve retornar AuthTokens com credenciais válidas', async () => {
      repo.findByEmail.mockResolvedValue(makeProfessional());
      hashing.compare.mockResolvedValue(true);
      repo.update.mockResolvedValue(makeProfessional());

      const result = await service.login('dr@example.com', 'correta');

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.accessToken).toBe('access-token-jwt');
        expect(result.value.refreshToken).toBe('refresh-token-opaque');
        expect(result.value.expiresIn).toBe(900);
      }
    });

    it('[TC-F-09] deve armazenar refresh token com TTL 7 dias no login bem-sucedido', async () => {
      repo.findByEmail.mockResolvedValue(makeProfessional());
      hashing.compare.mockResolvedValue(true);
      repo.update.mockResolvedValue(makeProfessional());

      await service.login('dr@example.com', 'correta');

      expect(refreshStore.store).toHaveBeenCalledWith(
        'refresh-token-opaque',
        'prof-1',
        REFRESH_TOKEN_TTL_S,
      );
    });

    it('[TC-F-10] deve retornar UNAUTHORIZED com senha incorreta', async () => {
      repo.findByEmail.mockResolvedValue(makeProfessional());
      hashing.compare.mockResolvedValue(false);
      repo.update.mockResolvedValue(makeProfessional({ failedLoginAttempts: 1 }));

      const result = await service.login('dr@example.com', 'errada');

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('UNAUTHORIZED');
      }
    });

    it('[TC-F-11] deve incrementar failedLoginAttempts em tentativa com senha incorreta', async () => {
      const prof = makeProfessional({ failedLoginAttempts: 2 });
      repo.findByEmail.mockResolvedValue(prof);
      hashing.compare.mockResolvedValue(false);
      repo.update.mockResolvedValue(prof);

      await service.login('dr@example.com', 'errada');

      expect(repo.update).toHaveBeenCalledWith(
        'prof-1',
        expect.objectContaining({ failedLoginAttempts: 3 }),
      );
    });

    it('[TC-F-12] deve bloquear conta após atingir threshold de 5 tentativas falhas', async () => {
      const prof = makeProfessional({ failedLoginAttempts: LOCK_THRESHOLD - 1 });
      repo.findByEmail.mockResolvedValue(prof);
      hashing.compare.mockResolvedValue(false);
      repo.update.mockResolvedValue(prof);

      await service.login('dr@example.com', 'errada');

      const expectedLockedUntil = new Date(FIXED_NOW.getTime() + LOCK_DURATION_MS);
      expect(repo.update).toHaveBeenCalledWith(
        'prof-1',
        expect.objectContaining({
          lockedUntil: expectedLockedUntil,
          failedLoginAttempts: LOCK_THRESHOLD,
        }),
      );
    });

    it('[TC-F-13] deve notificar profissional por e-mail ao bloquear a conta', async () => {
      const prof = makeProfessional({ failedLoginAttempts: LOCK_THRESHOLD - 1 });
      repo.findByEmail.mockResolvedValue(prof);
      hashing.compare.mockResolvedValue(false);
      repo.update.mockResolvedValue(prof);

      await service.login('dr@example.com', 'errada');

      expect(notifications.sendAccountLockedEmail).toHaveBeenCalledWith('dr@example.com');
    });

    it('[TC-F-14] deve retornar RATE_LIMITED quando conta está bloqueada', async () => {
      const futureUnlock = new Date(FIXED_NOW.getTime() + 5 * 60 * 1000);
      repo.findByEmail.mockResolvedValue(makeProfessional({ lockedUntil: futureUnlock }));

      const result = await service.login('dr@example.com', 'qualquer');

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('RATE_LIMITED');
        if (result.error.code === 'RATE_LIMITED') {
          expect(result.error.retryAfterSeconds).toBeGreaterThan(0);
        }
      }
    });

    it('[TC-F-15] deve retornar UNAUTHORIZED quando e-mail não existe', async () => {
      repo.findByEmail.mockResolvedValue(null);

      const result = await service.login('nao@existe.com', 'senha123');

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('UNAUTHORIZED');
      }
    });

    it('[TC-F-16] deve resetar failedLoginAttempts após login bem-sucedido', async () => {
      const prof = makeProfessional({ failedLoginAttempts: 3 });
      repo.findByEmail.mockResolvedValue(prof);
      hashing.compare.mockResolvedValue(true);
      repo.update.mockResolvedValue(makeProfessional());

      await service.login('dr@example.com', 'correta');

      expect(repo.update).toHaveBeenCalledWith(
        'prof-1',
        expect.objectContaining({ failedLoginAttempts: 0, lockedUntil: null }),
      );
    });

    it('[TC-F-17] deve permitir login após expiração do bloqueio', async () => {
      const pastUnlock = new Date(FIXED_NOW.getTime() - 1000);
      repo.findByEmail.mockResolvedValue(makeProfessional({ lockedUntil: pastUnlock }));
      hashing.compare.mockResolvedValue(true);
      repo.update.mockResolvedValue(makeProfessional());

      const result = await service.login('dr@example.com', 'correta');

      expect(result.ok).toBe(true);
    });
  });

  // =========================================================================
  // verifyEmail()
  // =========================================================================

  describe('verifyEmail()', () => {
    it('[TC-F-18] deve marcar e-mail como verificado com token válido', async () => {
      const prof = makeProfessional({ emailVerifiedAt: null, emailVerifyToken: 'valid-token' });
      repo.findByEmailVerifyToken.mockResolvedValue(prof);
      repo.update.mockResolvedValue(makeProfessional());

      const result = await service.verifyEmail('valid-token');

      expect(result.ok).toBe(true);
      expect(repo.update).toHaveBeenCalledWith(
        'prof-1',
        expect.objectContaining({
          emailVerifiedAt: FIXED_NOW,
          emailVerifyToken: null,
        }),
      );
    });

    it('[TC-F-19] deve retornar UNAUTHORIZED com token inválido', async () => {
      repo.findByEmailVerifyToken.mockResolvedValue(null);

      const result = await service.verifyEmail('token-invalido');

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('UNAUTHORIZED');
      }
    });
  });

  // =========================================================================
  // requestPasswordReset()
  // =========================================================================

  describe('requestPasswordReset()', () => {
    it('[TC-F-20] deve gerar token e enviar e-mail de reset para e-mail conhecido', async () => {
      repo.findByEmail.mockResolvedValue(makeProfessional());
      repo.update.mockResolvedValue(makeProfessional());
      tokens.generateOpaqueToken.mockReturnValue('reset-token-abc');

      const result = await service.requestPasswordReset('dr@example.com');

      expect(result.ok).toBe(true);
      expect(repo.update).toHaveBeenCalledWith(
        'prof-1',
        expect.objectContaining({
          resetPasswordToken: 'reset-token-abc',
          resetPasswordExpiresAt: new Date(FIXED_NOW.getTime() + RESET_TOKEN_TTL_MS),
        }),
      );
      expect(notifications.sendPasswordResetEmail).toHaveBeenCalledWith('dr@example.com', 'reset-token-abc');
    });

    it('[TC-F-21] deve retornar ok para e-mail desconhecido (sem revelar inexistência)', async () => {
      repo.findByEmail.mockResolvedValue(null);

      const result = await service.requestPasswordReset('nao@existe.com');

      expect(result.ok).toBe(true);
      expect(notifications.sendPasswordResetEmail).not.toHaveBeenCalled();
    });
  });

  // =========================================================================
  // resetPassword()
  // =========================================================================

  describe('resetPassword()', () => {
    it('[TC-F-22] deve atualizar hash e limpar token com token válido e senha válida', async () => {
      const validExpiry = new Date(FIXED_NOW.getTime() + 30 * 60 * 1000);
      repo.findByResetPasswordToken.mockResolvedValue(
        makeProfessional({ resetPasswordToken: 'reset-token', resetPasswordExpiresAt: validExpiry }),
      );
      hashing.hash.mockResolvedValue('new-bcrypt-hash');
      repo.update.mockResolvedValue(makeProfessional());

      const result = await service.resetPassword('reset-token', 'novaSenha1');

      expect(result.ok).toBe(true);
      expect(repo.update).toHaveBeenCalledWith(
        'prof-1',
        expect.objectContaining({
          passwordHash: 'new-bcrypt-hash',
          resetPasswordToken: null,
          resetPasswordExpiresAt: null,
        }),
      );
    });

    it('[TC-F-23] deve retornar UNAUTHORIZED para token de reset inválido', async () => {
      repo.findByResetPasswordToken.mockResolvedValue(null);

      const result = await service.resetPassword('token-invalido', 'novaSenha1');

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('UNAUTHORIZED');
      }
    });

    it('[TC-F-24] deve retornar UNAUTHORIZED para token de reset expirado', async () => {
      const expiredAt = new Date(FIXED_NOW.getTime() - 1000);
      repo.findByResetPasswordToken.mockResolvedValue(
        makeProfessional({ resetPasswordToken: 'expired-token', resetPasswordExpiresAt: expiredAt }),
      );

      const result = await service.resetPassword('expired-token', 'novaSenha1');

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('UNAUTHORIZED');
      }
    });

    it('[TC-F-25] deve retornar VALIDATION_ERROR para nova senha inválida', async () => {
      const validExpiry = new Date(FIXED_NOW.getTime() + 30 * 60 * 1000);
      repo.findByResetPasswordToken.mockResolvedValue(
        makeProfessional({ resetPasswordToken: 'reset-token', resetPasswordExpiresAt: validExpiry }),
      );

      const result = await service.resetPassword('reset-token', 'fraca');

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('VALIDATION_ERROR');
      }
    });
  });

  // =========================================================================
  // refresh()
  // =========================================================================

  describe('refresh()', () => {
    it('[TC-F-26] deve retornar novos tokens com refresh token válido', async () => {
      refreshStore.find.mockResolvedValue('prof-1');
      tokens.generateAccessToken.mockReturnValue('new-access-token');
      tokens.generateRefreshToken.mockReturnValue('new-refresh-token');

      const result = await service.refresh('old-refresh-token');

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.accessToken).toBe('new-access-token');
        expect(result.value.refreshToken).toBe('new-refresh-token');
      }
    });

    it('[TC-F-27] deve invalidar o refresh token antigo ao renovar (rotação)', async () => {
      refreshStore.find.mockResolvedValue('prof-1');

      await service.refresh('old-refresh-token');

      expect(refreshStore.delete).toHaveBeenCalledWith('old-refresh-token');
    });

    it('[TC-F-28] deve retornar UNAUTHORIZED com refresh token inválido', async () => {
      refreshStore.find.mockResolvedValue(null);

      const result = await service.refresh('token-invalido');

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('UNAUTHORIZED');
      }
    });
  });

  // =========================================================================
  // logout()
  // =========================================================================

  describe('logout()', () => {
    it('[TC-F-29] deve deletar refresh token do store no logout', async () => {
      refreshStore.find.mockResolvedValue('prof-1');

      const result = await service.logout('refresh-token');

      expect(result.ok).toBe(true);
      expect(refreshStore.delete).toHaveBeenCalledWith('refresh-token');
    });

    it('[TC-F-30] deve retornar UNAUTHORIZED ao fazer logout com token inválido', async () => {
      refreshStore.find.mockResolvedValue(null);

      const result = await service.logout('token-invalido');

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('UNAUTHORIZED');
      }
    });
  });
});
