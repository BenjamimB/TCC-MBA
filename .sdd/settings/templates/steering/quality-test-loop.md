---
name: quality-test-loop
description: >
  Use this skill whenever the goal is to generate and execute a test suite grounded in
  ISO 25010 quality characteristics for each task in a tasks.md file, using requirements.md
  as the source of truth. Triggers when: the user asks to "run tests per task", "generate
  tests based on requirements", "apply quality characteristics to tasks", "test each story
  with ISO 25010", or any workflow that combines a requirements file + task list + test
  execution. Always use this skill when the Ralph Loop is active and test generation must
  precede implementation for each task.
---

# Quality Test Loop Skill

Gera e executa uma suíte de testes orientada por **ISO 25010** para cada task do arquivo
`tasks.md`, usando `requirements.md` como fonte de requisitos. Integra-se ao Ralph Loop:
os testes são criados **antes** da implementação de cada task e executados após, coletando
métricas automaticamente.

---

## Arquivos esperados no projeto

| Arquivo | Papel |
|---|---|
| `requirements.md` | Requisitos funcionais e não-funcionais por feature |
| `tasks.md` | Lista de tasks com ID, descrição e critérios de aceite |
| `jest.config.ts` | Configuração do Jest (já deve existir) |
| `metrics.jsonl` | Criado pela skill — log de métricas por task |
| `test-plans/` | Criado pela skill — planos de teste por task |

---

## Fluxo por task

Para **cada task** em `tasks.md`, execute os passos abaixo em ordem. Não pule etapas.

```
TASK INICIADA
     │
     ▼
[PASSO 1] Ler requirements.md → extrair requisitos relevantes para a task
     │
     ▼
[PASSO 2] Gerar plano de testes ISO 25010 → salvar em test-plans/<TASK_ID>.md
     │
     ▼
[PASSO 3] Gerar arquivo de testes Jest → src/**/<feature>.test.ts
     │
     ▼
[PASSO 4] Verificar compilação → tsc --noEmit
     │
     ▼
[PASSO 5] Implementar a task (código de produção)
     │
     ▼
[PASSO 6] Executar testes → npm run test:ci
     │
     ▼
[PASSO 7] Coletar métricas → append em metrics.jsonl
     │
     ▼
TASK CONCLUÍDA — próxima task
```

---

## PASSO 1 — Leitura de requisitos

Abra `requirements.md` e `tasks.md`. Para a task em execução, identifique:

- Qual feature ou módulo ela pertence
- Quais requisitos funcionais se aplicam (entradas, saídas, regras de negócio)
- Quais requisitos não-funcionais se aplicam (tempo de resposta, autenticação, etc.)
- Todas as **regras de negócio** com domínios de valores definidos (base para partições)

Registre isso no cabeçalho do plano de testes.

---

## PASSO 2 — Plano de testes ISO 25010

Crie o arquivo `test-plans/<TASK_ID>.md` com a estrutura abaixo.

Para cada uma das 6 características, avalie se ela é **relevante** para a task.
Se não for relevante, marque como `N/A` com justificativa. Se for relevante, liste
os casos de teste derivados.

```markdown
# Plano de Testes — <TASK_ID>: <título da task>

## Requisitos cobertos
- RF-XX: <descrição>
- RNF-XX: <descrição>

---

## 1. Funcionalidade
> Corretude dos comportamentos especificados nos requisitos.

Relevante: SIM

### Partições de equivalência identificadas
| ID | Partição | Tipo | Comportamento esperado |
|----|----------|------|------------------------|
| P1 | <descrição> | válida | <resultado> |
| P2 | <descrição> | inválida | <resultado> |
| P3 | <boundary> | edge | <resultado> |

TCP alvo: cobrir todas as partições acima.

### Casos de teste
| ID | Descrição | Partição | Tipo Jest |
|----|-----------|----------|-----------|
| TC-F-01 | <descrição> | P1 | unit |
| TC-F-02 | <descrição> | P2 | unit |
| TC-F-03 | <descrição> | P3 | integration |

---

## 2. Confiabilidade
> Comportamento sob falha, recuperação, tolerância a erros.

Relevante: SIM / NÃO — <justificativa>

### Casos de teste
| ID | Descrição | Cenário de falha | Tipo Jest |
|----|-----------|------------------|-----------|
| TC-R-01 | <descrição> | <falha simulada> | unit/integration |

---

## 3. Performance
> Tempo de resposta, throughput, uso de recursos.

Relevante: SIM / NÃO — <justificativa>

### Casos de teste
| ID | Descrição | Threshold | Tipo Jest |
|----|-----------|-----------|-----------|
| TC-P-01 | <endpoint responde em < Xms> | <X>ms | integration |

---

## 4. Segurança
> Autenticação, autorização, exposição de dados sensíveis, validação de entrada.

Relevante: SIM / NÃO — <justificativa>

### Casos de teste
| ID | Descrição | Vetor | Tipo Jest |
|----|-----------|-------|-----------|
| TC-S-01 | <descrição> | <vetor de ataque> | unit/integration |

---

## 5. Manutenibilidade
> Separação de camadas, injeção de dependência, funções puras, observabilidade.

Relevante: SIM (sempre avaliar estruturalmente)

### Rubrica de testabilidade (preencher após implementação)
| Dimensão | Pontuação (0–25) | Observação |
|---|---|---|
| Injeção de dependência | — | Dependências no construtor? |
| Funções puras | — | Proporção sem side effects? |
| Separação de camadas | — | Service importa infra diretamente? |
| Observabilidade | — | Funções retornam valores testáveis? |
| **Total** | **/100** | |

---

## 6. Usabilidade
> Clareza das mensagens de erro, feedback ao usuário, formato das respostas.

Relevante: SIM / NÃO — <justificativa>

### Casos de teste
| ID | Descrição | Critério | Tipo Jest |
|----|-----------|----------|-----------|
| TC-U-01 | <mensagem de erro contém X> | <string esperada> | unit |

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

## PASSO 3 — Geração dos testes Jest

Com base no plano, gere o arquivo `src/<módulo>/<feature>.test.ts`.

### Regras obrigatórias

1. **Cada caso de teste do plano deve ter exatamente um `it()` correspondente**, com o ID no nome:
   ```ts
   it("[TC-F-01] deve criar agendamento em horário válido", () => { ... })
   ```

2. **Partições de equivalência devem aparecer como comentário** no teste:
   ```ts
   // Partição P1 (válida): horário dentro do expediente
   it("[TC-F-01] deve criar agendamento às 10:00 numa segunda", () => { ... })
   ```

3. **Testes de funcionalidade** usam Jest puro (unit) ou Supertest (integration).

4. **Testes de performance** usam `Date.now()` ou `performance.now()`:
   ```ts
   it("[TC-P-01] POST /agendamentos responde em menos de 200ms", async () => {
     const start = performance.now()
     await request(app).post("/agendamentos").send(payload)
     expect(performance.now() - start).toBeLessThan(200)
   })
   ```

5. **Testes de segurança** simulam inputs maliciosos e ausência de auth:
   ```ts
   it("[TC-S-01] rejeita requisição sem token JWT", async () => {
     const res = await request(app).post("/agendamentos").send(payload)
     expect(res.status).toBe(401)
   })
   ```

6. **Testes de usabilidade** verificam formato e conteúdo das mensagens:
   ```ts
   it("[TC-U-01] erro de horário inválido contém mensagem legível", async () => {
     const res = await request(app).post("/agendamentos").send(invalidPayload)
     expect(res.body.message).toMatch(/horário fora do expediente/)
   })
   ```

7. **Mocks de infraestrutura são obrigatórios** — nunca acesse banco real em testes unitários:
   ```ts
   jest.mock("../infra/supabase.client")
   ```

---

## PASSO 4 — Verificação de compilação

```bash
npx tsc --noEmit 2>&1 | tee .quality-loop/tsc_<TASK_ID>.txt
echo "TSC_EXIT=$?" >> .quality-loop/tsc_<TASK_ID>.txt
```

- Se falhar: registre `compilation: "fail"` nas métricas e **não prossiga para o Passo 5**.
  Corrija os erros de tipo antes de implementar.
- Se passar: registre `compilation: "pass"` e continue.

---

## PASSO 5 — Implementação

Implemente o código de produção da task. Durante a implementação, respeite as
4 dimensões de testabilidade avaliadas no plano:

- **Injeção de dependência**: passe dependências externas (Supabase, HTTP, WhatsApp) pelo construtor ou parâmetro, nunca instancie dentro da função.
- **Funções puras**: separe lógica de negócio (pura) de efeitos colaterais (infra).
- **Separação de camadas**: Services não devem importar diretamente clientes de banco ou HTTP.
- **Observabilidade**: funções devem retornar valores testáveis, não apenas executar side effects.

---

## PASSO 6 — Execução dos testes

```bash
npm run test:ci -- --testPathPattern="<feature>.test.ts" 2>&1 | tee .quality-loop/jest_<TASK_ID>.txt
```

Após os testes passarem, extraia do `coverage/coverage-summary.json`:

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

---

## PASSO 7 — Coleta de métricas

Ao final de cada task, append em `metrics.jsonl`:

```json
{
  "task_id": "US-01",
  "task_title": "<título>",
  "timestamp": "<ISO 8601>",
  "compilation": "pass|fail",
  "pass_at_1": true,
  "iterations_to_pass": 1,
  "line_coverage": 87.5,
  "branch_coverage": 72.3,
  "mutation_score": null,
  "tcp": 80.0,
  "tpp": 100.0,
  "quality_characteristics_coverage": 66.7,
  "testability": {
    "dependency_injection": 25,
    "pure_functions": 20,
    "layer_separation": 25,
    "observability": 15,
    "total": 85
  },
  "characteristics": {
    "funcionalidade": { "relevant": true, "tested": true },
    "confiabilidade": { "relevant": true, "tested": false },
    "performance":    { "relevant": true, "tested": true },
    "seguranca":      { "relevant": true, "tested": true },
    "manutenibilidade": { "relevant": true, "tested": true },
    "usabilidade":    { "relevant": false, "tested": false }
  }
}
```

### Como calcular cada métrica

**pass@1**: `true` se os testes passaram na primeira execução do Jest sem nenhuma
correção de código de produção após o Passo 5.

**TCP (Taxa de Cobertura de Partições)**:
```
TCP = partições com pelo menos 1 teste ÷ total de partições identificadas × 100
```

**TPP (Taxa de Precisão das Partições)**:
```
TPP = partições aceitas como válidas ÷ partições geradas pelo LLM × 100
```
*Uma partição é "aceita" se ela representa uma classe real e distinta de comportamento.*

**Quality Characteristics Coverage**:
```
QCC = características com teste ÷ características relevantes para a task × 100
```

**Testability score**: soma das 4 dimensões (máximo 100).

---

## Mutation score (por story, fora do loop principal)

Stryker é lento — execute apenas ao final de cada story completa, não a cada iteração:

```bash
npx stryker run --mutate "src/<módulo>/<feature>.ts"
```

Atualize o campo `mutation_score` no registro da task em `metrics.jsonl`.

Para instalar:
```bash
npm install --save-dev @stryker-mutator/core @stryker-mutator/jest-runner
```

Configuração mínima em `stryker.config.json`:
```json
{
  "testRunner": "jest",
  "reporters": ["json"],
  "coverageAnalysis": "perTest",
  "mutate": ["src/**/*.ts", "!src/**/*.test.ts"]
}
```

---

## Estrutura de diretórios criada pela skill

```
projeto/
├── requirements.md          ← lido pela skill
├── tasks.md                 ← lido pela skill
├── metrics.jsonl            ← criado e atualizado pela skill
├── test-plans/
│   ├── US-01.md             ← plano ISO 25010 por task
│   ├── US-02.md
│   └── ...
├── .quality-loop/           ← logs brutos por task
│   ├── tsc_US-01.txt
│   ├── jest_US-01.txt
│   └── ...
└── src/
    └── <módulo>/
        ├── <feature>.ts
        └── <feature>.test.ts
```

---

## Referência rápida de comandos

```bash
# Compilação
npx tsc --noEmit

# Testes com cobertura
npm run test:ci

# Mutation score (pós-story)
npx stryker run

# Extrair cobertura do JSON
node -e "const s=require('./coverage/coverage-summary.json').total; console.log(s.lines.pct, s.branches.pct)"
```

---

## Checklist por task

Antes de marcar uma task como `passes: true` no `tasks.md`:

- [ ] `test-plans/<TASK_ID>.md` criado com todas as 6 características avaliadas
- [ ] Partições de equivalência listadas para cada regra de negócio
- [ ] Arquivo `.test.ts` gerado com IDs de TC nos nomes dos testes
- [ ] `tsc --noEmit` passou sem erros
- [ ] `npm run test:ci` passou com line coverage ≥ 80% e branch coverage ≥ 75%
- [ ] `metrics.jsonl` atualizado com todas as métricas da task
- [ ] Testability score preenchido após inspeção do código implementado
