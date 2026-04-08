/**
 * Task 6.3 — AITriageService unit tests
 *
 * Cobre: detecção de intenção, threshold de confiança, geração de resposta
 * e tool calling. Requirements: 4.1, 4.2, 4.3, 4.5
 */
import { AITriageService } from './ai-triage.service';
import type { IAIGateway } from '../infra/ports/ai-gateway.port';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeGateway(response: object | { ok: false; error: object }): jest.Mocked<IAIGateway> {
  return {
    complete: jest.fn().mockResolvedValue(response),
  };
}

const PATIENT_MSG = 'Quero agendar uma consulta para semana que vem';
const CONTEXT = { patientName: 'João', professionalName: 'Dra. Ana', clinicAddress: 'Rua A, 1' };

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('AITriageService', () => {
  // =========================================================================
  // detectIntent()
  // =========================================================================

  describe('detectIntent()', () => {
    it('[TC-F-01] deve retornar intent e confidence quando JSON é válido e confidence ≥ 0.7', async () => {
      const gateway = makeGateway({
        ok: true,
        value: { content: '{"intent":"booking","confidence":0.92}' },
      });
      const service = new AITriageService(gateway);

      const result = await service.detectIntent(PATIENT_MSG);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.intent).toBe('booking');
        expect(result.value.confidence).toBe(0.92);
      }
    });

    it('[TC-F-02] deve retornar intent=unclear quando confidence < 0.7', async () => {
      const gateway = makeGateway({
        ok: true,
        value: { content: '{"intent":"general_info","confidence":0.55}' },
      });
      const service = new AITriageService(gateway);

      const result = await service.detectIntent(PATIENT_MSG);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.intent).toBe('unclear');
        expect(result.value.confidence).toBe(0.55);
      }
    });

    it('[TC-F-03] deve retornar AI_UNAVAILABLE quando gateway falha', async () => {
      const gateway = makeGateway({
        ok: false,
        error: { code: 'AI_CIRCUIT_OPEN', provider: 'maritaca-small' },
      });
      const service = new AITriageService(gateway);

      const result = await service.detectIntent(PATIENT_MSG);

      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.error.code).toBe('AI_UNAVAILABLE');
    });

    it('[TC-F-04] deve retornar intent=unclear quando resposta não é JSON parseável', async () => {
      const gateway = makeGateway({
        ok: true,
        value: { content: 'Não entendi o que o paciente quis dizer.' },
      });
      const service = new AITriageService(gateway);

      const result = await service.detectIntent(PATIENT_MSG);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.intent).toBe('unclear');
        expect(result.value.confidence).toBe(0);
      }
    });

    it('deve incluir mensagens recentes do contexto ao detectar intenção', async () => {
      const gateway = makeGateway({
        ok: true,
        value: { content: '{"intent":"booking","confidence":0.9}' },
      });
      const service = new AITriageService(gateway);

      await service.detectIntent(PATIENT_MSG, {
        recentMessages: [
          { role: 'user', content: 'Oi' },
          { role: 'assistant', content: 'Olá! Como posso ajudar?' },
        ],
      });

      const callMessages = (gateway.complete as jest.Mock).mock.calls[0][1];
      expect(callMessages.length).toBeGreaterThan(2); // system + recent + new user msg
    });

    it('deve extrair JSON de resposta com markdown code block', async () => {
      const gateway = makeGateway({
        ok: true,
        value: { content: '```json\n{"intent":"cancellation","confidence":0.85}\n```' },
      });
      const service = new AITriageService(gateway);

      const result = await service.detectIntent(PATIENT_MSG);

      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value.intent).toBe('cancellation');
    });

    it('deve retornar intent=unclear para JSON com intent inválido', async () => {
      const gateway = makeGateway({
        ok: true,
        value: { content: '{"intent":"unknown_intent","confidence":0.9}' },
      });
      const service = new AITriageService(gateway);

      const result = await service.detectIntent(PATIENT_MSG);

      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value.intent).toBe('unclear');
    });
  });

  // =========================================================================
  // generateResponse()
  // =========================================================================

  describe('generateResponse()', () => {
    it('[TC-F-05] deve retornar texto de resposta da IA', async () => {
      const gateway = makeGateway({
        ok: true,
        value: { content: 'Olá João! Claro, vou verificar os horários disponíveis.' },
      });
      const service = new AITriageService(gateway);

      const result = await service.generateResponse(PATIENT_MSG, CONTEXT);

      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value).toContain('João');
    });

    it('[TC-F-06] deve retornar AI_UNAVAILABLE quando gateway falha', async () => {
      const gateway = makeGateway({
        ok: false,
        error: { code: 'AI_PROVIDER_ERROR', provider: 'maritaca' },
      });
      const service = new AITriageService(gateway);

      const result = await service.generateResponse(PATIENT_MSG, CONTEXT);

      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.error.code).toBe('AI_UNAVAILABLE');
    });
  });

  // =========================================================================
  // executeWithTools()
  // =========================================================================

  describe('executeWithTools()', () => {
    const tools = [
      {
        name: 'listSlots',
        description: 'Lista horários disponíveis',
        inputSchema: { type: 'object', properties: { date: { type: 'string' } } },
      },
    ];

    it('[TC-F-07] deve retornar toolCalls quando provider responde com tool_call', async () => {
      const gateway = makeGateway({
        ok: true,
        value: {
          content: '',
          toolCalls: [{ name: 'listSlots', input: { date: '2025-06-12' } }],
        },
      });
      const service = new AITriageService(gateway);

      const result = await service.executeWithTools(PATIENT_MSG, CONTEXT, tools);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.toolCalls).toHaveLength(1);
        expect(result.value.toolCalls![0].name).toBe('listSlots');
      }
    });

    it('[TC-F-08] deve retornar content quando provider responde sem tool_call', async () => {
      const gateway = makeGateway({
        ok: true,
        value: { content: 'Os próximos horários disponíveis são...' },
      });
      const service = new AITriageService(gateway);

      const result = await service.executeWithTools(PATIENT_MSG, CONTEXT, tools);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.content).toContain('horários');
        expect(result.value.toolCalls).toBeUndefined();
      }
    });

    it('deve retornar AI_UNAVAILABLE quando gateway falha em executeWithTools', async () => {
      const gateway = makeGateway({
        ok: false,
        error: { code: 'AI_CIRCUIT_OPEN', provider: 'maritaca' },
      });
      const service = new AITriageService(gateway);

      const result = await service.executeWithTools(PATIENT_MSG, CONTEXT, tools);

      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.error.code).toBe('AI_UNAVAILABLE');
    });

    it('deve incluir mensagens recentes no contexto de executeWithTools', async () => {
      const gateway = makeGateway({
        ok: true,
        value: { content: 'Certo, verificando horários.' },
      });
      const service = new AITriageService(gateway);

      await service.executeWithTools(PATIENT_MSG, {
        ...CONTEXT,
        recentMessages: [
          { role: 'user', content: 'Olá' },
          { role: 'assistant', content: 'Como posso ajudar?' },
        ],
      }, tools);

      const callMessages = (gateway.complete as jest.Mock).mock.calls[0][1];
      expect(callMessages.length).toBeGreaterThan(2);
    });
  });

  // =========================================================================
  // generateResponse() com contexto recentMessages
  // =========================================================================

  describe('generateResponse() — with recentMessages', () => {
    it('deve incluir mensagens recentes no contexto de generateResponse', async () => {
      const gateway = makeGateway({
        ok: true,
        value: { content: 'Olá de novo!' },
      });
      const service = new AITriageService(gateway);

      await service.generateResponse(PATIENT_MSG, {
        ...CONTEXT,
        recentMessages: [
          { role: 'user', content: 'Quero ajuda' },
          { role: 'assistant', content: 'Claro!' },
        ],
      });

      const callMessages = (gateway.complete as jest.Mock).mock.calls[0][1];
      expect(callMessages.length).toBeGreaterThan(2);
    });
  });

  // =========================================================================
  // parseIntentJson — catch branch
  // =========================================================================

  describe('detectIntent() — JSON.parse throws', () => {
    it('deve retornar unclear quando JSON.parse lança exceção inesperada', async () => {
      const gateway = makeGateway({
        ok: true,
        // Valid JSON but Array (no intent/confidence fields) — causes null return
        value: { content: '[{"not":"an-intent"}]' },
      });
      const service = new AITriageService(gateway);

      const result = await service.detectIntent(PATIENT_MSG);

      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value.intent).toBe('unclear');
    });

    it('deve retornar unclear quando JSON tem intent válido mas sem campo confidence', async () => {
      const gateway = makeGateway({
        ok: true,
        value: { content: '{"intent":"booking"}' },
      });
      const service = new AITriageService(gateway);

      const result = await service.detectIntent(PATIENT_MSG);

      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value.intent).toBe('unclear');
    });

    it('deve clamp confidence acima de 1.0 para 1.0', async () => {
      const gateway = makeGateway({
        ok: true,
        value: { content: '{"intent":"booking","confidence":1.5}' },
      });
      const service = new AITriageService(gateway);

      const result = await service.detectIntent(PATIENT_MSG);

      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value.confidence).toBe(1);
    });

    it('deve retornar unclear quando regex encontra { } mas JSON é inválido', async () => {
      const gateway = makeGateway({
        ok: true,
        // Has braces but is invalid JSON
        value: { content: '{intent: booking, confidence: 0.9}' },
      });
      const service = new AITriageService(gateway);

      const result = await service.detectIntent(PATIENT_MSG);

      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value.intent).toBe('unclear');
    });
  });
});
