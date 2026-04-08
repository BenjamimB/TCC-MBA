import { Injectable } from '@nestjs/common';
import type { IPatientRepository, CreatePatientData, UpdatePatientData } from '../../patient/ports/patient.repository.port';
import type { Patient, InteractionRecord } from '../../patient/patient.types';
import { PrismaService } from '../prisma.service';

function toPatient(row: Record<string, unknown>): Patient {
  return {
    id: row.id as string,
    professionalId: row.professionalId as string,
    phoneNumber: row.phoneNumber as string,
    name: (row.name as string | null) ?? null,
    dateOfBirth: (row.dateOfBirth as Date | null) ?? null,
    consentRecordedAt: (row.consentRecordedAt as Date | null) ?? null,
    anonymizedAt: (row.anonymizedAt as Date | null) ?? null,
    createdAt: row.createdAt as Date,
  };
}

@Injectable()
export class PrismaPatientRepository implements IPatientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByPhone(professionalId: string, phoneNumber: string): Promise<Patient | null> {
    const row = await this.prisma.patient.findUnique({
      where: { professionalId_phoneNumber: { professionalId, phoneNumber } },
    });
    return row ? toPatient(row as unknown as Record<string, unknown>) : null;
  }

  async findById(id: string): Promise<Patient | null> {
    const row = await this.prisma.patient.findUnique({ where: { id } });
    return row ? toPatient(row as unknown as Record<string, unknown>) : null;
  }

  async create(data: CreatePatientData): Promise<Patient> {
    const row = await this.prisma.patient.create({ data });
    return toPatient(row as unknown as Record<string, unknown>);
  }

  async update(id: string, data: UpdatePatientData): Promise<Patient> {
    const row = await this.prisma.patient.update({ where: { id }, data });
    return toPatient(row as unknown as Record<string, unknown>);
  }

  async findInteractionHistory(patientId: string, professionalId: string): Promise<InteractionRecord[]> {
    const rows = await this.prisma.interactionRecord.findMany({
      where: { patientId, professionalId },
      orderBy: { createdAt: 'asc' },
    });
    return rows.map((r) => ({
      id: r.id,
      patientId: r.patientId,
      professionalId: r.professionalId,
      type: r.type as InteractionRecord['type'],
      content: r.content,
      metadata: (r.metadata ?? {}) as Record<string, unknown>,
      createdAt: r.createdAt,
    }));
  }
}
