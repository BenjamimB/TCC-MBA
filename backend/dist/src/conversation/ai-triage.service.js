"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AITriageService = void 0;
const result_1 = require("../shared/result");
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
class AITriageService {
    aiGateway;
    constructor(aiGateway) {
        this.aiGateway = aiGateway;
    }
    async detectIntent(patientMessage, context) {
        const messages = [
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
            return (0, result_1.err)({ code: 'AI_UNAVAILABLE', detail: result.error.message });
        }
        const parsed = this.parseIntentJson(result.value.content);
        if (!parsed) {
            return (0, result_1.ok)({ intent: 'unclear', confidence: 0 });
        }
        if (parsed.confidence < CONFIDENCE_THRESHOLD) {
            return (0, result_1.ok)({ intent: 'unclear', confidence: parsed.confidence });
        }
        return (0, result_1.ok)(parsed);
    }
    async generateResponse(patientMessage, context) {
        const contextJson = JSON.stringify({
            patientName: context.patientName,
            professionalName: context.professionalName,
            clinicAddress: context.clinicAddress,
            currentState: context.currentState,
        });
        const messages = [
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
            return (0, result_1.err)({ code: 'AI_UNAVAILABLE', detail: result.error.message });
        }
        return (0, result_1.ok)(result.value.content);
    }
    async executeWithTools(patientMessage, context, tools) {
        const contextJson = JSON.stringify({
            patientName: context.patientName,
            currentState: context.currentState,
        });
        const messages = [
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
            return (0, result_1.err)({ code: 'AI_UNAVAILABLE', detail: result.error.message });
        }
        return (0, result_1.ok)({
            content: result.value.content,
            toolCalls: result.value.toolCalls,
        });
    }
    parseIntentJson(raw) {
        try {
            const match = raw.match(/\{[\s\S]*\}/);
            if (!match)
                return null;
            const parsed = JSON.parse(match[0]);
            const validIntents = ['booking', 'cancellation', 'reschedule', 'price_inquiry', 'general_info', 'human_handoff', 'unclear'];
            if (!parsed.intent || !validIntents.includes(parsed.intent))
                return null;
            if (typeof parsed.confidence !== 'number')
                return null;
            return {
                intent: parsed.intent,
                confidence: Math.max(0, Math.min(1, parsed.confidence)),
            };
        }
        catch {
            return null;
        }
    }
}
exports.AITriageService = AITriageService;
//# sourceMappingURL=ai-triage.service.js.map