import { Injectable } from '@nestjs/common';
import type { IAppointmentRepository, CreateAppointmentData } from '../../booking/ports/appointment.repository.port';
import type { Appointment, AppointmentStatus } from '../../booking/booking.types';
import type { BookedSlot, IAppointmentQuery } from '../../schedule/ports/appointment-query.port';
import { PrismaService } from '../prisma.service';

function toAppointment(row: Record<string, unknown>): Appointment {
  return {
    id: row.id as string,
    professionalId: row.professionalId as string,
    patientId: row.patientId as string,
    startAt: row.startAt as Date,
    endAt: row.endAt as Date,
    status: row.status as AppointmentStatus,
    serviceType: row.serviceType as string,
    notes: (row.notes as string | null) ?? null,
    externalCalendarEventId: (row.externalCalendarEventId as string | null) ?? null,
    idempotencyKey: row.idempotencyKey as string,
  };
}

@Injectable()
export class PrismaAppointmentRepository implements IAppointmentRepository, IAppointmentQuery {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAppointmentData): Promise<Appointment> {
    const row = await this.prisma.appointment.create({
      data: { ...data, serviceType: data.serviceType },
    });
    return toAppointment(row as unknown as Record<string, unknown>);
  }

  async findById(id: string): Promise<Appointment | null> {
    const row = await this.prisma.appointment.findUnique({ where: { id } });
    return row ? toAppointment(row as unknown as Record<string, unknown>) : null;
  }

  async findByIdempotencyKey(key: string): Promise<Appointment | null> {
    const row = await this.prisma.appointment.findUnique({ where: { idempotencyKey: key } });
    return row ? toAppointment(row as unknown as Record<string, unknown>) : null;
  }

  async findByDay(professionalId: string, date: Date): Promise<Appointment[]> {
    const start = new Date(date);
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setUTCHours(23, 59, 59, 999);

    const rows = await this.prisma.appointment.findMany({
      where: { professionalId, startAt: { gte: start, lte: end } },
      orderBy: { startAt: 'asc' },
    });
    return rows.map((r) => toAppointment(r as unknown as Record<string, unknown>));
  }

  async findByWeek(professionalId: string, weekStart: Date): Promise<Appointment[]> {
    const start = new Date(weekStart);
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date(weekStart);
    end.setUTCDate(end.getUTCDate() + 6);
    end.setUTCHours(23, 59, 59, 999);

    const rows = await this.prisma.appointment.findMany({
      where: { professionalId, startAt: { gte: start, lte: end } },
      orderBy: { startAt: 'asc' },
    });
    return rows.map((r) => toAppointment(r as unknown as Record<string, unknown>));
  }

  async updateStatus(id: string, status: AppointmentStatus): Promise<Appointment> {
    const row = await this.prisma.appointment.update({ where: { id }, data: { status } });
    return toAppointment(row as unknown as Record<string, unknown>);
  }

  async findBookedSlots(professionalId: string, from: Date, to: Date): Promise<BookedSlot[]> {
    const rows = await this.prisma.appointment.findMany({
      where: {
        professionalId,
        startAt: { gte: from, lte: to },
        status: { notIn: ['cancelled', 'no_show'] },
      },
      select: { startAt: true, endAt: true },
      orderBy: { startAt: 'asc' },
    });
    return rows;
  }
}
