export type Result<T, E = DomainError> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export type DomainError =
  | { code: 'SLOT_NOT_AVAILABLE'; slotId: string }
  | { code: 'SLOT_RESERVATION_EXPIRED'; slotId: string }
  | { code: 'APPOINTMENT_IN_PAST' }
  | { code: 'BELOW_MIN_ADVANCE_NOTICE'; minHours: number }
  | { code: 'APPOINTMENT_NOT_FOUND'; id: string }
  | { code: 'APPOINTMENT_ALREADY_PAST'; id: string }
  | { code: 'PATIENT_NOT_FOUND'; id: string }
  | { code: 'CONFLICT'; resource: string }
  | { code: 'SUBSCRIPTION_REQUIRED' }
  | { code: 'TRIAL_ALREADY_USED' }
  | { code: 'OAUTH_ACCOUNT_ALREADY_LINKED'; provider: string }
  | { code: 'VALIDATION_ERROR'; fields: Record<string, string> }
  | { code: 'EXTERNAL_SERVICE_UNAVAILABLE'; service: string }
  | { code: 'UNAUTHORIZED' }
  | { code: 'RATE_LIMITED'; retryAfterSeconds: number };

export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

export function err<E = DomainError>(error: E): Result<never, E> {
  return { ok: false, error };
}

export function isOk<T, E>(result: Result<T, E>): result is { ok: true; value: T } {
  return result.ok;
}
