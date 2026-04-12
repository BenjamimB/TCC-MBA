export interface IAuthNotificationService {
    sendVerificationEmail(email: string, token: string): Promise<void>;
    sendPasswordResetEmail(email: string, token: string): Promise<void>;
    sendAccountLockedEmail(email: string): Promise<void>;
}
