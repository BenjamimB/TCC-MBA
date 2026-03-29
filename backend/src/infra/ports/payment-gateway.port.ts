import type { Result } from '../../shared/result';

export interface AsaasWebhookEvent {
  event: 'PAYMENT_CONFIRMED' | 'PAYMENT_OVERDUE' | 'PAYMENT_DELETED' | 'SUBSCRIPTION_CANCELLED';
  payment?: { id: string; customer: string; value: number; status: string };
  subscription?: { id: string; status: string };
}

export interface IPaymentGateway {
  createSubscription(
    customerId: string,
    planId: string,
    method: 'credit_card' | 'pix' | 'boleto',
  ): Promise<Result<{ subscriptionId: string; checkoutUrl?: string; pixQrCode?: string }>>;
  cancelSubscription(subscriptionId: string): Promise<Result<void>>;
  validateWebhookToken(token: string): boolean;
}

export const PAYMENT_GATEWAY = Symbol('IPaymentGateway');
