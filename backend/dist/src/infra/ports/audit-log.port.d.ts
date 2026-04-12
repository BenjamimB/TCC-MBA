export interface AuditLogEntry {
    actorId: string;
    actorType: 'professional' | 'system';
    resourceType: string;
    resourceId: string;
    action: string;
    oldValue?: unknown;
    newValue?: unknown;
    ipAddress?: string;
}
export interface IAuditLogService {
    log(entry: AuditLogEntry): Promise<void>;
}
export declare const AUDIT_LOG_SERVICE: unique symbol;
