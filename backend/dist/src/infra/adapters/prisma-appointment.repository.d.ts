import type { IAppointmentRepository, CreateAppointmentData } from '../../booking/ports/appointment.repository.port';
import type { Appointment, AppointmentStatus } from '../../booking/booking.types';
import type { BookedSlot, IAppointmentQuery } from '../../schedule/ports/appointment-query.port';
import { PrismaService } from '../prisma.service';
export declare class PrismaAppointmentRepository implements IAppointmentRepository, IAppointmentQuery {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateAppointmentData): Promise<Appointment>;
    findById(id: string): Promise<Appointment | null>;
    findByIdempotencyKey(key: string): Promise<Appointment | null>;
    findByDay(professionalId: string, date: Date): Promise<Appointment[]>;
    findByWeek(professionalId: string, weekStart: Date): Promise<Appointment[]>;
    updateStatus(id: string, status: AppointmentStatus): Promise<Appointment>;
    findBookedSlots(professionalId: string, from: Date, to: Date): Promise<BookedSlot[]>;
}
