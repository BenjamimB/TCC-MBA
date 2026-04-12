import type { BaseLanguageModel } from '@langchain/core/language_models/base';
import type { Result } from '../../shared/result';
import type { AIProvider, AIMessage, AITool, AIResponse, IAIGateway } from '../ports/ai-gateway.port';
export type ModelFactory = (provider: AIProvider) => BaseLanguageModel;
export declare class LangChainAIGateway implements IAIGateway {
    private readonly modelFactory;
    private readonly clock;
    private readonly circuits;
    constructor(modelFactory: ModelFactory, clock?: () => number);
    private getCircuit;
    private isOpen;
    private recordSuccess;
    private recordFailure;
    complete(provider: AIProvider, messages: AIMessage[], tools?: AITool[]): Promise<Result<AIResponse>>;
}
