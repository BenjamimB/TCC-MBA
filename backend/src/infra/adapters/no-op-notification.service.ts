import { Injectable, Logger } from '@nestjs/common';
import type { IAuthNotificationService } from '../../auth/ports/auth-notification.service.port';

/** Stub para ambiente local — substitua por Resend em produção */
@Injectable()
export class NoOpNotificationService implements IAuthNotificationService {
  private readonly logger = new Logger(NoOpNotificationService.name);

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    this.logger.log(`[EMAIL] Verificação → ${email} | token: ${token}`);
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    this.logger.log(`[EMAIL] Reset de senha → ${email} | token: ${token}`);
  }

  async sendAccountLockedEmail(email: string): Promise<void> {
    this.logger.log(`[EMAIL] Conta bloqueada → ${email}`);
  }
}
