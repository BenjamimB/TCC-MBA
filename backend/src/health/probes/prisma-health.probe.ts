import { Injectable } from '@nestjs/common';
import { DatabaseProbe } from '../health.service';
import { PrismaService } from '../../infra/prisma.service';

@Injectable()
export class PrismaHealthProbe implements DatabaseProbe {
  constructor(private readonly prisma: PrismaService) {}

  async ping(): Promise<void> {
    await this.prisma.$queryRaw`SELECT 1`;
  }
}
