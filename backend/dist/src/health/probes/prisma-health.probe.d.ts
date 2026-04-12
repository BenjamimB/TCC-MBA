import { DatabaseProbe } from '../health.service';
import { PrismaService } from '../../infra/prisma.service';
export declare class PrismaHealthProbe implements DatabaseProbe {
    private readonly prisma;
    constructor(prisma: PrismaService);
    ping(): Promise<void>;
}
