export declare const AppointmentStatus: {
    readonly pending: "pending";
    readonly confirmed: "confirmed";
    readonly cancelled: "cancelled";
    readonly completed: "completed";
    readonly no_show: "no_show";
};
export type AppointmentStatus = (typeof AppointmentStatus)[keyof typeof AppointmentStatus];
export declare const ConversationState: {
    readonly IDLE: "IDLE";
    readonly TRIAGING: "TRIAGING";
    readonly BOOKING_COLLECTING: "BOOKING_COLLECTING";
    readonly BOOKING_CONFIRMING: "BOOKING_CONFIRMING";
    readonly CANCELLING: "CANCELLING";
    readonly RESCHEDULING: "RESCHEDULING";
    readonly RESCHEDULING_CONFIRMING: "RESCHEDULING_CONFIRMING";
    readonly FAQ: "FAQ";
    readonly ESCALATED: "ESCALATED";
    readonly CONCLUDED: "CONCLUDED";
};
export type ConversationState = (typeof ConversationState)[keyof typeof ConversationState];
export declare const MessageDirection: {
    readonly inbound: "inbound";
    readonly outbound: "outbound";
};
export type MessageDirection = (typeof MessageDirection)[keyof typeof MessageDirection];
export declare const SubscriptionPlan: {
    readonly monthly: "monthly";
    readonly semiannual: "semiannual";
    readonly annual: "annual";
};
export type SubscriptionPlan = (typeof SubscriptionPlan)[keyof typeof SubscriptionPlan];
export declare const SubscriptionStatus: {
    readonly trial: "trial";
    readonly active: "active";
    readonly overdue: "overdue";
    readonly cancelled: "cancelled";
    readonly suspended: "suspended";
};
export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus];
export declare const PaymentMethod: {
    readonly credit_card: "credit_card";
    readonly pix: "pix";
    readonly boleto: "boleto";
};
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
export declare const PaymentStatus: {
    readonly pending: "pending";
    readonly confirmed: "confirmed";
    readonly overdue: "overdue";
    readonly refunded: "refunded";
    readonly cancelled: "cancelled";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
