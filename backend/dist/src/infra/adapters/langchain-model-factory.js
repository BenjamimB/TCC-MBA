"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultModelFactory = createDefaultModelFactory;
const openai_1 = require("@langchain/openai");
const anthropic_1 = require("@langchain/anthropic");
const MARITACA_MODEL_MAP = {
    'maritaca-small': 'sabia-3-small',
    'maritaca': 'sabia-3',
};
const ANTHROPIC_MODEL_MAP = {
    'claude-haiku': 'claude-haiku-4-5-20251001',
    'claude-sonnet': 'claude-sonnet-4-6',
};
function createDefaultModelFactory() {
    return (provider) => {
        if (provider === 'maritaca-small' || provider === 'maritaca') {
            return new openai_1.ChatOpenAI({
                model: MARITACA_MODEL_MAP[provider],
                apiKey: process.env.MARITACA_API_KEY ?? '',
                configuration: {
                    baseURL: 'https://chat.maritaca.ai/api',
                },
            });
        }
        return new anthropic_1.ChatAnthropic({
            model: ANTHROPIC_MODEL_MAP[provider],
            apiKey: process.env.ANTHROPIC_API_KEY ?? '',
        });
    };
}
//# sourceMappingURL=langchain-model-factory.js.map