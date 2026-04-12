/**
 * Suite IT-H — Health Check com infraestrutura real
 *
 * PostgreSQL: real (Docker)
 * Redis: real (Docker)
 * Serviços externos: nenhum (não se aplica ao health check)
 *
 * Requisito coberto: RNF-01 (disponibilidade 99,9%)
 */
import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { RedisHealthProbe } from '../../src/health/probes/redis-health.probe';

describe('IT-H — Health Check (integração)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // Partição P1 (válida): PostgreSQL UP + Redis UP — infra real
  it('[IT-H-01] GET /health retorna 200 com PostgreSQL e Redis reais acessíveis', async () => {
    const res = await request(app.getHttpServer()).get('/health');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.postgres).toBe('up');
    expect(res.body.redis).toBe('up');
  });

  // Partição P1 — usabilidade: campos obrigatórios presentes
  it('[IT-H-U01] resposta contém os campos status, postgres e redis', async () => {
    const res = await request(app.getHttpServer()).get('/health');

    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('postgres');
    expect(res.body).toHaveProperty('redis');
  });

  // Partição P2 (inválida): Redis probe falha — mock parcial via override
  it('[IT-H-02] GET /health retorna 503 quando Redis probe falha', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(RedisHealthProbe)
      .useValue({ ping: jest.fn().mockRejectedValue(new Error('Redis down')) })
      .compile();

    const appWithFail = module.createNestApplication();
    await appWithFail.init();

    const res = await request(appWithFail.getHttpServer()).get('/health');

    expect(res.status).toBe(503);
    expect(res.body.status).toBe('error');
    expect(res.body.redis).toBe('down');
    expect(res.body.postgres).toBe('up'); // Postgres ainda está up

    await appWithFail.close();
  });

  // Partição P2 — usabilidade: erro não expõe stack trace
  it('[IT-H-U02] resposta de erro contém status:"error" e não stack trace', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(RedisHealthProbe)
      .useValue({ ping: jest.fn().mockRejectedValue(new Error('Redis down')) })
      .compile();

    const appWithFail = module.createNestApplication();
    await appWithFail.init();

    const res = await request(appWithFail.getHttpServer()).get('/health');

    expect(res.body.status).toBe('error');
    expect(res.body).not.toHaveProperty('stack');
    expect(res.body).not.toHaveProperty('message');

    await appWithFail.close();
  });
});
