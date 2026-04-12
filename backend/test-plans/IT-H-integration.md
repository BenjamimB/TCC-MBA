# Plano de Testes de Integração — IT-H: Health Check com infraestrutura real

## Requisitos cobertos
- RNF-01: Disponibilidade 99,9% — health check é o mecanismo de sinalização de readiness

## Infraestrutura utilizada
- PostgreSQL: real (Docker — `tcc-mba-postgres-1:5432`)
- Redis: real (Docker — `tcc-mba-redis-1:6379`)
- Serviços externos: nenhum (health check não acessa AI nem WhatsApp)

---

## 1. Funcionalidade
> Corretude dos comportamentos com banco e Redis reais.

Relevante: SIM

### Partições de equivalência identificadas
| ID | Partição | Tipo | Comportamento esperado |
|----|----------|------|------------------------|
| P1 | PostgreSQL UP + Redis UP (reais) | válida | HTTP 200 `{ status:"ok", postgres:"up", redis:"up" }` |
| P2 | Redis probe retorna erro (mock parcial) | inválida | HTTP 503 `{ status:"error", redis:"down" }` |

TCP alvo: cobrir P1 e P2.

### Casos de teste
| ID | Descrição | Partição | Verifica |
|----|-----------|----------|---------|
| IT-H-01 | GET /health retorna 200 com infra real acessível | P1 | HTTP status + corpo JSON completo |
| IT-H-02 | GET /health retorna 503 quando Redis probe falha | P2 | HTTP status 503 + `redis:"down"` |

---

## 2. Confiabilidade
> Tolerância a falhas de dependência externa.

Relevante: SIM — é o propósito central do health check.

### Casos de teste
| ID | Descrição | Cenário | Tipo |
|----|-----------|---------|------|
| IT-H-01 (≡ funcionalidade) | Não lança exceção com infra real | probes reais respondem | integration |
| IT-H-02 (≡ funcionalidade) | Não lança exceção quando Redis falha | probe mockado lança Error | integration |

---

## 3. Performance
> Tempo de resposta do endpoint.

Relevante: NÃO — não há requisito explícito de latência para o health check na especificação.

---

## 4. Segurança
> Exposição de dados sensíveis na resposta.

Relevante: NÃO — health check é endpoint público por design (consumido pelo Railway e load balancers).

---

## 5. Manutenibilidade
> Isolamento de teste, fixtures, assertividade.

Relevante: SIM

### Rubrica de testabilidade
| Dimensão | Pontuação (0–25) | Observação |
|---|---|---|
| Isolamento de estado | 25 | Health check é stateless — sem necessidade de truncate |
| Fixtures reutilizáveis | 25 | `bootstrapApp()` de setup.ts usado sem overrides |
| Mocks de serviços externos | 25 | Nenhum serviço externo envolvido |
| Assertividade | 20 | Testes verificam HTTP status + todos os campos do corpo |
| **Total** | **95/100** | |

---

## 6. Usabilidade
> Clareza das mensagens retornadas.

Relevante: SIM — health check é consumido por operadores e ferramentas de monitoramento.

### Casos de teste
| ID | Descrição | Critério | Tipo |
|----|-----------|----------|------|
| IT-H-U01 | Resposta de sucesso contém campos status, postgres e redis | `res.body` tem os 3 campos | integration |
| IT-H-U02 | Resposta de erro contém `status:"error"` (não stack trace) | `res.body.status === "error"` | integration |

---

## Cobertura de quality characteristics
| Característica | Relevante | Com teste |
|---|---|---|
| Funcionalidade | ✓ | ✓ |
| Confiabilidade | ✓ | ✓ |
| Performance | N/A | — |
| Segurança | N/A | — |
| Manutenibilidade | ✓ | ✓ (estrutural) |
| Usabilidade | ✓ | ✓ |

**Cobertura = 4 ÷ 4 × 100% = 100%**
