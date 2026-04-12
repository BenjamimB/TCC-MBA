import type { DashboardEvent, ISSEEventBus } from '../ports/sse-event-bus.port';
export declare class MemorySSEEventBus implements ISSEEventBus {
    private readonly subjects;
    publish(event: DashboardEvent): void;
    subscribe(professionalId: string): AsyncIterable<DashboardEvent>;
}
