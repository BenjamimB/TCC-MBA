import type { Result } from '../../shared/result';
import type { IWhatsAppGateway, WhatsAppInboundPayload } from '../ports/whatsapp-gateway.port';
export interface HttpClient {
    post(url: string, body: unknown, headers: Record<string, string>): Promise<{
        ok: boolean;
        json(): Promise<unknown>;
    }>;
}
export declare class MetaWhatsAppGateway implements IWhatsAppGateway {
    private readonly phoneNumberId;
    private readonly accessToken;
    private readonly appSecret;
    private readonly http;
    constructor(phoneNumberId: string, accessToken: string, appSecret: string, http: HttpClient);
    validateWebhookSignature(rawBody: string, xHubSignature: string): boolean;
    parseWebhookPayload(body: unknown): Result<WhatsAppInboundPayload>;
    sendTextMessage(to: string, text: string): Promise<Result<{
        messageId: string;
    }>>;
    sendTemplate(to: string, templateName: string, params: Record<string, string>): Promise<Result<{
        messageId: string;
    }>>;
    private send;
}
