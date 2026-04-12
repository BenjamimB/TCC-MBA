---
name: integration-test-loop
description: >
  Use this skill whenever the goal is to generate and execute integration test suites
  grounded in ISO 25010 quality characteristics for each suite defined in a test plan
  (test-plans/12.1-integration.md or equivalent), using requirements.md as the source
  of truth. Triggers when: the user asks to "run integration tests", "execute integration
  test suite", "test with real database", "test with real Redis", or any workflow that
  combines a test plan + real infrastructure + code-already-exists context.
  Key difference from quality-test-loop: code is already implemented — there is no
  implementation step. Infrastructure is real (PostgreSQL, Redis); only external services
  (AI, WhatsApp, email) are mocked.
---

# Integration Test Loop Skill

Gera e executa uma suíte de testes de integração orientada por **ISO 25010** para cada
suite definida no plano de integração, usando `requirements.md` como fonte de requisitos.

**Diferença fundamental em relação ao `quality-test-loop`:**
- O código de produção **já existe** — não há passo de implementação
- PostgreSQL e Redis são **reais** (Docker) — não são mockados
- Apenas serviços externos (AI, WhatsApp, e-mail) são mockados
- Testes rodam com `--runInBand` (sequencial) para evitar colisão no Redis compartilhado

---

## Arquivos esperados no projeto

| Arquivo | Papel |
|---|---|
| `requirements.md` | Requisitos funcionais e não-funcionais por feature |
| `test-plans/12.1-integration.md` | Plano de integração com as suites e casos de teste |
| `jest.config.ts` | Configuração base do Jest (já deve existir) |
| `test/integration/jest-integration.json` | Criado pela skill — config Jest para integração |
| `test/integration/setup.ts` | Criado pela skill — bootstrap NestApp + helpers |
| `metrics.jsonl` | Atualizado pela skill — log de métricas por suite |
| `test-plans/` | Atualizado pela skill — planos ISO 25010 por suite |

---

## Fluxo por suite

Para **cada suite** no plano de integração, execute os passos abaixo em ordem.

```
SUITE INICIADA
     │
     ▼
[PASSO 1] Ler requirements.md + plano de integração → extrair requisitos relevantes
     │
     ▼
[PASSO 2] Gerar plano de testes ISO 25010 → salvar em test-plans/<SUITE_ID>-integration.md
     │
     ▼
[PASSO 3] Configurar ambiente de integração → test/integration/setup.ts (se ainda não existe)
     │
     ▼
[PASSO 4] Gerar arquivo de testes Jest → test/integration/<suite>.integration.spec.ts
     │
     ▼
[PASSO 5] Verificar compilação → tsc --noEmit
     │
     ▼
[PASSO 6] Executar testes → npm run test:integration --runInBand
     │
     ▼
[PASSO 7] Coletar métricas → append em metrics.jsonl
     │
     ▼
SUITE CONCLUÍDA — próxima suite
```

---

## PASSO 1 — Leitura de requisitos

Abra `requirements.md` e `test-plans/12.1-integration.md`. Para a suite em execução, identifique:

- Qual módulo/feature ela cobre
- Quais requisitos funcionais se aplicam (regras de negócio, contratos HTTP)
- Quais requisitos não-funcionais se aplicam (performance, segurança, concorrência)
- Todos os **casos de teste já definidos** no plano de integração (base para os IDs)
- Se há bugs do `bug-report-*.md` mapeados nesta suite

Registre isso no cabeçalho do plano de testes.

---

## PASSO 2 — Plano de testes ISO 25010

Crie `test-plans/<SUITE_ID>-integration.md` seguindo exatamente esta estrutura.
Para cada característica, avalie se é **relevante** para a suite. Se não for, marque `N/A`.

```markdown
# Plano de Testes de Integração — <SUITE_ID>: <título da suite>

## Requisitos cobertos
- RF-XX: <descrição>
- RNF-XX: <descrição>

## Infraestrutura utilizada
- PostgreSQL: real (Docker)
- Redis: real (Docker)
- <Serviço externo>: mock (jest.fn())

---

## 1. Funcionalidade
> Corretude dos comportamentos com banco e Redis reais.

Relevante: SIM

### Partições de equivalência identificadas
| ID | Partição | Tipo | Comportamento esperado |
|----|----------|------|------------------------|
| P1 | <descrição> | válida | <resultado no banco/Redis> |
| P2 | <descrição> | inválida | <código de erro HTTP> |
| P3 | <boundary/constraint> | edge | <resultado esperado> |

TCP alvo: cobrir todas as partições acima.

### Casos de teste
| ID | Descrição | Partição | Verifica |
|----|-----------|----------|---------|
| IT-XX-01 | <descrição> | P1 | banco / Redis / HTTP status |

---

## 2. Confiabilidade
> Idempotência, tolerância a falhas, constraints de banco.

Relevante: SIM / NÃO — <justificativa>

### Casos de teste
| ID | Descrição | Cenário | Tipo |
|----|-----------|---------|------|
| IT-XX-R01 | <descrição> | <constraint/retry> | integration |

---

## 3. Performance
> Tempo de resposta medido com infraestrutura real.

Relevante: SIM / NÃO — <justificativa>

### Casos de teste
| ID | Descrição | Threshold | Medição |
|----|-----------|-----------|---------|
| IT-XX-P01 | <endpoint responde em < Xms> | <X>ms | `performance.now()` |

---

## 4. Segurança
> Autenticação real via JWT, autorização entre tenants, HMAC de webhooks.

Relevante: SIM / NÃO — <justificativa>

### Casos de teste
| ID | Descrição | Vetor | Tipo |
|----|-----------|-------|------|
| IT-XX-S01 | <descrição> | <vetor de ataque> | integration |

---

## 5. Manutenibilidade
> Isolamento de teste, limpeza de estado, fixtures reutilizáveis.

Relevante: SIM (sempre avaliar estruturalmente)

### Rubrica de testabilidade (preencher após execução)
| Dimensão | Pontuação (0–25) | Observação |
|---|---|---|
| Isolamento de estado | — | Truncate/rollback entre testes? |
| Fixtures reutilizáveis | — | Helpers compartilhados em setup.ts? |
| Mocks de serviços externos | — | AI/WhatsApp/email mockados corretamente? |
| Assertividade | — | Testes verificam banco/Redis além do HTTP? |
| **Total** | **/100** | |

---

## 6. Usabilidade
> Clareza das mensagens de erro retornadas via HTTP com dados reais.

Relevante: SIM / NÃO — <justificativa>

### Casos de teste
| ID | Descrição | Critério | Tipo |
|----|-----------|----------|------|
| IT-XX-U01 | <erro contém campo e código legível> | `res.body.code` | integration |

---

## Cobertura de quality characteristics
| Característica | Relevante | Com teste |
|---|---|---|
| Funcionalidade | ✓ | ✓ |
| Confiabilidade | ✓/N/A | ✓/✗ |
| Performance | ✓/N/A | ✓/✗ |
| Segurança | ✓/N/A | ✓/✗ |
| Manutenibilidade | ✓ | ✓ (estrutural) |
| Usabilidade | ✓/N/A | ✓/✗ |

**Cobertura = características com teste ÷ características relevantes × 100%**
```

---

## PASSO 3 — Configurar ambiente de integração

Crie `test/integration/setup.ts` **uma única vez**, reaproveitado por todas as suites.

### Estrutura obrigatória

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';

export let app: INestApplication;
export let prisma: PrismaService;

// Ordem respeita FKs
const TABLES_TO_TRUNCATE = [
  'waitlist_entry', 'appointment', 'message', 'conversation',
  'interaction_record', 'patient', 'availability',
  'oauth_account', 'professional',
];

export async function bootstrapApp(overrides: Record<string, unknown> = {}) {
  const builder = Test.createTestingModule({ imports: [AppModule] });

  // Substituir serviços externos por mocks
  Object.entries(overrides).forEach(([token, mock]) => {
    builder.overrideProvider(token).useValue(mock);
  });

  const module: TestingModule = await builder.compile();
  app = module.createNestApplication();
  await app.init();
  prisma = app.get(PrismaService);
}

export async function truncateAll() {
  for (const table of TABLES_TO_TRUNCATE) {
    await prisma.$executeRawUnsafe(
      `TRUNCATE "${table}" RESTART IDENTITY CASCADE`
    );
  }
}

export async function teardownApp() {
  await app.close();
}

// Fixture base — reutilizar em todas as suites que precisam de profissional autenticado
export async function createVerifiedProfessional(overrides = {}) {
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
```

### Configuração Jest para integração

Crie `test/integration/jest-integration.json`:

```json
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": "../..",
  "testEnvironment": "node",
  "testRegex": "test/integration/.*\\.integration\\.spec\\.ts$",
  "transform": { "^.+\\.(t|j)s$": "ts-jest" },
  "globalSetup": "<rootDir>/test/integration/global-setup.ts",
  "globalTeardown": "<rootDir>/test/integration/global-teardown.ts",
  "testTimeout": 30000,
  "runInBand": true
}
```

Adicione em `package.json` scripts:
```json
"test:integration": "jest --config ./test/integration/jest-integration.json --runInBand --forceExit"
```

---

## PASSO 4 — Geração dos testes Jest

Gere `test/integration/<suite>.integration.spec.ts` seguindo estas regras:

### Regras obrigatórias

1. **Cada caso de teste do plano tem exatamente um `it()` com ID no nome**:
   ```ts
   it('[IT-AV-01] PUT /schedule/availability persiste 7 dias no banco', async () => { ... })
   ```

2. **Partições de equivalência como comentário no teste**:
   ```ts
   // Partição P1 (válida): array completo de 7 dias
   it('[IT-AV-01] ...', async () => { ... })
   ```

3. **`beforeAll` bootstrap + mock de serviços externos**:
   ```ts
   beforeAll(async () => {
     await bootstrapApp({
       AI_GATEWAY: { complete: jest.fn().mockResolvedValue({ content: 'mock' }) },
       WHATSAPP_GATEWAY: { sendTextMessage: jest.fn().mockResolvedValue({ messageId: 'mock' }) },
     });
   });
   ```

4. **`afterEach` limpa banco e Redis**:
   ```ts
   afterEach(async () => {
     await truncateAll();
     await redisClient.flushdb(); // quando a suite usa Redis
   });
   ```

5. **`afterAll` encerra app**:
   ```ts
   afterAll(async () => await teardownApp());
   ```

6. **Testes verificam banco além do HTTP** — não confiar apenas no status code:
   ```ts
   it('[IT-AV-01] ...', async () => {
     const res = await request(app.getHttpServer())
       .put('/schedule/availability?professionalId=...')
       .set('Authorization', `Bearer ${token}`)
       .send({ configs: [...] });

     expect(res.status).toBe(200);

     // Verificar persistência real
     const rows = await prisma.availability.findMany({ where: { professionalId } });
     expect(rows).toHaveLength(7);
   });
   ```

7. **Testes de concorrência usam `Promise.all`**:
   ```ts
   it('[IT-SR-03] 10 reservas simultâneas — exatamente 1 confirmada', async () => {
     const results = await Promise.all(
       Array.from({ length: 10 }, (_, i) =>
         reservationService.reserve(slotId, `session-${i}`)
       )
     );
     const ok = results.filter(r => r.ok);
     const err = results.filter(r => !r.ok);
     expect(ok).toHaveLength(1);
     expect(err).toHaveLength(9);
   });
   ```

8. **Testes de performance usam `performance.now()`**:
   ```ts
   it('[IT-SC-04] cálculo de 90 dias responde em < 200ms', async () => {
     const start = performance.now();
     await request(app.getHttpServer()).get('/schedule/slots?...');
     expect(performance.now() - start).toBeLessThan(200);
   });
   ```

9. **Infraestrutura real, serviços externos sempre mockados**:
   ```ts
   // ✓ Permitido — infraestrutura real
   await prisma.professional.create({ ... });
   await redisClient.set('key', 'value');

   // ✓ Obrigatório — serviços externos mockados
   aiGateway.complete = jest.fn().mockResolvedValue({ content: 'triagem mock' });
   whatsAppGateway.sendTextMessage = jest.fn();

   // ✗ Proibido — nunca mockar banco ou Redis em integração
   jest.mock('../infra/prisma.service');
   ```

---

## PASSO 5 — Verificação de compilação

```bash
npx tsc --noEmit 2>&1 | tee .quality-loop/tsc_integration_<SUITE_ID>.txt
echo "TSC_EXIT=$?" >> .quality-loop/tsc_integration_<SUITE_ID>.txt
```

- Se falhar: registre `compilation: "fail"` nas métricas. Corrija erros de tipo antes de executar.
- Se passar: registre `compilation: "pass"` e continue.

---

## PASSO 6 — Execução dos testes

```bash
npm run test:integration -- \
  --testPathPattern="<suite>.integration.spec.ts" \
  2>&1 | tee .quality-loop/jest_integration_<SUITE_ID>.txt
```

Extraia cobertura após execução:

```bash
node -e "
  const s = require('./coverage/coverage-summary.json').total;
  console.log(JSON.stringify({
    lines: s.lines.pct,
    branches: s.branches.pct,
    statements: s.statements.pct
  }));
"
```

**Nota:** testes de integração rodam mais lentos que unitários — timeout padrão de 30s por teste. Se um teste de concorrência falhar por timeout, investigue deadlock no Redis antes de aumentar o timeout.

---

## PASSO 7 — Coleta de métricas

Append em `metrics.jsonl`:

```json
{
  "task_id": "IT-<SUITE_ID>",
  "task_title": "<título da suite>",
  "timestamp": "<ISO 8601>",
  "test_type": "integration",
  "infrastructure": {
    "postgres": "real",
    "redis": "real",
    "ai_gateway": "mock",
    "whatsapp_gateway": "mock",
    "email": "mock"
  },
  "compilation": "pass|fail",
  "pass_at_1": true,
  "iterations_to_pass": 1,
  "line_coverage": null,
  "branch_coverage": null,
  "tcp": 80.0,
  "tpp": 100.0,
  "quality_characteristics_coverage": 66.7,
  "testability": {
    "state_isolation": 25,
    "reusable_fixtures": 20,
    "external_service_mocks": 25,
    "assertiveness": 20,
    "total": 90
  },
  "characteristics": {
    "funcionalidade": { "relevant": true, "tested": true },
    "confiabilidade": { "relevant": true, "tested": true },
    "performance":    { "relevant": false, "tested": false },
    "seguranca":      { "relevant": true, "tested": true },
    "manutenibilidade": { "relevant": true, "tested": true },
    "usabilidade":    { "relevant": false, "tested": false }
  },
  "bugs_detected": ["BUG-01", "BUG-02a"]
}
```

### Como calcular cada métrica

Mesmas fórmulas do `quality-test-loop`, com uma adição:

**Testability score** — 4 dimensões adaptadas para integração:
- **Isolamento de estado** (0–25): truncate/rollback entre testes isola completamente?
- **Fixtures reutilizáveis** (0–25): helpers em `setup.ts` evitam repetição?
- **Mocks de serviços externos** (0–25): AI/WhatsApp/e-mail nunca acessados de verdade?
- **Assertividade** (0–25): testes verificam banco/Redis além do status HTTP?

**`bugs_detected`**: lista de IDs do `bug-report-*.md` que este teste detectaria se executado antes do teste manual.

---

## Estrutura de diretórios criada pela skill

```
projeto/
├── metrics.jsonl                          ← atualizado com entradas de integração
├── test-plans/
│   ├── 12.1-integration.md               ← plano mestre (pré-existente)
│   ├── IT-H-integration.md               ← plano ISO 25010 por suite
│   ├── IT-A-integration.md
│   └── ...
├── test/
│   └── integration/
│       ├── jest-integration.json         ← config Jest para integração
│       ├── setup.ts                      ← bootstrap + fixtures compartilhadas
│       ├── global-setup.ts               ← verifica Docker antes de rodar
│       ├── global-teardown.ts            ← encerra conexões globais
│       ├── health.integration.spec.ts
│       ├── auth.integration.spec.ts
│       ├── availability.integration.spec.ts
│       ├── slot-calculation.integration.spec.ts
│       ├── patient.integration.spec.ts
│       ├── whatsapp-gateway.integration.spec.ts
│       ├── booking.integration.spec.ts
│       ├── slot-reservation.integration.spec.ts
│       ├── waitlist.integration.spec.ts
│       └── conversation.integration.spec.ts
└── .quality-loop/
    ├── tsc_integration_IT-H.txt
    ├── jest_integration_IT-H.txt
    └── ...
```

---

## Checklist por suite

Antes de marcar uma suite como concluída:

- [ ] `test-plans/<SUITE_ID>-integration.md` criado com todas as 6 características avaliadas
- [ ] Partições de equivalência listadas incluindo constraints de banco e comportamento Redis
- [ ] `test/integration/setup.ts` existe com `truncateAll()` e `bootstrapApp()`
- [ ] Arquivo `.integration.spec.ts` gerado com IDs de IT-XX nos nomes dos testes
- [ ] Testes verificam estado no banco/Redis além do status HTTP
- [ ] Serviços externos (AI, WhatsApp, e-mail) mockados via `overrides` no `bootstrapApp()`
- [ ] `tsc --noEmit` passou sem erros
- [ ] `npm run test:integration --runInBand` passou
- [ ] `metrics.jsonl` atualizado com campo `test_type: "integration"` e `bugs_detected`
- [ ] Testability score preenchido com as 4 dimensões de integração
