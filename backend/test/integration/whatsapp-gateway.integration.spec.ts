/**
 * Suite IT-WA — WhatsApp Gateway com assinatura HMAC
 * Task: 6.2 | Requirements: segurança de webhook, parsing de payload
 *
 * MetaWhatsAppGateway é instanciado diretamente (não está no DI container).
 * HTTP externo (Meta API) é mockado via HttpClient.
 * Não depende de PostgreSQL nem Redis.
 */
import * as crypto from 'crypto';
import { MetaWhatsAppGateway } from '../../src/infra/adapters/meta-whatsapp-gateway';
import type { HttpClient } from '../../src/infra/adapters/meta-whatsapp-gateway';

const APP_SECRET = 'test-app-secret-12345';
const PHONE_NUMBER_ID = '12345678901';
const ACCESS_TOKEN = 'EAAtest...';

function computeSignature(body: string): string {
  const hmac = crypto.createHmac('sha256', APP_SECRET);
  hmac.update(body, 'utf8');
  return 'sha256=' + hmac.digest('hex');
}

function buildWhatsAppPayload(from: string, messageId: string, text: string) {
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

function makeMockHttp(responseData: unknown = { messages: [{ id: 'wamid.test' }] }): HttpClient {
  return {
    post: jest.fn().mockResolvedValue({
      ok: true,
      json: async () => responseData,
    }),
  };
}

// ---------------------------------------------------------------------------

describe('IT-WA — WhatsApp Gateway (integração)', () => {

  let gateway: MetaWhatsAppGateway;
  let mockHttp: HttpClient;

  beforeEach(() => {
    mockHttp = makeMockHttp();
    gateway = new MetaWhatsAppGateway(PHONE_NUMBER_ID, ACCESS_TOKEN, APP_SECRET, mockHttp);
  });

  // Partição P1 (válida): assinatura HMAC correta
  it('[IT-WA-01] validateWebhookSignature retorna true para assinatura HMAC válida', () => {
    const body = JSON.stringify(buildWhatsAppPayload('5511999990001', 'wamid.1', 'Olá'));
    const sig = computeSignature(body);

    expect(gateway.validateWebhookSignature(body, sig)).toBe(true);
  });

  // Partição P2 (inválida): assinatura errada
  it('[IT-WA-02] validateWebhookSignature retorna false para assinatura inválida', () => {
    const body = JSON.stringify(buildWhatsAppPayload('5511999990001', 'wamid.1', 'Olá'));
    expect(gateway.validateWebhookSignature(body, 'sha256=invalidsignature')).toBe(false);
  });

  // Partição P3 (inválida): header ausente
  it('[IT-WA-03] validateWebhookSignature retorna false sem prefixo sha256=', () => {
    const body = JSON.stringify(buildWhatsAppPayload('5511999990001', 'wamid.1', 'Olá'));
    expect(gateway.validateWebhookSignature(body, 'invalidsignature')).toBe(false);
  });

  // Partição P4 (válida): parsing de payload
  it('[IT-WA-04] parseWebhookPayload extrai from, messageId e text corretamente', () => {
    const payload = buildWhatsAppPayload('5511999990001', 'wamid.msg-01', 'Quero agendar');
    const result = gateway.parseWebhookPayload(payload);

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.value.from).toBe('5511999990001');
    expect(result.value.messageId).toBe('wamid.msg-01');
    expect(result.value.text).toBe('Quero agendar');
  });

  // Partição P5 (inválida): payload sem mensagens
  it('[IT-WA-05] parseWebhookPayload retorna UNSUPPORTED_PAYLOAD para payload sem messages', () => {
    const result = gateway.parseWebhookPayload({ entry: [{ changes: [{ value: {} }] }] });

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.code).toBe('UNSUPPORTED_PAYLOAD');
  });

  // Partição P6 (válida): envio de mensagem de texto
  it('[IT-WA-06] sendTextMessage faz POST para Meta API e retorna messageId', async () => {
    const result = await gateway.sendTextMessage('5511999990001', 'Sua consulta foi confirmada.');

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.value.messageId).toBe('wamid.test');
    expect(mockHttp.post).toHaveBeenCalledTimes(1);

    const [url, body, headers] = (mockHttp.post as jest.Mock).mock.calls[0];
    expect(url).toContain(PHONE_NUMBER_ID);
    expect(headers['Authorization']).toBe(`Bearer ${ACCESS_TOKEN}`);
    expect((body as { to: string }).to).toBe('5511999990001');
  });

  // Partição P7: falha de HTTP retorna WHATSAPP_SEND_ERROR
  it('[IT-WA-07] sendTextMessage retorna WHATSAPP_SEND_ERROR quando Meta API falha', async () => {
    mockHttp = {
      post: jest.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ error: { message: 'Invalid parameter' } }),
      }),
    };
    gateway = new MetaWhatsAppGateway(PHONE_NUMBER_ID, ACCESS_TOKEN, APP_SECRET, mockHttp);

    const result = await gateway.sendTextMessage('5511999990001', 'Teste');

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.code).toBe('WHATSAPP_SEND_ERROR');
  });

  // Segurança: timing-safe comparison — body adulterado não passa
  it('[IT-WA-08] body adulterado não passa na validação HMAC (timing-safe)', () => {
    const originalBody = JSON.stringify(buildWhatsAppPayload('5511999990001', 'wamid.1', 'Olá'));
    const sig = computeSignature(originalBody);

    const tamperedBody = JSON.stringify(buildWhatsAppPayload('5511999990001', 'wamid.1', 'Adulterado'));
    expect(gateway.validateWebhookSignature(tamperedBody, sig)).toBe(false);
  });
});
