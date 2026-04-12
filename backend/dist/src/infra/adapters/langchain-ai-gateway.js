"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LangChainAIGateway = void 0;
const messages_1 = require("@langchain/core/messages");
const result_1 = require("../../shared/result");
const CIRCUIT_FAILURE_THRESHOLD = 5;
const CIRCUIT_COOLDOWN_MS = 30_000;
class LangChainAIGateway {
    modelFactory;
    clock;
    circuits = new Map();
    constructor(modelFactory, clock = () => Date.now()) {
        this.modelFactory = modelFactory;
        this.clock = clock;
    }
    getCircuit(provider) {
        if (!this.circuits.has(provider)) {
            this.circuits.set(provider, { failures: 0, openSince: null });
        }
        return this.circuits.get(provider);
    }
    isOpen(provider) {
        const c = this.getCircuit(provider);
        if (c.openSince === null)
            return false;
        if (this.clock() - c.openSince >= CIRCUIT_COOLDOWN_MS) {
            c.failures = 0;
            c.openSince = null;
            return false;
        }
        return true;
    }
    recordSuccess(provider) {
        const c = this.getCircuit(provider);
        c.failures = 0;
        c.openSince = null;
    }
    recordFailure(provider) {
        const c = this.getCircuit(provider);
        c.failures += 1;
        if (c.failures >= CIRCUIT_FAILURE_THRESHOLD) {
            c.openSince = this.clock();
        }
    }
    async complete(provider, messages, tools) {
        if (this.isOpen(provider)) {
            return (0, result_1.err)({ code: 'AI_CIRCUIT_OPEN', provider });
        }
        const lcMessages = messages.map((m) => {
            if (m.role === 'system')
                return new messages_1.SystemMessage(m.content);
            if (m.role === 'assistant')
                return new messages_1.AIMessage(m.content);
            return new messages_1.HumanMessage(m.content);
        });
        const model = this.modelFactory(provider);
        try {
            let chainModel = model;
            if (tools && tools.length > 0 && 'bindTools' in model && typeof model.bindTools === 'function') {
                const lcTools = tools.map((t) => ({
                    type: 'function',
                    function: {
                        name: t.name,
                        description: t.description,
                        parameters: t.inputSchema,
                    },
                }));
                chainModel = model.bindTools(lcTools);
            }
            const response = await chainModel.invoke(lcMessages);
            this.recordSuccess(provider);
            const content = typeof response.content === 'string'
                ? response.content
                : Array.isArray(response.content)
                    ? response.content
                        .filter((c) => c.type === 'text')
                        .map((c) => c.text)
                        .join('')
                    : '';
            const toolCalls = response.tool_calls && Array.isArray(response.tool_calls) && response.tool_calls.length > 0
                ? response.tool_calls.map((tc) => ({
                    name: tc.name,
                    input: tc.args ?? tc.input ?? {},
                }))
                : undefined;
            return (0, result_1.ok)({ content, toolCalls });
        }
        catch (e) {
            this.recordFailure(provider);
            return (0, result_1.err)({ code: 'AI_PROVIDER_ERROR', provider, message: String(e) });
        }
    }
}
exports.LangChainAIGateway = LangChainAIGateway;
//# sourceMappingURL=langchain-ai-gateway.js.map