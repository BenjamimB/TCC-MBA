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
exports.defineExtension = exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.NullableJsonNullValueInput = exports.JsonNullValueInput = exports.SortOrder = exports.AuditLogScalarFieldEnum = exports.PaymentScalarFieldEnum = exports.SubscriptionScalarFieldEnum = exports.InteractionRecordScalarFieldEnum = exports.MessageScalarFieldEnum = exports.ConversationScalarFieldEnum = exports.WaitlistEntryScalarFieldEnum = exports.AppointmentScalarFieldEnum = exports.PatientScalarFieldEnum = exports.CalendarSyncScalarFieldEnum = exports.AvailabilityScalarFieldEnum = exports.OauthAccountScalarFieldEnum = exports.ProfessionalScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.6.0",
    engine: "75cbdc1eb7150937890ad5465d861175c6624711"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    Professional: 'Professional',
    OauthAccount: 'OauthAccount',
    Availability: 'Availability',
    CalendarSync: 'CalendarSync',
    Patient: 'Patient',
    Appointment: 'Appointment',
    WaitlistEntry: 'WaitlistEntry',
    Conversation: 'Conversation',
    Message: 'Message',
    InteractionRecord: 'InteractionRecord',
    Subscription: 'Subscription',
    Payment: 'Payment',
    AuditLog: 'AuditLog'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.ProfessionalScalarFieldEnum = {
    id: 'id',
    email: 'email',
    name: 'name',
    passwordHash: 'passwordHash',
    emailVerifiedAt: 'emailVerifiedAt',
    emailVerifyToken: 'emailVerifyToken',
    resetPasswordToken: 'resetPasswordToken',
    resetPasswordExpiresAt: 'resetPasswordExpiresAt',
    failedLoginAttempts: 'failedLoginAttempts',
    lockedUntil: 'lockedUntil',
    totpSecret: 'totpSecret',
    totpEnabled: 'totpEnabled',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.OauthAccountScalarFieldEnum = {
    id: 'id',
    professionalId: 'professionalId',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    encryptedAccessToken: 'encryptedAccessToken',
    encryptedRefreshToken: 'encryptedRefreshToken',
    tokenExpiresAt: 'tokenExpiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.AvailabilityScalarFieldEnum = {
    id: 'id',
    professionalId: 'professionalId',
    dayOfWeek: 'dayOfWeek',
    startTime: 'startTime',
    endTime: 'endTime',
    slotDurationMinutes: 'slotDurationMinutes',
    breakDurationMinutes: 'breakDurationMinutes',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CalendarSyncScalarFieldEnum = {
    id: 'id',
    professionalId: 'professionalId',
    provider: 'provider',
    encryptedAccessToken: 'encryptedAccessToken',
    encryptedRefreshToken: 'encryptedRefreshToken',
    tokenExpiresAt: 'tokenExpiresAt',
    webhookChannelId: 'webhookChannelId',
    webhookExpiration: 'webhookExpiration',
    lastSyncedAt: 'lastSyncedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PatientScalarFieldEnum = {
    id: 'id',
    professionalId: 'professionalId',
    phoneNumber: 'phoneNumber',
    name: 'name',
    dateOfBirth: 'dateOfBirth',
    consentRecordedAt: 'consentRecordedAt',
    anonymizedAt: 'anonymizedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.AppointmentScalarFieldEnum = {
    id: 'id',
    professionalId: 'professionalId',
    patientId: 'patientId',
    startAt: 'startAt',
    endAt: 'endAt',
    status: 'status',
    serviceType: 'serviceType',
    notes: 'notes',
    externalCalendarEventId: 'externalCalendarEventId',
    idempotencyKey: 'idempotencyKey',
    lastRemindedAt: 'lastRemindedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.WaitlistEntryScalarFieldEnum = {
    id: 'id',
    professionalId: 'professionalId',
    patientId: 'patientId',
    requestedDate: 'requestedDate',
    notifiedAt: 'notifiedAt',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ConversationScalarFieldEnum = {
    id: 'id',
    professionalId: 'professionalId',
    patientId: 'patientId',
    state: 'state',
    collectedData: 'collectedData',
    pendingSlotId: 'pendingSlotId',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.MessageScalarFieldEnum = {
    id: 'id',
    conversationId: 'conversationId',
    direction: 'direction',
    content: 'content',
    whatsappId: 'whatsappId',
    createdAt: 'createdAt'
};
exports.InteractionRecordScalarFieldEnum = {
    id: 'id',
    patientId: 'patientId',
    professionalId: 'professionalId',
    type: 'type',
    content: 'content',
    metadata: 'metadata',
    createdAt: 'createdAt'
};
exports.SubscriptionScalarFieldEnum = {
    id: 'id',
    professionalId: 'professionalId',
    plan: 'plan',
    status: 'status',
    trialEndsAt: 'trialEndsAt',
    currentPeriodStart: 'currentPeriodStart',
    currentPeriodEnd: 'currentPeriodEnd',
    asaasSubscriptionId: 'asaasSubscriptionId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PaymentScalarFieldEnum = {
    id: 'id',
    subscriptionId: 'subscriptionId',
    asaasPaymentId: 'asaasPaymentId',
    amount: 'amount',
    method: 'method',
    status: 'status',
    paidAt: 'paidAt',
    createdAt: 'createdAt'
};
exports.AuditLogScalarFieldEnum = {
    id: 'id',
    actorId: 'actorId',
    actorType: 'actorType',
    resourceType: 'resourceType',
    resourceId: 'resourceId',
    action: 'action',
    oldValue: 'oldValue',
    newValue: 'newValue',
    ipAddress: 'ipAddress',
    createdAt: 'createdAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.JsonNullValueInput = {
    JsonNull: exports.JsonNull
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map