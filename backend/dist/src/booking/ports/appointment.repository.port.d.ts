import type { Appointment, AppointmentStatus } from '../booking.types';
export interface CreateAppointmentData {
    professionalId: string;
    patientId: string;
    startAt: Date;
    endAt: Date;
    serviceType: string;
    idempotencyKey: string;
}
export interface IAppointmentRepository {
    create(data: CreateAppointmentData): Promise<Appointment>;
    findById(id: string): Promise<Appointment | null>;
    findByIdempotencyKey(key: string): Promise<Appointment | null>;
    findByDay(professionalId: string, date: Date): Promise<Appointment[]>;
    findByWeek(professionalId: string, weekStart: Date): Promise<Appointment[]>;
    updateStatus(id: string, status: AppointmentStatus): Promise<Appointment>;
}
