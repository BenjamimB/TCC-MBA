import type { BaseLanguageModel } from '@langchain/core/language_models/base';
import { HumanMessage, SystemMessage, AIMessage as LCAIMessage } from '@langchain/core/messages';
import type { Result } from '../../shared/result';
import { ok, err } from '../../shared/result';
import type { AIProvider, AIMessage, AITool, AIResponse, IAIGateway } from '../ports/ai-gateway.port';

// ---------------------------------------------------------------------------
// Circuit breaker state (per-provider)
// ---------------------------------------------------------------------------

interface CircuitState {
  failures: number;
  openSince: number | null; // epoch ms
}

const CIRCUIT_FAILURE_THRESHOLD = 5;
const CIRCUIT_COOLDOWN_MS = 30_000;

// ---------------------------------------------------------------------------
// Model factory type — injected for testability
// ---------------------------------------------------------------------------

export type ModelFactory = (provider: AIProvider) => BaseLanguageModel;

// ---------------------------------------------------------------------------
// LangChainAIGateway
// ---------------------------------------------------------------------------

export class LangChainAIGateway implements IAIGateway {
  private readonly circuits = new Map<AIProvider, CircuitState>();

  constructor(
    private readonly modelFactory: ModelFactory,
    private readonly clock: () => number = () => Date.now(),
  ) {}

  private getCircuit(provider: AIProvider): CircuitState {
    if (!this.circuits.has(provider)) {
      this.circuits.set(provider, { failures: 0, openSince: null });
    }
    return this.circuits.get(provider)!;
  }

  private isOpen(provider: AIProvider): boolean {
    const c = this.getCircuit(provider);
    if (c.openSince === null) return false;
    if (this.clock() - c.openSince >= CIRCUIT_COOLDOWN_MS) {
      // reset after cooldown
      c.failures = 0;
      c.openSince = null;
      return false;
    }
    return true;
  }

  private recordSuccess(provider: AIProvider): void {
    const c = this.getCircuit(provider);
    c.failures = 0;
    c.openSince = null;
  }

  private recordFailure(provider: AIProvider): void {
    const c = this.getCircuit(provider);
    c.failures += 1;
    if (c.failures >= CIRCUIT_FAILURE_THRESHOLD) {
      c.openSince = this.clock();
    }
  }

  async complete(
    provider: AIProvider,
    messages: AIMessage[],
    tools?: AITool[],
  ): Promise<Result<AIResponse>> {
    if (this.isOpen(provider)) {
      return err({ code: 'AI_CIRCUIT_OPEN', provider });
    }

    const lcMessages = messages.map((m) => {
      if (m.role === 'system') return new SystemMessage(m.content);
      if (m.role === 'assistant') return new LCAIMessage(m.content);
      return new HumanMessage(m.content);
    });

    const model = this.modelFactory(provider);

    try {
      let chainModel: BaseLanguageModel = model;

      // Bind tools if provided and model supports it
      if (tools && tools.length > 0 && 'bindTools' in model && typeof (model as any).bindTools === 'function') {
        const lcTools = tools.map((t) => ({
          type: 'function' as const,
          function: {
            name: t.name,
            description: t.description,
            parameters: t.inputSchema,
          },
        }));
        chainModel = (model as any).bindTools(lcTools);
      }

      const response = await (chainModel as any).invoke(lcMessages);

      this.recordSuccess(provider);

      // Extract content and tool calls from response
      const content: string =
        typeof response.content === 'string'
          ? response.content
          : Array.isArray(response.content)
            ? response.content
                .filter((c: any) => c.type === 'text')
                .map((c: any) => c.text)
                .join('')
            : '';

      const toolCalls =
        response.tool_calls && Array.isArray(response.tool_calls) && response.tool_calls.length > 0
          ? response.tool_calls.map((tc: any) => ({
              name: tc.name,
              input: tc.args ?? tc.input ?? {},
            }))
          : undefined;

      return ok({ content, toolCalls });
    } catch (e) {
      this.recordFailure(provider);
      return err({ code: 'AI_PROVIDER_ERROR', provider, message: String(e) });
    }
  }
}
