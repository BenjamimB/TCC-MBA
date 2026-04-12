"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaWhatsAppGateway = void 0;
const crypto = __importStar(require("crypto"));
const result_1 = require("../../shared/result");
class MetaWhatsAppGateway {
    phoneNumberId;
    accessToken;
    appSecret;
    http;
    constructor(phoneNumberId, accessToken, appSecret, http) {
        this.phoneNumberId = phoneNumberId;
        this.accessToken = accessToken;
        this.appSecret = appSecret;
        this.http = http;
    }
    validateWebhookSignature(rawBody, xHubSignature) {
        if (!xHubSignature.startsWith('sha256=')) {
            return false;
        }
        const expected = 'sha256=' + crypto
            .createHmac('sha256', this.appSecret)
            .update(rawBody, 'utf8')
            .digest('hex');
        try {
            return crypto.timingSafeEqual(Buffer.from(xHubSignature), Buffer.from(expected));
        }
        catch {
            return false;
        }
    }
    parseWebhookPayload(body) {
        try {
            const b = body;
            const entry = b?.entry?.[0];
            const change = entry?.changes?.[0];
            const value = change?.value;
            const messages = value?.messages;
            if (!messages || !Array.isArray(messages) || messages.length === 0) {
                return (0, result_1.err)({ code: 'UNSUPPORTED_PAYLOAD' });
            }
            const msg = messages[0];
            if (!msg.from || !msg.id) {
                return (0, result_1.err)({ code: 'INVALID_PAYLOAD' });
            }
            return (0, result_1.ok)({
                from: msg.from,
                messageId: msg.id,
                text: msg.text?.body,
                timestamp: Number(msg.timestamp),
            });
        }
        catch {
            return (0, result_1.err)({ code: 'INVALID_PAYLOAD' });
        }
    }
    async sendTextMessage(to, text) {
        return this.send(to, { type: 'text', text: { body: text, preview_url: false } });
    }
    async sendTemplate(to, templateName, params) {
        const components = Object.keys(params).length > 0
            ? [
                {
                    type: 'body',
                    parameters: Object.values(params).map((v) => ({ type: 'text', text: v })),
                },
            ]
            : [];
        return this.send(to, {
            type: 'template',
            template: {
                name: templateName,
                language: { code: 'pt_BR' },
                components,
            },
        });
    }
    async send(to, messageBody) {
        const url = `https://graph.facebook.com/v19.0/${this.phoneNumberId}/messages`;
        const payload = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to,
            ...messageBody,
        };
        try {
            const res = await this.http.post(url, payload, {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.accessToken}`,
            });
            if (!res.ok) {
                const data = await res.json();
                return (0, result_1.err)({ code: 'WHATSAPP_SEND_ERROR', detail: data?.error?.message ?? 'unknown' });
            }
            const data = await res.json();
            const messageId = data?.messages?.[0]?.id ?? '';
            return (0, result_1.ok)({ messageId });
        }
        catch (e) {
            return (0, result_1.err)({ code: 'WHATSAPP_SEND_ERROR', detail: String(e) });
        }
    }
}
exports.MetaWhatsAppGateway = MetaWhatsAppGateway;
//# sourceMappingURL=meta-whatsapp-gateway.js.map