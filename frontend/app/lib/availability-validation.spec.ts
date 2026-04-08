/**
 * Task 10.3 — AvailabilityConfig validation unit tests
 *
 * Cobre: validação de horários, duração de slot e regras de negócio.
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5
 */
import {
  validateAvailabilityConfig,
  validateAllConfigs,
  isValidTime,
  timeToMinutes,
} from './availability-validation';
import type { AvailabilityConfig } from './schedule-api';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeConfig(overrides: Partial<AvailabilityConfig> = {}): AvailabilityConfig {
  return {
    dayOfWeek: 1,
    startTime: '08:00',
    endTime: '18:00',
    slotDurationMinutes: 60,
    breakDurationMinutes: 10,
    isActive: true,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('validateAvailabilityConfig()', () => {
  it('deve retornar valid=true para config válida e ativa', () => {
    const result = validateAvailabilityConfig(makeConfig());
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('deve retornar valid=true para config inativa sem validar campos', () => {
    const result = validateAvailabilityConfig(makeConfig({ isActive: false, startTime: '' }));
    expect(result.valid).toBe(true);
  });

  it('deve retornar erro quando startTime está vazio', () => {
    const result = validateAvailabilityConfig(makeConfig({ startTime: '' }));
    expect(result.valid).toBe(false);
    expect(result.errors.startTime).toContain('obrigatório');
  });

  it('deve retornar erro quando endTime está vazio', () => {
    const result = validateAvailabilityConfig(makeConfig({ endTime: '' }));
    expect(result.valid).toBe(false);
    expect(result.errors.endTime).toContain('obrigatório');
  });

  it('deve retornar erro quando endTime não é posterior ao startTime (AC 1.2)', () => {
    const result = validateAvailabilityConfig(makeConfig({ startTime: '18:00', endTime: '08:00' }));
    expect(result.valid).toBe(false);
    expect(result.errors.endTime).toContain('posterior');
  });

  it('deve retornar erro quando startTime igual a endTime', () => {
    const result = validateAvailabilityConfig(makeConfig({ startTime: '08:00', endTime: '08:00' }));
    expect(result.valid).toBe(false);
    expect(result.errors.endTime).toContain('posterior');
  });

  it('deve retornar erro quando slotDurationMinutes < 15 (AC 1.3)', () => {
    const result = validateAvailabilityConfig(makeConfig({ slotDurationMinutes: 10 }));
    expect(result.valid).toBe(false);
    expect(result.errors.slotDurationMinutes).toContain('15 minutos');
  });

  it('deve aceitar slotDurationMinutes = 15 (valor mínimo)', () => {
    const result = validateAvailabilityConfig(makeConfig({ slotDurationMinutes: 15 }));
    expect(result.valid).toBe(true);
  });

  it('deve retornar erro quando breakDurationMinutes é negativo', () => {
    const result = validateAvailabilityConfig(makeConfig({ breakDurationMinutes: -5 }));
    expect(result.valid).toBe(false);
    expect(result.errors.breakDurationMinutes).toContain('negativo');
  });

  it('deve retornar erro para startTime com formato inválido', () => {
    const result = validateAvailabilityConfig(makeConfig({ startTime: '8:0' }));
    expect(result.valid).toBe(false);
    expect(result.errors.startTime).toContain('inválido');
  });
});

describe('validateAllConfigs()', () => {
  it('deve validar todos os configs e retornar mapa por dayOfWeek', () => {
    const configs: AvailabilityConfig[] = [
      makeConfig({ dayOfWeek: 1 }),
      makeConfig({ dayOfWeek: 2, isActive: false }),
      makeConfig({ dayOfWeek: 3, startTime: '18:00', endTime: '08:00' }),
    ];

    const results = validateAllConfigs(configs);

    expect(results.get(1)?.valid).toBe(true);
    expect(results.get(2)?.valid).toBe(true); // inactive
    expect(results.get(3)?.valid).toBe(false); // end before start
  });
});

describe('isValidTime()', () => {
  it('deve retornar true para horário válido', () => {
    expect(isValidTime('08:00')).toBe(true);
    expect(isValidTime('23:59')).toBe(true);
  });

  it('deve retornar false para formato incorreto', () => {
    expect(isValidTime('8:00')).toBe(false);
    expect(isValidTime('24:00')).toBe(false);
    expect(isValidTime('08:60')).toBe(false);
    expect(isValidTime('abc')).toBe(false);
  });
});

describe('timeToMinutes()', () => {
  it('deve converter HH:mm para minutos desde meia-noite', () => {
    expect(timeToMinutes('00:00')).toBe(0);
    expect(timeToMinutes('01:00')).toBe(60);
    expect(timeToMinutes('08:30')).toBe(510);
    expect(timeToMinutes('23:59')).toBe(1439);
  });
});
