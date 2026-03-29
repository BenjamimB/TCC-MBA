import { Injectable } from '@nestjs/common';
import { DatabaseProbe } from '../health.service';

@Injectable()
export class PrismaHealthProbe implements DatabaseProbe {
  async ping(): Promise<void> {
    // Placeholder — will be replaced when Prisma is configured in task 1.2
    // In production: await this.prisma.$queryRaw`SELECT 1`
  }
}
