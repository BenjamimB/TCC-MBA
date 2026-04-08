/**
 * Task 6.2 — MetaWhatsAppGateway unit tests
 *
 * Cobre: validação de assinatura HMAC-SHA256, parsing de payload Meta,
 * envio de mensagem de texto e template.
 * Requirements: 4.1, 4.4
 */
import * as crypto from 'crypto';
import { MetaWhatsAppGateway } from './meta-whatsapp-gateway';
import type { HttpClient } from './meta-whatsapp-gateway';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const PHONE_ID = 'phone-id-123';
const ACCESS_TOKEN = 'token-abc';
const APP_SECRET = 'test-secret';

function makeGateway(http: HttpClient): MetaWhatsAppGateway {
  return new MetaWhatsAppGateway(PHONE_ID, ACCESS_TOKEN, APP_SECRET, http);
}

function makeHttpClient(ok: boolean, json: object): HttpClient {
  return {
    post: jest.fn().mockResolvedValue({
      ok,
      json: jest.fn().mockResolvedValue(json),
    }),
  };
}

function sign(body: string): string {
  return 'sha256=' + crypto.createHmac('sha256', APP_SECRET).update(body, 'utf8').digest('hex');
}

function makeTextPayload(from: string, text: string, messageId = 'msg-1') {
  return {
    entry: [{
      changes: [{
        value: {
          messages: [{
            from,
            id: messageId,
            timestamp: '1700000000',
            type: 'text',
            text: { body: text },
          }],
        },
      }],
    }],
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('MetaWhatsAppGateway', () => {
  // =========================================================================
  // validateWebhookSignature()
  // =========================================================================

  describe('validateWebhookSignature()', () => {
    it('[TC-F-01] deve retornar true para HMAC-SHA256 válido', () => {
      const gateway = makeGateway(makeHttpClient(true, {}));
      const rawBody = '{"hello":"world"}';
      const sig = sign(rawBody);

      expect(gateway.validateWebhookSignature(rawBody, sig)).toBe(true);
    });

    it('[TC-F-02] deve retornar false para HMAC inválido', () => {
      const gateway = makeGateway(makeHttpClient(true, {}));

      expect(gateway.validateWebhookSignature('body', 'sha256=invalidsig')).toBe(false);
    });

    it('[TC-F-03] deve retornar false quando header não tem prefixo sha256=', () => {
      const gateway = makeGateway(makeHttpClient(true, {}));

      expect(gateway.validateWebhookSignature('body', 'malformed-header')).toBe(false);
    });
  });

  // =========================================================================
  // parseWebhookPayload()
  // =========================================================================

  describe('parseWebhookPayload()', () => {
    it('[TC-F-04] deve extrair from, messageId e text de payload de texto válido', () => {
      const gateway = makeGateway(makeHttpClient(true, {}));
      const payload = makeTextPayload('+5511999990001', 'Olá, quero agendar');

      const result = gateway.parseWebhookPayload(payload);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.from).toBe('+5511999990001');
        expect(result.value.messageId).toBe('msg-1');
        expect(result.value.text).toBe('Olá, quero agendar');
        expect(result.value.timestamp).toBe(1700000000);
      }
    });

    it('[TC-F-05] deve retornar UNSUPPORTED_PAYLOAD para status update sem messages', () => {
      const gateway = makeGateway(makeHttpClient(true, {}));
      const statusPayload = {
        entry: [{ changes: [{ value: { statuses: [{ id: 'msg-1', status: 'delivered' }] } }] }],
      };

      const result = gateway.parseWebhookPayload(statusPayload);

      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.error.code).toBe('UNSUPPORTED_PAYLOAD');
    });

    it('[TC-F-06] deve retornar INVALID_PAYLOAD para estrutura desconhecida', () => {
      const gateway = makeGateway(makeHttpClient(true, {}));

      const result = gateway.parseWebhookPayload({ unknown: true });

      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.error.code).toBe('UNSUPPORTED_PAYLOAD');
    });

    it('deve retornar INVALID_PAYLOAD quando mensagem não tem campo from ou id', () => {
      const gateway = makeGateway(makeHttpClient(true, {}));
      const payload = {
        entry: [{
          changes: [{
            value: {
              messages: [{ timestamp: '1700000000', type: 'text', text: { body: 'Oi' } }],
            },
          }],
        }],
      };

      const result = gateway.parseWebhookPayload(payload);

      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.error.code).toBe('INVALID_PAYLOAD');
    });

    it('deve retornar INVALID_PAYLOAD quando payload lança exceção ao acessar propriedades', () => {
      const gateway = makeGateway(makeHttpClient(true, {}));

      // Passing null causes property access to throw
      const result = gateway.parseWebhookPayload(null);

      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.error.code).toBe('UNSUPPORTED_PAYLOAD');
    });
  });

  // =========================================================================
  // sendTextMessage()
  // =========================================================================

  describe('sendTextMessage()', () => {
    it('[TC-F-07] deve retornar messageId em chamada bem-sucedida', async () => {
      const http = makeHttpClient(true, { messages: [{ id: 'wamid-1' }] });
      const gateway = makeGateway(http);

      const result = await gateway.sendTextMessage('+5511999990001', 'Olá!');

      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value.messageId).toBe('wamid-1');
    });

    it('[TC-F-08] deve retornar WHATSAPP_SEND_ERROR quando API falha', async () => {
      const http = makeHttpClient(false, { error: { message: 'Invalid recipient' } });
      const gateway = makeGateway(http);

      const result = await gateway.sendTextMessage('+5511000000000', 'Olá');

      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.error.code).toBe('WHATSAPP_SEND_ERROR');
    });
  });

  // =========================================================================
  // sendTemplate()
  // =========================================================================

  describe('sendTemplate()', () => {
    it('[TC-F-09] deve retornar messageId em envio de template bem-sucedido', async () => {
      const http = makeHttpClient(true, { messages: [{ id: 'wamid-tmpl-1' }] });
      const gateway = makeGateway(http);

      const result = await gateway.sendTemplate('+5511999990001', 'reminder_24h', {
        patient_name: 'João',
        date: '12/06',
        time: '14:00',
      });

      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value.messageId).toBe('wamid-tmpl-1');
    });

    it('deve enviar template sem parâmetros com components vazio', async () => {
      const http = makeHttpClient(true, { messages: [{ id: 'wamid-tmpl-2' }] });
      const gateway = makeGateway(http);

      const result = await gateway.sendTemplate('+5511999990001', 'simple_template', {});

      expect(result.ok).toBe(true);
      // Verify no components were added
      const callBody = (http.post as jest.Mock).mock.calls[0][1] as any;
      expect(callBody.template.components).toHaveLength(0);
    });
  });

  // =========================================================================
  // HTTP error handling
  // =========================================================================

  describe('sendTextMessage() — network error', () => {
    it('deve retornar WHATSAPP_SEND_ERROR quando http.post lança exceção', async () => {
      const http: HttpClient = {
        post: jest.fn().mockRejectedValue(new Error('Network failure')),
      };
      const gateway = makeGateway(http);

      const result = await gateway.sendTextMessage('+5511999990001', 'Olá');

      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.error.code).toBe('WHATSAPP_SEND_ERROR');
    });
  });
});
