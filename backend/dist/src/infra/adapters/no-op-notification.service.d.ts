import type { IAuthNotificationService } from '../../auth/ports/auth-notification.service.port';
export declare class NoOpNotificationService implements IAuthNotificationService {
    private readonly logger;
    sendVerificationEmail(email: string, token: string): Promise<void>;
    sendPasswordResetEmail(email: string, token: string): Promise<void>;
    sendAccountLockedEmail(email: string): Promise<void>;
}
