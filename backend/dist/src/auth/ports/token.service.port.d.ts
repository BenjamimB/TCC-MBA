export interface ITokenService {
    generateAccessToken(professionalId: string): string;
    generateRefreshToken(): string;
    generateOpaqueToken(): string;
}
