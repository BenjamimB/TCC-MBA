export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';
export interface Appointment {
    id: string;
    professionalId: string;
    patientId: string;
    startAt: Date;
    endAt: Date;
    status: AppointmentStatus;
    serviceType: string;
    notes: string | null;
    externalCalendarEventId: string | null;
    idempotencyKey: string;
}
export interface CreateAppointmentInput {
    professionalId: string;
    patientId: string;
    startAt: Date;
    endAt: Date;
    serviceType: string;
    idempotencyKey: string;
    minAdvanceHours?: number;
}
export interface AppointmentEvent {
    appointmentId: string;
    professionalId: string;
    patientId: string;
    startAt: Date;
    status: AppointmentStatus;
}
