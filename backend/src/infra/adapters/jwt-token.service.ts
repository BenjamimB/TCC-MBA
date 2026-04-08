import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import type { ITokenService } from '../../auth/ports/token.service.port';

@Injectable()
export class JwtTokenService implements ITokenService {
  private readonly secret = process.env.JWT_SECRET ?? 'local-dev-secret-change-in-production';
  private readonly accessExpiresIn = '15m';

  generateAccessToken(professionalId: string): string {
    return jwt.sign({ sub: professionalId }, this.secret, { expiresIn: this.accessExpiresIn });
  }

  generateRefreshToken(): string {
    return randomBytes(40).toString('hex');
  }

  generateOpaqueToken(): string {
    return randomBytes(32).toString('hex');
  }
}
