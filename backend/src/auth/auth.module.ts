import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaProfessionalRepository } from '../infra/adapters/prisma-professional.repository';
import { BcryptHashingService } from '../infra/adapters/bcrypt-hashing.service';
import { JwtTokenService } from '../infra/adapters/jwt-token.service';
import { RedisRefreshTokenStore } from '../infra/adapters/redis-refresh-token.store';
import { NoOpNotificationService } from '../infra/adapters/no-op-notification.service';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: AuthService,
      useFactory: (
        repo: PrismaProfessionalRepository,
        hashing: BcryptHashingService,
        tokens: JwtTokenService,
        refreshStore: RedisRefreshTokenStore,
        notifications: NoOpNotificationService,
      ) => new AuthService(repo, hashing, tokens, refreshStore, notifications),
      inject: [
        PrismaProfessionalRepository,
        BcryptHashingService,
        JwtTokenService,
        RedisRefreshTokenStore,
        NoOpNotificationService,
      ],
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
