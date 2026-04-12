/**
 * Suite IT-A — Autenticação ponta a ponta com banco real
 * Task: 2.1 | Requirements: 11.1, 11.3, 11.4, 11.5
 *
 * PostgreSQL: real | Redis: real | Email: NoOpNotificationService (no-op)
 */
import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/infra/prisma.service';

let app: INestApplication;
let prisma: PrismaService;

async function truncate() {
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "professional" RESTART IDENTITY CASCADE');
}

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = module.createNestApplication();
  await app.init();
  prisma = app.get(PrismaService);
});

afterEach(async () => { await truncate(); });
afterAll(async () => { await app.close(); });

// ---------------------------------------------------------------------------

describe('IT-A — Auth (integração)', () => {

  // Partição P1 (válida): registro com credenciais corretas
  it('[IT-A-01] POST /auth/register cria profissional no banco', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'dr@test.com', password: 'Test123x', name: 'Dr. Test' });

    expect(res.status).toBe(201);
    const row = await prisma.professional.findUnique({ where: { email: 'dr@test.com' } });
    expect(row).not.toBeNull();
    expect(row!.passwordHash).not.toBe('Test123x'); // hash, não plaintext
    expect(row!.emailVerifiedAt).toBeNull();
  });

  // Partição P2 (inválida): e-mail duplicado
  it('[IT-A-02] segundo registro com mesmo e-mail retorna 422 CONFLICT', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'dr@test.com', password: 'Test123x', name: 'Dr. Test' });

    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'dr@test.com', password: 'Test123x', name: 'Dr. Test 2' });

    expect(res.status).toBe(422);
    expect(res.body.message).toBe('CONFLICT');
  });

  // Partição P3 (inválida): senha inválida — sem número
  it('[IT-A-03] registro com senha inválida retorna 422 VALIDATION_ERROR', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'dr@test.com', password: 'senhasemnum', name: 'Dr. Test' });

    expect(res.status).toBe(422);
    expect(res.body.message).toBe('VALIDATION_ERROR');
  });

  // Partição P4: login com e-mail não verificado
  it('[IT-A-04] login com e-mail não verificado retorna 401', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'dr@test.com', password: 'Test123x', name: 'Dr. Test' });

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'dr@test.com', password: 'Test123x' });

    expect(res.status).toBe(401);
  });

  // Partição P5 (válida): login com conta verificada retorna tokens
  it('[IT-A-05] login com credenciais válidas retorna accessToken e refreshToken', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'dr@test.com', password: 'Test123x', name: 'Dr. Test' });

    // Verificar e-mail diretamente no banco (NoOpNotificationService não envia e-mail real)
    await prisma.professional.update({
      where: { email: 'dr@test.com' },
      data: { emailVerifiedAt: new Date(), emailVerifyToken: null },
    });

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'dr@test.com', password: 'Test123x' });

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.refreshToken).toBeDefined();

    // accessToken é JWT decodificável
    const [, payload] = res.body.accessToken.split('.');
    const claims = JSON.parse(Buffer.from(payload, 'base64url').toString());
    expect(claims.sub).toBeDefined();
  });

  // Partição P6: senha errada incrementa failedLoginAttempts
  it('[IT-A-06] senha errada incrementa failedLoginAttempts no banco', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'dr@test.com', password: 'Test123x', name: 'Dr. Test' });
    await prisma.professional.update({
      where: { email: 'dr@test.com' },
      data: { emailVerifiedAt: new Date() },
    });

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'dr@test.com', password: 'WrongPass1' });

    const row = await prisma.professional.findUnique({ where: { email: 'dr@test.com' } });
    expect(row!.failedLoginAttempts).toBe(1);
  });

  // Partição P7: 5 tentativas falhas bloqueiam conta
  it('[IT-A-07] 5 tentativas falhas bloqueiam a conta', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'dr@test.com', password: 'Test123x', name: 'Dr. Test' });
    await prisma.professional.update({
      where: { email: 'dr@test.com' },
      data: { emailVerifiedAt: new Date() },
    });

    for (let i = 0; i < 5; i++) {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'dr@test.com', password: 'WrongPass1' });
    }

    const row = await prisma.professional.findUnique({ where: { email: 'dr@test.com' } });
    expect(row!.lockedUntil).not.toBeNull();

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'dr@test.com', password: 'Test123x' });
    expect(res.status).toBe(429);
  });

  // Partição P8: refresh token gera novo accessToken
  it('[IT-A-08] POST /auth/refresh retorna novo accessToken', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'dr@test.com', password: 'Test123x', name: 'Dr. Test' });
    await prisma.professional.update({
      where: { email: 'dr@test.com' },
      data: { emailVerifiedAt: new Date() },
    });

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'dr@test.com', password: 'Test123x' });

    const res = await request(app.getHttpServer())
      .post('/auth/refresh')
      .send({ refreshToken: loginRes.body.refreshToken });

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeDefined();
  });

  // Partição P9: logout invalida refresh token
  it('[IT-A-09] POST /auth/logout invalida refresh token — segundo refresh retorna 401', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'dr@test.com', password: 'Test123x', name: 'Dr. Test' });
    await prisma.professional.update({
      where: { email: 'dr@test.com' },
      data: { emailVerifiedAt: new Date() },
    });

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'dr@test.com', password: 'Test123x' });

    await request(app.getHttpServer())
      .post('/auth/logout')
      .send({ refreshToken: loginRes.body.refreshToken });

    const res = await request(app.getHttpServer())
      .post('/auth/refresh')
      .send({ refreshToken: loginRes.body.refreshToken });

    expect(res.status).toBe(401);
  });
});
