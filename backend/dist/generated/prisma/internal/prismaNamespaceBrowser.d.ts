import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly Professional: "Professional";
    readonly OauthAccount: "OauthAccount";
    readonly Availability: "Availability";
    readonly CalendarSync: "CalendarSync";
    readonly Patient: "Patient";
    readonly Appointment: "Appointment";
    readonly WaitlistEntry: "WaitlistEntry";
    readonly Conversation: "Conversation";
    readonly Message: "Message";
    readonly InteractionRecord: "InteractionRecord";
    readonly Subscription: "Subscription";
    readonly Payment: "Payment";
    readonly AuditLog: "AuditLog";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const ProfessionalScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly name: "name";
    readonly passwordHash: "passwordHash";
    readonly emailVerifiedAt: "emailVerifiedAt";
    readonly emailVerifyToken: "emailVerifyToken";
    readonly resetPasswordToken: "resetPasswordToken";
    readonly resetPasswordExpiresAt: "resetPasswordExpiresAt";
    readonly failedLoginAttempts: "failedLoginAttempts";
    readonly lockedUntil: "lockedUntil";
    readonly totpSecret: "totpSecret";
    readonly totpEnabled: "totpEnabled";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProfessionalScalarFieldEnum = (typeof ProfessionalScalarFieldEnum)[keyof typeof ProfessionalScalarFieldEnum];
export declare const OauthAccountScalarFieldEnum: {
    readonly id: "id";
    readonly professionalId: "professionalId";
    readonly provider: "provider";
    readonly providerAccountId: "providerAccountId";
    readonly encryptedAccessToken: "encryptedAccessToken";
    readonly encryptedRefreshToken: "encryptedRefreshToken";
    readonly tokenExpiresAt: "tokenExpiresAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OauthAccountScalarFieldEnum = (typeof OauthAccountScalarFieldEnum)[keyof typeof OauthAccountScalarFieldEnum];
export declare const AvailabilityScalarFieldEnum: {
    readonly id: "id";
    readonly professionalId: "professionalId";
    readonly dayOfWeek: "dayOfWeek";
    readonly startTime: "startTime";
    readonly endTime: "endTime";
    readonly slotDurationMinutes: "slotDurationMinutes";
    readonly breakDurationMinutes: "breakDurationMinutes";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AvailabilityScalarFieldEnum = (typeof AvailabilityScalarFieldEnum)[keyof typeof AvailabilityScalarFieldEnum];
export declare const CalendarSyncScalarFieldEnum: {
    readonly id: "id";
    readonly professionalId: "professionalId";
    readonly provider: "provider";
    readonly encryptedAccessToken: "encryptedAccessToken";
    readonly encryptedRefreshToken: "encryptedRefreshToken";
    readonly tokenExpiresAt: "tokenExpiresAt";
    readonly webhookChannelId: "webhookChannelId";
    readonly webhookExpiration: "webhookExpiration";
    readonly lastSyncedAt: "lastSyncedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CalendarSyncScalarFieldEnum = (typeof CalendarSyncScalarFieldEnum)[keyof typeof CalendarSyncScalarFieldEnum];
export declare const PatientScalarFieldEnum: {
    readonly id: "id";
    readonly professionalId: "professionalId";
    readonly phoneNumber: "phoneNumber";
    readonly name: "name";
    readonly dateOfBirth: "dateOfBirth";
    readonly consentRecordedAt: "consentRecordedAt";
    readonly anonymizedAt: "anonymizedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PatientScalarFieldEnum = (typeof PatientScalarFieldEnum)[keyof typeof PatientScalarFieldEnum];
export declare const AppointmentScalarFieldEnum: {
    readonly id: "id";
    readonly professionalId: "professionalId";
    readonly patientId: "patientId";
    readonly startAt: "startAt";
    readonly endAt: "endAt";
    readonly status: "status";
    readonly serviceType: "serviceType";
    readonly notes: "notes";
    readonly externalCalendarEventId: "externalCalendarEventId";
    readonly idempotencyKey: "idempotencyKey";
    readonly lastRemindedAt: "lastRemindedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum];
export declare const WaitlistEntryScalarFieldEnum: {
    readonly id: "id";
    readonly professionalId: "professionalId";
    readonly patientId: "patientId";
    readonly requestedDate: "requestedDate";
    readonly notifiedAt: "notifiedAt";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type WaitlistEntryScalarFieldEnum = (typeof WaitlistEntryScalarFieldEnum)[keyof typeof WaitlistEntryScalarFieldEnum];
export declare const ConversationScalarFieldEnum: {
    readonly id: "id";
    readonly professionalId: "professionalId";
    readonly patientId: "patientId";
    readonly state: "state";
    readonly collectedData: "collectedData";
    readonly pendingSlotId: "pendingSlotId";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum];
export declare const MessageScalarFieldEnum: {
    readonly id: "id";
    readonly conversationId: "conversationId";
    readonly direction: "direction";
    readonly content: "content";
    readonly whatsappId: "whatsappId";
    readonly createdAt: "createdAt";
};
export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum];
export declare const InteractionRecordScalarFieldEnum: {
    readonly id: "id";
    readonly patientId: "patientId";
    readonly professionalId: "professionalId";
    readonly type: "type";
    readonly content: "content";
    readonly metadata: "metadata";
    readonly createdAt: "createdAt";
};
export type InteractionRecordScalarFieldEnum = (typeof InteractionRecordScalarFieldEnum)[keyof typeof InteractionRecordScalarFieldEnum];
export declare const SubscriptionScalarFieldEnum: {
    readonly id: "id";
    readonly professionalId: "professionalId";
    readonly plan: "plan";
    readonly status: "status";
    readonly trialEndsAt: "trialEndsAt";
    readonly currentPeriodStart: "currentPeriodStart";
    readonly currentPeriodEnd: "currentPeriodEnd";
    readonly asaasSubscriptionId: "asaasSubscriptionId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum];
export declare const PaymentScalarFieldEnum: {
    readonly id: "id";
    readonly subscriptionId: "subscriptionId";
    readonly asaasPaymentId: "asaasPaymentId";
    readonly amount: "amount";
    readonly method: "method";
    readonly status: "status";
    readonly paidAt: "paidAt";
    readonly createdAt: "createdAt";
};
export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];
export declare const AuditLogScalarFieldEnum: {
    readonly id: "id";
    readonly actorId: "actorId";
    readonly actorType: "actorType";
    readonly resourceType: "resourceType";
    readonly resourceId: "resourceId";
    readonly action: "action";
    readonly oldValue: "oldValue";
    readonly newValue: "newValue";
    readonly ipAddress: "ipAddress";
    readonly createdAt: "createdAt";
};
export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const JsonNullValueInput: {
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
