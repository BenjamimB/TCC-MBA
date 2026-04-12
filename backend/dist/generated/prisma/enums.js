"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = exports.PaymentMethod = exports.SubscriptionStatus = exports.SubscriptionPlan = exports.MessageDirection = exports.ConversationState = exports.AppointmentStatus = void 0;
exports.AppointmentStatus = {
    pending: 'pending',
    confirmed: 'confirmed',
    cancelled: 'cancelled',
    completed: 'completed',
    no_show: 'no_show'
};
exports.ConversationState = {
    IDLE: 'IDLE',
    TRIAGING: 'TRIAGING',
    BOOKING_COLLECTING: 'BOOKING_COLLECTING',
    BOOKING_CONFIRMING: 'BOOKING_CONFIRMING',
    CANCELLING: 'CANCELLING',
    RESCHEDULING: 'RESCHEDULING',
    RESCHEDULING_CONFIRMING: 'RESCHEDULING_CONFIRMING',
    FAQ: 'FAQ',
    ESCALATED: 'ESCALATED',
    CONCLUDED: 'CONCLUDED'
};
exports.MessageDirection = {
    inbound: 'inbound',
    outbound: 'outbound'
};
exports.SubscriptionPlan = {
    monthly: 'monthly',
    semiannual: 'semiannual',
    annual: 'annual'
};
exports.SubscriptionStatus = {
    trial: 'trial',
    active: 'active',
    overdue: 'overdue',
    cancelled: 'cancelled',
    suspended: 'suspended'
};
exports.PaymentMethod = {
    credit_card: 'credit_card',
    pix: 'pix',
    boleto: 'boleto'
};
exports.PaymentStatus = {
    pending: 'pending',
    confirmed: 'confirmed',
    overdue: 'overdue',
    refunded: 'refunded',
    cancelled: 'cancelled'
};
//# sourceMappingURL=enums.js.map