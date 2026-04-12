import type { Result } from '../shared/result';
import type { AvailabilityConfig } from './availability.types';
import type { IAvailabilityRepository } from './ports/availability.repository.port';
import type { IEventPublisher } from './ports/event-publisher.port';
export declare class AvailabilityService {
    private readonly repo;
    private readonly eventPublisher;
    private readonly clock;
    constructor(repo: IAvailabilityRepository, eventPublisher: IEventPublisher, clock?: () => Date);
    getConfig(professionalId: string): Promise<Result<AvailabilityConfig[]>>;
    updateConfig(professionalId: string, configs: AvailabilityConfig[]): Promise<Result<void>>;
    private validate;
}
