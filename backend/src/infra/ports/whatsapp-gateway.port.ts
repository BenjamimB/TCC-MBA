import type { Result } from '../../shared/result';

export interface WhatsAppInboundPayload {
  from: string;
  messageId: string;
  text?: string;
  timestamp: number;
}

export interface IWhatsAppGateway {
  sendTextMessage(to: string, text: string): Promise<Result<{ messageId: string }>>;
  sendTemplate(
    to: string,
    templateName: string,
    params: Record<string, string>,
  ): Promise<Result<{ messageId: string }>>;
  validateWebhookSignature(rawBody: string, xHubSignature: string): boolean;
  parseWebhookPayload(body: unknown): Result<WhatsAppInboundPayload>;
}

export const WHATSAPP_GATEWAY = Symbol('IWhatsAppGateway');
