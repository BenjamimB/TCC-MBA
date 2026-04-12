export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: 900;
}
export interface ProfessionalRecord {
    id: string;
    email: string;
    name: string;
    passwordHash: string | null;
    emailVerifiedAt: Date | null;
    emailVerifyToken: string | null;
    resetPasswordToken: string | null;
    resetPasswordExpiresAt: Date | null;
    failedLoginAttempts: number;
    lockedUntil: Date | null;
}
