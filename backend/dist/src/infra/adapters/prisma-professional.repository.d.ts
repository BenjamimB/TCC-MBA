import type { IProfessionalRepository, CreateProfessionalData, UpdateProfessionalData } from '../../auth/ports/professional.repository.port';
import type { ProfessionalRecord } from '../../auth/auth.types';
import { PrismaService } from '../prisma.service';
export declare class PrismaProfessionalRepository implements IProfessionalRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<ProfessionalRecord | null>;
    findById(id: string): Promise<ProfessionalRecord | null>;
    findByEmailVerifyToken(token: string): Promise<ProfessionalRecord | null>;
    findByResetPasswordToken(token: string): Promise<ProfessionalRecord | null>;
    create(data: CreateProfessionalData): Promise<ProfessionalRecord>;
    update(id: string, data: UpdateProfessionalData): Promise<ProfessionalRecord>;
}
