import type { ITokenService } from '../../auth/ports/token.service.port';
export declare class JwtTokenService implements ITokenService {
    private readonly secret;
    private readonly accessExpiresIn;
    generateAccessToken(professionalId: string): string;
    generateRefreshToken(): string;
    generateOpaqueToken(): string;
}
