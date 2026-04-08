import { Injectable } from '@nestjs/common';
import type {
  IProfessionalRepository,
  CreateProfessionalData,
  UpdateProfessionalData,
} from '../../auth/ports/professional.repository.port';
import type { ProfessionalRecord } from '../../auth/auth.types';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaProfessionalRepository implements IProfessionalRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<ProfessionalRecord | null> {
    return this.prisma.professional.findUnique({ where: { email } }) as Promise<ProfessionalRecord | null>;
  }

  async findById(id: string): Promise<ProfessionalRecord | null> {
    return this.prisma.professional.findUnique({ where: { id } }) as Promise<ProfessionalRecord | null>;
  }

  async findByEmailVerifyToken(token: string): Promise<ProfessionalRecord | null> {
    return this.prisma.professional.findFirst({ where: { emailVerifyToken: token } }) as Promise<ProfessionalRecord | null>;
  }

  async findByResetPasswordToken(token: string): Promise<ProfessionalRecord | null> {
    return this.prisma.professional.findFirst({ where: { resetPasswordToken: token } }) as Promise<ProfessionalRecord | null>;
  }

  async create(data: CreateProfessionalData): Promise<ProfessionalRecord> {
    return this.prisma.professional.create({ data }) as unknown as ProfessionalRecord;
  }

  async update(id: string, data: UpdateProfessionalData): Promise<ProfessionalRecord> {
    return this.prisma.professional.update({ where: { id }, data }) as unknown as ProfessionalRecord;
  }
}
