import type { AvailabilityUpdatedEvent } from '../availability.types';
export interface IEventPublisher {
    publishAvailabilityUpdated(event: AvailabilityUpdatedEvent): Promise<void>;
}
