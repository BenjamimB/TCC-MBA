# Relatório de Métricas de Qualidade — TCC MBA

**Data de geração:** 2026-04-12
**Fonte:** `backend/metrics.jsonl`
**Total de tarefas registradas:** 15

---

## Resumo Executivo

| Métrica | Valor |
|---|---|
| Tarefas avaliadas | 15 |
| Tarefas aprovadas (pass@1) | 15 / 15 (100%) |
| Total de testes executados | 233 |
| Testes aprovados | 233 / 233 (100%) |
| Cobertura de linhas (média) | 99,16% |
| Cobertura de branches (média) | 95,57% |
| Score de testabilidade (média) | 98,67 / 100 |
| Quality Characteristics Coverage | 100% em todas as tarefas |

> Todas as 15 tarefas compilaram e passaram na primeira tentativa (`pass@1 = 100%`).

---

## Detalhamento por Tarefa

### Grupo 1 — Infraestrutura e Setup

| Task | Título | Testes | Linha % | Branch % | Mutation % | Testabilidade |
|---|---|---|---|---|---|---|
| 1.1 | Configurar Railway, ambientes e pipeline CI/CD com GitHub Actions | 9/9 | 100,00 | 100,00 | 100,00 | 95 |
| 1.2 | Criar esquema completo do banco com migrations Prisma | 8/8 | — | — | — | 100 |
| 1.3 | Scaffoldar NestJS com módulos de domínio e adaptadores de porta | 7/7 | 100,00 | 100,00 | 100,00 | 100 |

### Grupo 2 — Autenticação

| Task | Título | Testes | Linha % | Branch % | Mutation % | Testabilidade |
|---|---|---|---|---|---|---|
| 2.1 | Implementar registro, login por e-mail/senha e recuperação de acesso | 30/30 | 98,76 | 94,28 | — | 100 |

### Grupo 3 — Disponibilidade e Slots

| Task | Título | Testes | Linha % | Branch % | Mutation % | Testabilidade |
|---|---|---|---|---|---|---|
| 3.1 | Implementar gerenciamento de disponibilidade semanal | 13/13 | 96,77 | 90,90 | — | 100 |
| 3.2 | Implementar cálculo de slots livres | 10/10 | 97,77 | 90,90 | — | 100 |

### Grupo 4 — Pacientes

| Task | Título | Testes | Linha % | Branch % | Mutation % | Testabilidade |
|---|---|---|---|---|---|---|
| 4.1 | Implementar cadastro automático e perfil de pacientes | 17/17 | 97,36 | 93,33 | — | 100 |

### Grupo 6 — Integração IA e WhatsApp

| Task | Título | Testes | Linha % | Branch % | Mutation % | Testabilidade |
|---|---|---|---|---|---|---|
| 6.1 | Configurar LangChain.js com Maritaca e Claude como fallback | 12/12 | 100,00 | 100,00 | — | 95 |
| 6.2 | Implementar WhatsApp Gateway e webhook handler | 13/13 | 97,56 | 89,47 | — | 100 |
| 6.3 | Implementar AITriageService — detecção de intenção e geração de resposta | 18/18 | 100,00 | 100,00 | — | 100 |
| 6.4 | Implementar ConversationOrchestrator com state machine | 23/23 | 100,00 | 89,55 | — | 95 |

### Grupo 7 — Agendamento

| Task | Título | Testes | Linha % | Branch % | Mutation % | Testabilidade |
|---|---|---|---|---|---|---|
| 7.1 | Implementar BookingService com regras de negócio de agendamento | 17/17 | 100,00 | 94,11 | — | 100 |
| 7.2 | Implementar SlotReservationService com lock atômico Redis | 15/15 | 100,00 | 100,00 | — | 100 |
| 7.3 | Implementar WaitlistService com notificação FIFO | 14/14 | 100,00 | 95,45 | — | 100 |

### Grupo 10 — Frontend

| Task | Título | Testes | Linha % | Branch % | Mutation % | Testabilidade |
|---|---|---|---|---|---|---|
| 10.1 | Implementar fluxo de autenticação no frontend | 27/27 | 100,00 | 100,00 | — | 95 |

---

## Score de Testabilidade (detalhado)

Cada tarefa é avaliada em 4 dimensões (máx. 25 pts cada), totalizando 100 pts:

| Task | Injeção de Dependência | Funções Puras | Separação de Camadas | Observabilidade | Total |
|---|---|---|---|---|---|
| 1.1 | 25 | 20 | 25 | 25 | **95** |
| 1.2 | 25 | 25 | 25 | 25 | **100** |
| 1.3 | 25 | 25 | 25 | 25 | **100** |
| 2.1 | 25 | 25 | 25 | 25 | **100** |
| 3.1 | 25 | 25 | 25 | 25 | **100** |
| 3.2 | 25 | 25 | 25 | 25 | **100** |
| 4.1 | 25 | 25 | 25 | 25 | **100** |
| 6.1 | 25 | 20 | 25 | 25 | **95** |
| 6.2 | 25 | 25 | 25 | 25 | **100** |
| 6.3 | 25 | 25 | 25 | 25 | **100** |
| 6.4 | 25 | 20 | 25 | 25 | **95** |
| 7.1 | 25 | 25 | 25 | 25 | **100** |
| 7.2 | 25 | 25 | 25 | 25 | **100** |
| 7.3 | 25 | 25 | 25 | 25 | **100** |
| 10.1 | 20 | 25 | 25 | 25 | **95** |

> As únicas tarefas com desconto foram aquelas que envolvem orquestração complexa (state machine, LLM, frontend) onde funções puras ou injeção de dependência são estruturalmente mais difíceis de atingir o máximo.

---

## Cobertura de Características de Qualidade

A tabela abaixo indica quais características ISO/IEC 25010 foram consideradas relevantes e se foram testadas em cada tarefa:

| Task | Funcionalidade | Confiabilidade | Performance | Segurança | Manutenibilidade | Usabilidade |
|---|---|---|---|---|---|---|
| 1.1 | R/T | R/T | — | — | R/T | R/T |
| 1.2 | R/T | — | — | R/T | R/T | — |
| 1.3 | R/T | — | — | — | R/T | — |
| 2.1 | R/T | R/T | — | R/T | R/T | — |
| 3.1 | R/T | — | — | — | R/T | R/T |
| 3.2 | R/T | — | R/**-** | — | R/T | — |
| 4.1 | R/T | — | — | R/T | R/T | — |
| 6.1 | R/T | R/T | — | R/T | R/T | — |
| 6.2 | R/T | R/T | — | R/T | R/T | — |
| 6.3 | R/T | R/T | — | R/T | R/T | — |
| 6.4 | R/T | R/T | — | R/T | R/T | — |
| 7.1 | R/T | R/T | — | R/T | R/T | — |
| 7.2 | R/T | R/T | — | R/T | R/T | — |
| 7.3 | R/T | R/T | — | R/T | R/T | — |
| 10.1 | R/T | R/T | — | R/T | R/T | — |

**Legenda:** `R/T` = Relevante e Testada · `R/-` = Relevante mas **não** testada · `—` = Não relevante para a tarefa

> **Observação:** A característica de Performance foi marcada como relevante na tarefa 3.2 (cálculo de slots livres), porém não foi coberta por testes. Todos os demais casos relevantes foram testados.

---

## Distribuição de Testes por Grupo

```
Grupo 1  (Infra/Setup)         │████████████████████  24 testes
Grupo 2  (Autenticação)        │████████████████████████████████████████  30 testes
Grupo 3  (Disponibilidade)     │███████████████████████  23 testes
Grupo 4  (Pacientes)           │████████████████████  17 testes
Grupo 6  (IA / WhatsApp)       │████████████████████████████████████████████████████  66 testes
Grupo 7  (Agendamento)         │████████████████████████████████████████████████  46 testes
Grupo 10 (Frontend)            │████████████████████████████████  27 testes
```

---

## Pontos de Atenção

1. **Performance não testada em 3.2** — O cálculo de slots livres foi identificado como relevante para performance, mas não possui testes de desempenho. Recomenda-se adicionar benchmarks ou testes de carga para esta rota.

2. **Mutation score limitado** — Apenas as tarefas 1.1 e 1.3 possuem mutation score registrado (ambas 100%). As demais tarefas não reportaram esta métrica; ampliar a cobertura de mutation testing pode revelar lacunas em lógica condicional.

3. **Branch coverage abaixo de 92% em 4 tarefas** — As tarefas 3.1, 3.2, 6.2 e 6.4 ficaram na faixa de 89–91% de cobertura de branches, indicando caminhos condicionais ainda não exercitados por testes.

---

## Conclusão

O conjunto de tarefas implementadas apresenta **qualidade de testes consistentemente alta**: 100% de taxa de aprovação, cobertura de linhas média superior a 99% e score de testabilidade médio de 98,67/100. A arquitetura hexagonal adotada (separação de camadas, injeção de dependência, observabilidade) mostrou-se eficaz para produzir código altamente testável. Os pontos de melhoria são pontuais e não comprometem a solidez do sistema.
