import type { Result } from '../../shared/result';

export type AIProvider = 'maritaca-small' | 'maritaca' | 'claude-haiku' | 'claude-sonnet';

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AITool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export interface AIResponse {
  content: string;
  toolCalls?: Array<{ name: string; input: unknown }>;
}

export interface IAIGateway {
  complete(
    provider: AIProvider,
    messages: AIMessage[],
    tools?: AITool[],
  ): Promise<Result<AIResponse>>;
}

export const AI_GATEWAY = Symbol('IAIGateway');
