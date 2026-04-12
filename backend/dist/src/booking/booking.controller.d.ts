import { BookingService } from './booking.service';
import type { CreateAppointmentInput } from './booking.types';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    create(body: CreateAppointmentInput): Promise<import("./booking.types").Appointment>;
    getByDay(professionalId: string, date: string): Promise<import("./booking.types").Appointment[]>;
    getByWeek(professionalId: string, weekStart: string): Promise<import("./booking.types").Appointment[]>;
    getById(id: string): Promise<import("./booking.types").Appointment>;
    cancel(id: string, requestedBy?: 'patient' | 'professional'): Promise<void>;
    confirm(id: string): Promise<{
        message: string;
    }>;
}
