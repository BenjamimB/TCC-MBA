import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { ok, err, isOk, Result, DomainError } from './result';

describe('Result<T, E> — Task 1.3', () => {
  // Partição P1 + P4 (válida): ok() cria sucesso
  it('[TC-F-01] ok(value) deve criar Result com ok:true e value correto', () => {
    const result = ok(42);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBe(42);
    }
  });

  // Partição P2 + P4 (inválida): err() cria falha
  it('[TC-F-02] err(error) deve criar Result com ok:false e error correto', () => {
    const error: DomainError = { code: 'APPOINTMENT_IN_PAST' };
    const result = err(error);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toEqual(error);
    }
  });

  // Partição P3: narrowing funciona via switch
  it('[TC-F-03] type narrowing deve funcionar em switch sobre DomainError.code', () => {
    const error: DomainError = { code: 'SLOT_NOT_AVAILABLE', slotId: 'abc' };
    let handled = false;

    switch (error.code) {
      case 'SLOT_NOT_AVAILABLE':
        expect(error.slotId).toBe('abc');
        handled = true;
        break;
    }

    expect(handled).toBe(true);
  });

  // Partição P1: isOk true
  it('[TC-F-04] isOk() deve retornar true para Result de sucesso', () => {
    const result = ok('hello');
    expect(isOk(result)).toBe(true);
  });

  // Partição P2: isOk false
  it('[TC-F-05] isOk() deve retornar false para Result de erro', () => {
    const result: Result<string> = err({ code: 'UNAUTHORIZED' });
    expect(isOk(result)).toBe(false);
  });

  // TC-F-06: AppModule resolve sem erros de DI
  it('[TC-F-06] AppModule deve ser inicializado pelo NestJS sem erros de DI', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    expect(module).toBeDefined();
    await module.close();
  });

  // Cobre todos os DomainError codes do design
  it('[TC-F-07] todos os DomainError codes do design devem ser representáveis', () => {
    const errors: DomainError[] = [
      { code: 'SLOT_NOT_AVAILABLE', slotId: 's1' },
      { code: 'SLOT_RESERVATION_EXPIRED', slotId: 's2' },
      { code: 'APPOINTMENT_IN_PAST' },
      { code: 'BELOW_MIN_ADVANCE_NOTICE', minHours: 24 },
      { code: 'APPOINTMENT_NOT_FOUND', id: 'a1' },
      { code: 'APPOINTMENT_ALREADY_PAST', id: 'a2' },
      { code: 'PATIENT_NOT_FOUND', id: 'p1' },
      { code: 'CONFLICT', resource: 'appointment' },
      { code: 'SUBSCRIPTION_REQUIRED' },
      { code: 'TRIAL_ALREADY_USED' },
      { code: 'OAUTH_ACCOUNT_ALREADY_LINKED', provider: 'google' },
      { code: 'VALIDATION_ERROR', fields: { email: 'invalid' } },
      { code: 'EXTERNAL_SERVICE_UNAVAILABLE', service: 'whatsapp' },
      { code: 'UNAUTHORIZED' },
      { code: 'RATE_LIMITED', retryAfterSeconds: 60 },
    ];
    expect(errors.length).toBe(15);
    errors.forEach((e) => expect(e.code).toBeTruthy());
  });
});
