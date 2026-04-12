/**
 * Suite IT-CO — Conversation / ConversationOrchestrator
 * Tasks: 6.3, 6.4
 *
 * NOTA ARQUITETURAL (2026-04-12):
 * ConversationModule está vazio (@Module({})) — ConversationOrchestrator,
 * AITriageService e WaitlistService não estão registrados no DI container.
 * Não há controller HTTP para o fluxo de conversação na V1.
 *
 * Esta suite documenta a lacuna de cobertura e faz a verificação mínima
 * de que o módulo carrega sem erro (smoke test).
 *
 * Os casos IT-CO-01 a IT-CO-06 do plano de testes serão implementados
 * quando o ConversationModule for completado (V2).
 */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/infra/prisma.service';
import { RedisService } from '../../src/infra/redis.service';

let app: INestApplication;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = module.createNestApplication();
  await app.init();
});

afterAll(async () => { await app.close(); });

// ---------------------------------------------------------------------------

describe('IT-CO — Conversation (smoke + infra)', () => {

  // Smoke test: aplicação inicializa com ConversationModule vazio
  it('[IT-CO-SMOKE-01] AppModule inicia sem erro mesmo com ConversationModule vazio', () => {
    expect(app).toBeDefined();
  });

  // Infra: serviços de infraestrutura necessários para conversação estão disponíveis
  it('[IT-CO-SMOKE-02] PrismaService está acessível via DI', () => {
    const prisma = app.get(PrismaService);
    expect(prisma).toBeDefined();
  });

  it('[IT-CO-SMOKE-03] RedisService está acessível via DI', () => {
    const redis = app.get(RedisService);
    expect(redis).toBeDefined();
    expect(redis.client).toBeDefined();
  });

  // Documentação da lacuna
  it('[IT-CO-GAP] ConversationOrchestrator NÃO está no DI container (ConversationModule vazio)', () => {
    expect(() => {
      // O módulo Nest lança ou retorna undefined para providers não registrados
      try {
        app.get('ConversationOrchestrator');
        // Se não lançar, o provider existe — improvável dado o módulo vazio
      } catch {
        // Esperado: NotFoundException ou similar
      }
    }).not.toThrow();

    // Confirma que o módulo não expõe o serviço
    const moduleRef = (app as any).applicationContext;
    // A verificação mais confiável é tentar obter e verificar null/undefined
    let orchestrator: unknown;
    try {
      orchestrator = app.get('ConversationOrchestrator', { strict: false });
    } catch {
      orchestrator = undefined;
    }
    // O serviço não deveria ser encontrado — registrar que a lacuna existe
    expect(orchestrator).toBeUndefined();
  });
});
