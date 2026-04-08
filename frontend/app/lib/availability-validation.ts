import type { AvailabilityConfig } from './schedule-api';

export interface AvailabilityValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof AvailabilityConfig, string>>;
}

export function validateAvailabilityConfig(
  config: AvailabilityConfig,
): AvailabilityValidationResult {
  const errors: Partial<Record<keyof AvailabilityConfig, string>> = {};

  if (!config.isActive) {
    return { valid: true, errors };
  }

  // Validate time format and order
  if (!config.startTime) {
    errors.startTime = 'Horário de início é obrigatório';
  } else if (!isValidTime(config.startTime)) {
    errors.startTime = 'Horário de início inválido (formato HH:mm)';
  }

  if (!config.endTime) {
    errors.endTime = 'Horário de término é obrigatório';
  } else if (!isValidTime(config.endTime)) {
    errors.endTime = 'Horário de término inválido (formato HH:mm)';
  }

  if (config.startTime && config.endTime && isValidTime(config.startTime) && isValidTime(config.endTime)) {
    if (timeToMinutes(config.endTime) <= timeToMinutes(config.startTime)) {
      errors.endTime = 'Horário de término deve ser posterior ao de início';
    }
  }

  if (config.slotDurationMinutes < 15) {
    errors.slotDurationMinutes = 'Duração mínima do slot é 15 minutos';
  }

  if (config.breakDurationMinutes < 0) {
    errors.breakDurationMinutes = 'Intervalo entre consultas não pode ser negativo';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateAllConfigs(
  configs: AvailabilityConfig[],
): Map<number, AvailabilityValidationResult> {
  const results = new Map<number, AvailabilityValidationResult>();
  for (const config of configs) {
    results.set(config.dayOfWeek, validateAvailabilityConfig(config));
  }
  return results;
}

export function isValidTime(time: string): boolean {
  return /^\d{2}:\d{2}$/.test(time) && (() => {
    const [h, m] = time.split(':').map(Number);
    return h >= 0 && h <= 23 && m >= 0 && m <= 59;
  })();
}

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}
