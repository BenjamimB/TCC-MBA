export interface DashboardEvent {
    type: 'appointment_created' | 'appointment_cancelled' | 'appointment_confirmed' | 'appointment_rescheduled';
    professionalId: string;
    payload: unknown;
}
export interface ISSEEventBus {
    publish(event: DashboardEvent): void;
    subscribe(professionalId: string): AsyncIterable<DashboardEvent>;
}
export declare const SSE_EVENT_BUS: unique symbol;
