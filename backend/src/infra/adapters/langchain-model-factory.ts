import { ChatOpenAI } from '@langchain/openai';
import { ChatAnthropic } from '@langchain/anthropic';
import type { BaseLanguageModel } from '@langchain/core/language_models/base';
import type { AIProvider } from '../ports/ai-gateway.port';
import type { ModelFactory } from './langchain-ai-gateway';

const MARITACA_MODEL_MAP: Record<string, string> = {
  'maritaca-small': 'sabia-3-small',
  'maritaca': 'sabia-3',
};

const ANTHROPIC_MODEL_MAP: Record<string, string> = {
  'claude-haiku': 'claude-haiku-4-5-20251001',
  'claude-sonnet': 'claude-sonnet-4-6',
};

export function createDefaultModelFactory(): ModelFactory {
  return (provider: AIProvider): BaseLanguageModel => {
    if (provider === 'maritaca-small' || provider === 'maritaca') {
      return new ChatOpenAI({
        model: MARITACA_MODEL_MAP[provider],
        apiKey: process.env.MARITACA_API_KEY ?? '',
        configuration: {
          baseURL: 'https://chat.maritaca.ai/api',
        },
      }) as unknown as BaseLanguageModel;
    }

    return new ChatAnthropic({
      model: ANTHROPIC_MODEL_MAP[provider],
      apiKey: process.env.ANTHROPIC_API_KEY ?? '',
    }) as unknown as BaseLanguageModel;
  };
}
