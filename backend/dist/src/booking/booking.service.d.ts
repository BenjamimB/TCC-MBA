import type { Result } from '../shared/result';
import type { Appointment, CreateAppointmentInput } from './booking.types';
import type { IAppointmentRepository } from './ports/appointment.repository.port';
import type { ISSEEventBus } from '../infra/ports/sse-event-bus.port';
export declare class BookingService {
    private readonly repo;
    private readonly eventBus;
    private readonly clock;
    constructor(repo: IAppointmentRepository, eventBus: ISSEEventBus, clock?: () => Date);
    createAppointment(input: CreateAppointmentInput): Promise<Result<Appointment>>;
    cancelAppointment(id: string, requestedBy: 'patient' | 'professional'): Promise<Result<void>>;
    confirmAppointment(id: string): Promise<Result<void>>;
    getById(id: string): Promise<Result<Appointment>>;
    getByDay(professionalId: string, date: Date): Promise<Result<Appointment[]>>;
    getByWeek(professionalId: string, weekStart: Date): Promise<Result<Appointment[]>>;
}
