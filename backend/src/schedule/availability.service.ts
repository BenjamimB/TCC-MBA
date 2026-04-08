import type { Result } from '../shared/result';
import { ok, err } from '../shared/result';
import type { AvailabilityConfig } from './availability.types';
import type { IAvailabilityRepository } from './ports/availability.repository.port';
import type { IEventPublisher } from './ports/event-publisher.port';

function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

export class AvailabilityService {
  constructor(
    private readonly repo: IAvailabilityRepository,
    private readonly eventPublisher: IEventPublisher,
    private readonly clock: () => Date = () => new Date(),
  ) {}

  async getConfig(professionalId: string): Promise<Result<AvailabilityConfig[]>> {
    const records = await this.repo.findByProfessional(professionalId);
    return ok(records);
  }

  async updateConfig(professionalId: string, configs: AvailabilityConfig[]): Promise<Result<void>> {
    // Valida unicidade de dayOfWeek na lista de entrada
    const days = configs.map((c) => c.dayOfWeek);
    if (new Set(days).size !== days.length) {
      return err({
        code: 'VALIDATION_ERROR',
        fields: { dayOfWeek: 'Não é permitido dois horários para o mesmo dia da semana.' },
      });
    }

    // Valida cada config individualmente
    for (const config of configs) {
      const validationError = this.validate(config);
      if (validationError) return err(validationError);
    }

    // Persiste via upsert
    for (const config of configs) {
      await this.repo.upsert(professionalId, config);
    }

    // Publica evento único após persistência bem-sucedida
    await this.eventPublisher.publishAvailabilityUpdated({
      professionalId,
      updatedAt: this.clock(),
    });

    return ok(undefined);
  }

  private validate(config: AvailabilityConfig): { code: 'VALIDATION_ERROR'; fields: Record<string, string> } | null {
    const startMinutes = toMinutes(config.startTime);
    const endMinutes = toMinutes(config.endTime);

    if (endMinutes <= startMinutes) {
      return { code: 'VALIDATION_ERROR', fields: { endTime: 'Horário de fim deve ser posterior ao de início.' } };
    }
    if (config.slotDurationMinutes < 15) {
      return { code: 'VALIDATION_ERROR', fields: { slotDurationMinutes: 'Duração mínima é 15 minutos.' } };
    }
    if (config.breakDurationMinutes < 0) {
      return { code: 'VALIDATION_ERROR', fields: { breakDurationMinutes: 'Intervalo não pode ser negativo.' } };
    }
    return null;
  }
}
