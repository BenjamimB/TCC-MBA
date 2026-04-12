import type { Result } from '../shared/result';
import type { IAIGateway, AITool } from '../infra/ports/ai-gateway.port';
import type { IntentDetectionResult, ConversationContext } from './ai-triage.types';
export declare class AITriageService {
    private readonly aiGateway;
    constructor(aiGateway: IAIGateway);
    detectIntent(patientMessage: string, context?: ConversationContext): Promise<Result<IntentDetectionResult>>;
    generateResponse(patientMessage: string, context: ConversationContext): Promise<Result<string>>;
    executeWithTools(patientMessage: string, context: ConversationContext, tools: AITool[]): Promise<Result<{
        content: string;
        toolCalls?: Array<{
            name: string;
            input: unknown;
        }>;
    }>>;
    private parseIntentJson;
}
