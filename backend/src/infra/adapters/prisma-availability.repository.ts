import { Injectable } from '@nestjs/common';
import type { IAvailabilityRepository, AvailabilityRecord } from '../../schedule/ports/availability.repository.port';
import type { AvailabilityConfig } from '../../schedule/availability.types';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAvailabilityRepository implements IAvailabilityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByProfessional(professionalId: string): Promise<AvailabilityRecord[]> {
    const rows = await this.prisma.availability.findMany({ where: { professionalId } });
    return rows.map((r) => ({
      id: r.id,
      professionalId: r.professionalId,
      dayOfWeek: r.dayOfWeek as AvailabilityRecord['dayOfWeek'],
      startTime: r.startTime,
      endTime: r.endTime,
      slotDurationMinutes: r.slotDurationMinutes,
      breakDurationMinutes: r.breakDurationMinutes,
      isActive: r.isActive,
      minAdvanceHours: (r as unknown as { minAdvanceHours?: number }).minAdvanceHours ?? 2,
    }));
  }

  async upsert(professionalId: string, config: AvailabilityConfig): Promise<AvailabilityRecord> {
    const row = await this.prisma.availability.upsert({
      where: { professionalId_dayOfWeek: { professionalId, dayOfWeek: config.dayOfWeek } },
      create: { professionalId, ...config },
      update: { ...config },
    });
    return {
      id: row.id,
      professionalId: row.professionalId,
      dayOfWeek: row.dayOfWeek as AvailabilityRecord['dayOfWeek'],
      startTime: row.startTime,
      endTime: row.endTime,
      slotDurationMinutes: row.slotDurationMinutes,
      breakDurationMinutes: row.breakDurationMinutes,
      isActive: row.isActive,
      minAdvanceHours: (row as unknown as { minAdvanceHours?: number }).minAdvanceHours ?? 2,
    };
  }
}
