import * as crypto from 'crypto';
import type { Result } from '../../shared/result';
import { ok, err } from '../../shared/result';
import type { IWhatsAppGateway, WhatsAppInboundPayload } from '../ports/whatsapp-gateway.port';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Minimal fetch-like interface for testability */
export interface HttpClient {
  post(url: string, body: unknown, headers: Record<string, string>): Promise<{ ok: boolean; json(): Promise<unknown> }>;
}

// ---------------------------------------------------------------------------
// MetaWhatsAppGateway
// ---------------------------------------------------------------------------

export class MetaWhatsAppGateway implements IWhatsAppGateway {
  constructor(
    private readonly phoneNumberId: string,
    private readonly accessToken: string,
    private readonly appSecret: string,
    private readonly http: HttpClient,
  ) {}

  validateWebhookSignature(rawBody: string, xHubSignature: string): boolean {
    if (!xHubSignature.startsWith('sha256=')) {
      return false;
    }

    const expected = 'sha256=' + crypto
      .createHmac('sha256', this.appSecret)
      .update(rawBody, 'utf8')
      .digest('hex');

    // Constant-time comparison to prevent timing attacks
    try {
      return crypto.timingSafeEqual(Buffer.from(xHubSignature), Buffer.from(expected));
    } catch {
      return false;
    }
  }

  parseWebhookPayload(body: unknown): Result<WhatsAppInboundPayload> {
    try {
      const b = body as any;
      const entry = b?.entry?.[0];
      const change = entry?.changes?.[0];
      const value = change?.value;
      const messages = value?.messages;

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return err({ code: 'UNSUPPORTED_PAYLOAD' });
      }

      const msg = messages[0];
      if (!msg.from || !msg.id) {
        return err({ code: 'INVALID_PAYLOAD' });
      }

      return ok({
        from: msg.from,
        messageId: msg.id,
        text: msg.text?.body,
        timestamp: Number(msg.timestamp),
      });
    } catch {
      return err({ code: 'INVALID_PAYLOAD' });
    }
  }

  async sendTextMessage(to: string, text: string): Promise<Result<{ messageId: string }>> {
    return this.send(to, { type: 'text', text: { body: text, preview_url: false } });
  }

  async sendTemplate(
    to: string,
    templateName: string,
    params: Record<string, string>,
  ): Promise<Result<{ messageId: string }>> {
    const components =
      Object.keys(params).length > 0
        ? [
            {
              type: 'body',
              parameters: Object.values(params).map((v) => ({ type: 'text', text: v })),
            },
          ]
        : [];

    return this.send(to, {
      type: 'template',
      template: {
        name: templateName,
        language: { code: 'pt_BR' },
        components,
      },
    });
  }

  // ---------------------------------------------------------------------------
  // Private
  // ---------------------------------------------------------------------------

  private async send(to: string, messageBody: unknown): Promise<Result<{ messageId: string }>> {
    const url = `https://graph.facebook.com/v19.0/${this.phoneNumberId}/messages`;

    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      ...messageBody as object,
    };

    try {
      const res = await this.http.post(url, payload, {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      });

      if (!res.ok) {
        const data = await res.json() as any;
        return err({ code: 'WHATSAPP_SEND_ERROR', detail: data?.error?.message ?? 'unknown' });
      }

      const data = await res.json() as any;
      const messageId: string = data?.messages?.[0]?.id ?? '';
      return ok({ messageId });
    } catch (e) {
      return err({ code: 'WHATSAPP_SEND_ERROR', detail: String(e) });
    }
  }
}
