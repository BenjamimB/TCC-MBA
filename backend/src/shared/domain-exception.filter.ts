import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import type { Response } from 'express';

/**
 * Transforma erros de domínio lançados pelos controllers no formato HTTP correto.
 * Os controllers lançam: Object.assign(new Error(code), { status: 4xx, error: { ... } })
 */
@Catch()
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json(exception.getResponse());
      return;
    }

    if (exception instanceof Error && 'status' in exception) {
      const status = (exception as { status: number }).status;
      const error = (exception as { error?: Record<string, unknown> }).error;
      response.status(status).json({
        message: exception.message,
        ...(error ?? {}),
      });
      return;
    }

    response.status(500).json({ message: 'Internal server error' });
  }
}
