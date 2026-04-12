import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/infra/prisma.service';
import { RedisService } from '../../src/infra/redis.service';

export let app: INestApplication;
export let prisma: PrismaService;
export let redis: RedisService;

// Ordem respeita FKs
const TABLES_TO_TRUNCATE = [
  'waitlist_entry',
  'appointment',
  'message',
  'conversation',
  'interaction_record',
  'patient',
  'availability',
  'oauth_account',
  'professional',
];

export async function bootstrapApp(
  overrides: Record<string, unknown> = {},
): Promise<void> {
  const builder = Test.createTestingModule({ imports: [AppModule] });

  Object.entries(overrides).forEach(([token, mock]) => {
    builder.overrideProvider(token).useValue(mock);
  });

  const module: TestingModule = await builder.compile();
  app = module.createNestApplication();
  await app.init();

  prisma = app.get(PrismaService);
  redis = app.get(RedisService);
}

export async function truncateAll(): Promise<void> {
  for (const table of TABLES_TO_TRUNCATE) {
    await prisma.$executeRawUnsafe(
      `TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE`,
    );
  }
}

export async function flushRedis(): Promise<void> {
  await redis.client.flushdb();
}

export async function teardownApp(): Promise<void> {
  await app.close();
}

export async function createVerifiedProfessional(
  overrides: Record<string, unknown> = {},
) {
  const bcrypt = await import('bcrypt');
  return prisma.professional.create({
    data: {
      email: `prof-${Date.now()}@integration.test`,
      name: 'Dr. Integration',
      passwordHash: await bcrypt.hash('Test123', 12),
      emailVerifiedAt: new Date(),
      ...overrides,
    },
  });
}

export async function loginProfessional(
  email: string,
  password: string,
): Promise<string> {
  const request = await import('supertest');
  const res = await request.default(app.getHttpServer())
    .post('/auth/login')
    .send({ email, password });
  return res.body.accessToken as string;
}
