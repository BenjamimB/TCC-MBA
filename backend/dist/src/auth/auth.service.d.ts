import type { Result } from '../shared/result';
import type { AuthTokens } from './auth.types';
import type { IProfessionalRepository } from './ports/professional.repository.port';
import type { IHashingService } from './ports/hashing.service.port';
import type { ITokenService } from './ports/token.service.port';
import type { IRefreshTokenStore } from './ports/refresh-token.store.port';
import type { IAuthNotificationService } from './ports/auth-notification.service.port';
export declare class AuthService {
    private readonly professionalRepo;
    private readonly hashing;
    private readonly tokenService;
    private readonly refreshStore;
    private readonly notifications;
    private readonly clock;
    constructor(professionalRepo: IProfessionalRepository, hashing: IHashingService, tokenService: ITokenService, refreshStore: IRefreshTokenStore, notifications: IAuthNotificationService, clock?: () => Date);
    register(email: string, password: string, name: string): Promise<Result<void>>;
    login(email: string, password: string): Promise<Result<AuthTokens>>;
    verifyEmail(token: string): Promise<Result<void>>;
    requestPasswordReset(email: string): Promise<Result<void>>;
    resetPassword(token: string, newPassword: string): Promise<Result<void>>;
    refresh(refreshToken: string): Promise<Result<AuthTokens>>;
    logout(refreshToken: string): Promise<Result<void>>;
}
