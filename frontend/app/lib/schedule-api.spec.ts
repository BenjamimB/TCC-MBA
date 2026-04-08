/**
 * Task 10.2 / 10.3 — Schedule API utilities unit tests
 *
 * Cobre: utilitários de formatação e labels de status.
 * Requirements: 3.1, 3.2, 3.3, 1.1
 */
import {
  formatAppointmentTime,
  getStatusLabel,
  DAY_NAMES,
  type AppointmentStatus,
} from './schedule-api';

describe('formatAppointmentTime()', () => {
  it('deve formatar horário de início e fim corretamente', () => {
    const result = formatAppointmentTime(
      '2025-06-12T14:00:00.000Z',
      '2025-06-12T15:00:00.000Z',
    );
    // The exact format depends on timezone, but should contain hours and dash
    expect(result).toMatch(/\d{2}:\d{2}\s*–\s*\d{2}:\d{2}/);
  });
});

describe('getStatusLabel()', () => {
  const cases: [AppointmentStatus, string][] = [
    ['pending', 'Pendente'],
    ['confirmed', 'Confirmado'],
    ['cancelled', 'Cancelado'],
    ['completed', 'Realizado'],
    ['no_show', 'Não compareceu'],
  ];

  test.each(cases)('deve retornar label "%s" para status %s', (status, expected) => {
    expect(getStatusLabel(status)).toBe(expected);
  });
});

describe('DAY_NAMES', () => {
  it('deve ter 7 dias da semana', () => {
    expect(Object.keys(DAY_NAMES)).toHaveLength(7);
  });

  it('deve ter domingo como dia 0', () => {
    expect(DAY_NAMES[0]).toBe('Domingo');
  });

  it('deve ter sábado como dia 6', () => {
    expect(DAY_NAMES[6]).toBe('Sábado');
  });
});
