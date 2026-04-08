/**
 * Task 6.1 — LangChainAIGateway unit tests
 *
 * Cobre: roteamento de provider, fallback, circuit breaker e tool calling.
 * Requirements: 4.1, 4.5
 */
import { LangChainAIGateway } from './langchain-ai-gateway';
import type { ModelFactory } from './langchain-ai-gateway';
import type { AIProvider, AIMessage } from '../ports/ai-gateway.port';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeModel(response: object | Error) {
  return {
    invoke: jest.fn().mockImplementation(() => {
      if (response instanceof Error) return Promise.reject(response);
      return Promise.resolve(response);
    }),
    bindTools: jest.fn().mockReturnThis(),
  };
}

const MESSAGES: AIMessage[] = [
  { role: 'system', content: 'You are helpful.' },
  { role: 'user', content: 'Hello' },
];

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('LangChainAIGateway', () => {
  // =========================================================================
  // Provider routing + basic completion
  // =========================================================================

  describe('complete() — provider routing', () => {
    it('[TC-F-01] deve retornar conteúdo via model factory para maritaca-small', async () => {
      const model = makeModel({ content: 'resposta maritaca' });
      const factory: ModelFactory = jest.fn().mockReturnValue(model);
      const gateway = new LangChainAIGateway(factory);

      const result = await gateway.complete('maritaca-small', MESSAGES);

      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value.content).toBe('resposta maritaca');
      expect(factory).toHaveBeenCalledWith('maritaca-small');
    });

    it('[TC-F-02] deve retornar conteúdo via model factory para claude-haiku', async () => {
      const model = makeModel({ content: 'resposta claude' });
      const factory: ModelFactory = jest.fn().mockReturnValue(model);
      const gateway = new LangChainAIGateway(factory);

      const result = await gateway.complete('claude-haiku', MESSAGES);

      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value.content).toBe('resposta claude');
      expect(factory).toHaveBeenCalledWith('claude-haiku');
    });
  });

  // =========================================================================
  // Fallback
  // =========================================================================

  describe('complete() — fallback', () => {
    it('[TC-F-03] deve retornar AI_PROVIDER_ERROR quando model lança exceção', async () => {
      const model = makeModel(new Error('API timeout'));
      const factory: ModelFactory = jest.fn().mockReturnValue(model);
      const gateway = new LangChainAIGateway(factory);

      const result = await gateway.complete('maritaca', MESSAGES);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('AI_PROVIDER_ERROR');
        expect((result.error as any).provider).toBe('maritaca');
      }
    });
  });

  // =========================================================================
  // Circuit breaker
  // =========================================================================

  describe('complete() — circuit breaker', () => {
    it('[TC-F-04] deve retornar AI_CIRCUIT_OPEN após 5 falhas consecutivas', async () => {
      const model = makeModel(new Error('fail'));
      const factory: ModelFactory = jest.fn().mockReturnValue(model);
      const gateway = new LangChainAIGateway(factory);

      // 5 failures to open the circuit
      for (let i = 0; i < 5; i++) {
        await gateway.complete('maritaca-small', MESSAGES);
      }

      const result = await gateway.complete('maritaca-small', MESSAGES);

      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.error.code).toBe('AI_CIRCUIT_OPEN');
      // model was called exactly 5 times (not 6)
      expect(model.invoke).toHaveBeenCalledTimes(5);
    });

    it('[TC-F-05] deve resetar circuit breaker após período de cooldown (30s)', async () => {
      let now = 0;
      const clock = () => now;

      const model = makeModel(new Error('fail'));
      const successModel = makeModel({ content: 'ok' });
      let callCount = 0;
      const factory: ModelFactory = jest.fn().mockImplementation(() => {
        callCount++;
        return callCount <= 5 ? model : successModel;
      });

      const gateway = new LangChainAIGateway(factory, clock);

      // Open the circuit with 5 failures
      for (let i = 0; i < 5; i++) {
        await gateway.complete('maritaca-small', MESSAGES);
      }

      // Verify circuit is open
      const openResult = await gateway.complete('maritaca-small', MESSAGES);
      expect(openResult.ok).toBe(false);
      if (!openResult.ok) expect(openResult.error.code).toBe('AI_CIRCUIT_OPEN');

      // Advance clock past cooldown
      now = 31_000;

      const result = await gateway.complete('maritaca-small', MESSAGES);
      expect(result.ok).toBe(true);
    });
  });

  // =========================================================================
  // Tool calling
  // =========================================================================

  describe('complete() — tools', () => {
    it('[TC-F-06] deve passar tools ao model quando fornecidas', async () => {
      const model = makeModel({ content: '', tool_calls: [] });
      const factory: ModelFactory = jest.fn().mockReturnValue(model);
      const gateway = new LangChainAIGateway(factory);

      const tools = [{
        name: 'listSlots',
        description: 'List available slots',
        inputSchema: { type: 'object', properties: { date: { type: 'string' } } },
      }];

      await gateway.complete('maritaca', MESSAGES, tools);

      expect(model.bindTools).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ type: 'function', function: expect.objectContaining({ name: 'listSlots' }) }),
        ]),
      );
    });

    it('[TC-F-07] deve retornar toolCalls quando provider responde com tool_call', async () => {
      const model = makeModel({
        content: '',
        tool_calls: [{ name: 'listSlots', args: { date: '2025-06-12' } }],
      });
      const factory: ModelFactory = jest.fn().mockReturnValue(model);
      const gateway = new LangChainAIGateway(factory);

      const tools = [{
        name: 'listSlots',
        description: 'List available slots',
        inputSchema: { type: 'object' },
      }];

      const result = await gateway.complete('maritaca', MESSAGES, tools);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.toolCalls).toHaveLength(1);
        expect(result.value.toolCalls![0].name).toBe('listSlots');
        expect(result.value.toolCalls![0].input).toEqual({ date: '2025-06-12' });
      }
    });
  });

  // =========================================================================
  // Array content handling
  // =========================================================================

  describe('complete() — content parsing', () => {
    it('deve concatenar content do tipo array (blocks)', async () => {
      const model = makeModel({
        content: [
          { type: 'text', text: 'Olá, ' },
          { type: 'text', text: 'mundo!' },
        ],
      });
      const factory: ModelFactory = jest.fn().mockReturnValue(model);
      const gateway = new LangChainAIGateway(factory);

      const result = await gateway.complete('claude-sonnet', MESSAGES);

      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value.content).toBe('Olá, mundo!');
    });

    it('deve retornar string vazia quando content não é string nem array', async () => {
      const model = makeModel({ content: null });
      const factory: ModelFactory = jest.fn().mockReturnValue(model);
      const gateway = new LangChainAIGateway(factory);

      const result = await gateway.complete('claude-haiku', MESSAGES);

      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value.content).toBe('');
    });

    it('deve processar mensagem com role assistant', async () => {
      const model = makeModel({ content: 'resposta' });
      const factory: ModelFactory = jest.fn().mockReturnValue(model);
      const gateway = new LangChainAIGateway(factory);

      const msgs: AIMessage[] = [
        { role: 'user', content: 'Olá' },
        { role: 'assistant', content: 'Tudo bem?' },
        { role: 'user', content: 'Sim' },
      ];

      const result = await gateway.complete('maritaca', msgs);
      expect(result.ok).toBe(true);
    });

    it('deve retornar toolCalls usando input quando args não existe', async () => {
      const model = makeModel({
        content: '',
        tool_calls: [{ name: 'listSlots', input: { date: '2025-06-12' } }],
      });
      const factory: ModelFactory = jest.fn().mockReturnValue(model);
      const gateway = new LangChainAIGateway(factory);

      const tools = [{ name: 'listSlots', description: 'List slots', inputSchema: { type: 'object' } }];
      const result = await gateway.complete('maritaca', MESSAGES, tools);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.toolCalls![0].input).toEqual({ date: '2025-06-12' });
      }
    });

    it('deve retornar toolCalls com objeto vazio quando args e input são undefined', async () => {
      const model = makeModel({
        content: '',
        tool_calls: [{ name: 'ping' }], // sem args nem input
      });
      const factory: ModelFactory = jest.fn().mockReturnValue(model);
      const gateway = new LangChainAIGateway(factory);

      const tools = [{ name: 'ping', description: 'ping', inputSchema: { type: 'object' } }];
      const result = await gateway.complete('maritaca', MESSAGES, tools);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.toolCalls![0].input).toEqual({});
      }
    });
  });
});
