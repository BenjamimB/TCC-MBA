import type { Result } from '../shared/result';
import { ok, err } from '../shared/result';
import type { IAIGateway, AIMessage, AITool } from '../infra/ports/ai-gateway.port';
import type { IntentDetectionResult, ConversationContext } from './ai-triage.types';

const CONFIDENCE_THRESHOLD = 0.7;

const INTENT_DETECTION_SYSTEM_PROMPT = `Você é um assistente de triagem para uma clínica de saúde no Brasil.
Analise a mensagem do paciente e identifique a intenção em JSON com os campos:
{
  "intent": "booking|cancellation|reschedule|price_inquiry|general_info|human_handoff|unclear",
  "confidence": 0.0-1.0
}
Responda APENAS com o JSON, sem texto adicional.`;

const RESPONSE_SYSTEM_PROMPT = `Você é um assistente virtual cordial e profissional de uma clínica de saúde no Brasil.
Responda ao paciente em português brasileiro de forma amigável, clara e concisa.
Não invente informações — use apenas os dados de contexto fornecidos.`;

export class AITriageService {
  constructor(private readonly aiGateway: IAIGateway) {}

  async detectIntent(
    patientMessage: string,
    context?: ConversationContext,
  ): Promise<Result<IntentDetectionResult>> {
    const messages: AIMessage[] = [
      { role: 'system', content: INTENT_DETECTION_SYSTEM_PROMPT },
    ];

    if (context?.recentMessages) {
      for (const m of context.recentMessages.slice(-4)) {
        messages.push({ role: m.role, content: m.content });
      }
    }

    messages.push({ role: 'user', content: patientMessage });

    const result = await this.aiGateway.complete('maritaca-small', messages);

    if (!result.ok) {
      return err({ code: 'AI_UNAVAILABLE', detail: (result.error as any).message });
    }

    const parsed = this.parseIntentJson(result.value.content);
    if (!parsed) {
      return ok({ intent: 'unclear', confidence: 0 });
    }

    if (parsed.confidence < CONFIDENCE_THRESHOLD) {
      return ok({ intent: 'unclear', confidence: parsed.confidence });
    }

    return ok(parsed);
  }

  async generateResponse(
    patientMessage: string,
    context: ConversationContext,
  ): Promise<Result<string>> {
    const contextJson = JSON.stringify({
      patientName: context.patientName,
      professionalName: context.professionalName,
      clinicAddress: context.clinicAddress,
      currentState: context.currentState,
    });

    const messages: AIMessage[] = [
      { role: 'system', content: RESPONSE_SYSTEM_PROMPT + `\n\nContexto: ${contextJson}` },
    ];

    if (context.recentMessages) {
      for (const m of context.recentMessages.slice(-6)) {
        messages.push({ role: m.role, content: m.content });
      }
    }

    messages.push({ role: 'user', content: patientMessage });

    const result = await this.aiGateway.complete('maritaca', messages);

    if (!result.ok) {
      return err({ code: 'AI_UNAVAILABLE', detail: (result.error as any).message });
    }

    return ok(result.value.content);
  }

  async executeWithTools(
    patientMessage: string,
    context: ConversationContext,
    tools: AITool[],
  ): Promise<Result<{ content: string; toolCalls?: Array<{ name: string; input: unknown }> }>> {
    const contextJson = JSON.stringify({
      patientName: context.patientName,
      currentState: context.currentState,
    });

    const messages: AIMessage[] = [
      { role: 'system', content: RESPONSE_SYSTEM_PROMPT + `\n\nContexto: ${contextJson}` },
    ];

    if (context.recentMessages) {
      for (const m of context.recentMessages.slice(-6)) {
        messages.push({ role: m.role, content: m.content });
      }
    }

    messages.push({ role: 'user', content: patientMessage });

    const result = await this.aiGateway.complete('maritaca', messages, tools);

    if (!result.ok) {
      return err({ code: 'AI_UNAVAILABLE', detail: (result.error as any).message });
    }

    return ok({
      content: result.value.content,
      toolCalls: result.value.toolCalls,
    });
  }

  // ---------------------------------------------------------------------------
  // Private
  // ---------------------------------------------------------------------------

  private parseIntentJson(raw: string): IntentDetectionResult | null {
    try {
      // Extract JSON from potential markdown code blocks
      const match = raw.match(/\{[\s\S]*\}/);
      if (!match) return null;

      const parsed = JSON.parse(match[0]) as { intent?: string; confidence?: number };

      const validIntents = ['booking', 'cancellation', 'reschedule', 'price_inquiry', 'general_info', 'human_handoff', 'unclear'];
      if (!parsed.intent || !validIntents.includes(parsed.intent)) return null;
      if (typeof parsed.confidence !== 'number') return null;

      return {
        intent: parsed.intent as IntentDetectionResult['intent'],
        confidence: Math.max(0, Math.min(1, parsed.confidence)),
      };
    } catch {
      return null;
    }
  }
}
