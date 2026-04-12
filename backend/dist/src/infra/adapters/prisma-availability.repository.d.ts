import type { IAvailabilityRepository, AvailabilityRecord } from '../../schedule/ports/availability.repository.port';
import type { AvailabilityConfig } from '../../schedule/availability.types';
import { PrismaService } from '../prisma.service';
export declare class PrismaAvailabilityRepository implements IAvailabilityRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByProfessional(professionalId: string): Promise<AvailabilityRecord[]>;
    upsert(professionalId: string, config: AvailabilityConfig): Promise<AvailabilityRecord>;
}
