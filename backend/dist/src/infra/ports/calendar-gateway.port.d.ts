import type { Result } from '../../shared/result';
export interface ExternalCalendarEvent {
    externalId: string;
    title: string;
    startAt: Date;
    endAt: Date;
}
export interface ICalendarGateway {
    listEvents(professionalId: string, provider: 'google' | 'outlook', from: Date, to: Date): Promise<Result<ExternalCalendarEvent[]>>;
    createEvent(professionalId: string, provider: 'google' | 'outlook', event: Omit<ExternalCalendarEvent, 'externalId'>): Promise<Result<{
        eventId: string;
    }>>;
    deleteEvent(professionalId: string, provider: 'google' | 'outlook', eventId: string): Promise<Result<void>>;
}
export declare const CALENDAR_GATEWAY: unique symbol;
