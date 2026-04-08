import type { AvailabilityConfig } from '../availability.types';

export interface AvailabilityRecord extends AvailabilityConfig {
  id: string;
  professionalId: string;
}

export interface IAvailabilityRepository {
  findByProfessional(professionalId: string): Promise<AvailabilityRecord[]>;
  upsert(professionalId: string, config: AvailabilityConfig): Promise<AvailabilityRecord>;
}
