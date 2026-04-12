# Bug Report — Erros de Runtime Encontrados em Teste Manual (2026-04-12)

## Contexto

Teste manual realizado na interface web do projeto **Próxima Consulta** após subida dos servidores de desenvolvimento (frontend: Next.js porta 3000, backend: NestJS porta 3001). Usuário autenticado com credenciais de teste (`teste@proxima.com`).

---

## BUG-01 — "Erro ao carregar agenda" no Dashboard

### Sintoma
Ao acessar `/dashboard`, a mensagem de erro `"Erro ao carregar agenda. Tente recarregar a página."` é exibida imediatamente após o login.

### Causa raiz — Incompatibilidade de contrato HTTP

O frontend chama:
```
GET /schedule/{professionalId}/appointments/week?weekStart=YYYY-MM-DD
```

O backend expõe:
```
GET /appointments/week?professionalId=...&weekStart=...
```

Dois desalinhamentos simultâneos:
1. **Controller errado**: o frontend aponta para `ScheduleController` (`/schedule/...`) mas o endpoint de agenda está em `BookingController` (`/appointments/...`)
2. **professionalId como path param** no frontend vs. **query param** no backend

**Arquivo frontend:** `frontend/app/lib/schedule-api.ts:51-59`
```ts
// frontend envia:
GET /schedule/${professionalId}/appointments/week?weekStart=...

// backend espera:
GET /appointments/week?professionalId=...&weekStart=...
```

**Arquivo backend:** `backend/src/booking/booking.controller.ts:24-28`

### Por que os testes não impediram este erro

| Camada | O que foi testado | O que não foi testado |
|--------|-------------------|-----------------------|
| Frontend (`schedule-api.spec.ts`) | Lógica de transformação de dados e validação | A URL real construída na chamada HTTP |
| Backend (`booking.service.spec.ts`) | Regras de negócio do serviço | O mapeamento de rota no controller |
| Testes E2E | **Não implementados** (Task 12.3) | Fluxo completo frontend → backend |
| Testes de contrato | **Não implementados** | Compatibilidade de URL/payload entre as partes |

O problema é um **gap de contrato**: frontend e backend foram desenvolvidos independentemente sem um artefato compartilhado (ex: OpenAPI spec, Pact) que force ambos a concordar com a mesma URL e estrutura de parâmetros.

---

## BUG-02 — "Erro ao salvar disponibilidade" na tela de Configuração

### Sintoma
Ao clicar em "Salvar disponibilidade" em `/schedule`, a mensagem `"Erro ao salvar. Tente novamente."` é exibida.

### Causa raiz — Dois desalinhamentos simultâneos

#### 2a. Rota com path param vs. query param
O frontend chama:
```
PUT /schedule/{professionalId}/availability
```
O backend expõe:
```
PUT /schedule/availability?professionalId=...
```
**Arquivo frontend:** `frontend/app/lib/schedule-api.ts:81-84`
**Arquivo backend:** `backend/src/schedule/schedule.controller.ts:19-26`

#### 2b. Shape do body incompatível
O frontend envia o array diretamente no body:
```json
[{ "dayOfWeek": 0, "startTime": "08:00", ... }]
```
O backend espera o array encapsulado na propriedade `configs`:
```json
{ "configs": [{ "dayOfWeek": 0, "startTime": "08:00", ... }] }
```
**Arquivo backend:** `backend/src/schedule/schedule.controller.ts:22`
```ts
@Body() body: { configs: Parameters<AvailabilityService['updateConfig']>[1] }
```

O mesmo desalinhamento de path param vs. query param ocorre no `GET /schedule/availability` chamado ao carregar a tela:
```
Frontend: GET /schedule/{professionalId}/availability
Backend:  GET /schedule/availability?professionalId=...
```

### Por que os testes não impediram este erro

| Camada | O que foi testado | O que não foi testado |
|--------|-------------------|-----------------------|
| Frontend (`availability-validation.spec.ts`) | Validação client-side dos campos | URL, método HTTP e shape do body |
| Backend (`availability.service.spec.ts`) | Regras de negócio (horários, duração) | Desserialização do body no controller |
| Testes de integração | **Não implementados** (Task 12.1) | Ciclo real de save/load via HTTP |
| Testes de contrato | **Não implementados** | Compatibilidade de schema de request/response |

A ausência de um **DTO tipado compartilhado** entre frontend e backend (ex: gerado a partir de uma OpenAPI spec) permite que os shapes evoluam de forma desacoplada sem falha detectável.

---

## Resumo

| Bug | Localização | Tipo | Causa raiz |
|-----|-------------|------|------------|
| BUG-01 | `schedule-api.ts:51` + `booking.controller.ts:24` | Contrato HTTP | URL e controller errados no frontend |
| BUG-02a | `schedule-api.ts:81` + `schedule.controller.ts:19` | Contrato HTTP | Path param no frontend vs. query param no backend |
| BUG-02b | `schedule-api.ts:82` + `schedule.controller.ts:22` | Contrato HTTP | Body shape incompatível (array vs. `{ configs: array }`) |

## Lacunas de teste identificadas

1. **Sem testes de contrato** — nada verifica que as URLs, métodos, params e shapes de request/response acordam entre frontend e backend
2. **Sem testes E2E** — Task 12.3 não foi implementada; um teste E2E teria capturado todos os três bugs num único fluxo
3. **Sem testes de integração de controller** — os testes de backend mockam a camada de serviço e não exercitam o binding de rotas, query params e body deserialization
4. **Testes de frontend mockam axios** — `schedule-api.spec.ts` testa a lógica de chamada mas não a URL construída, então uma mudança de contrato passa silenciosamente
