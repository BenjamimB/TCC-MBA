# Plano de Implementação — Próxima Consulta

## Versões

| Versão | Escopo | Status |
|--------|--------|--------|
| **V1 — Protótipo** | Tasks 1, 2.1, 3, 4.1, 6, 7, 10.1–10.3 | **Implementar agora** |
| **V2 — Produto completo** | Tasks 2.2–2.4, 4.2–4.3, 5, 8, 9, 10.4–10.5, 11, 12 | Não executar até ser explicitamente solicitado |

> **Apenas a V1 será implementada nesta fase.** Tasks e subtasks marcadas com `[V2]` não devem ser executadas até solicitação explícita.

---

## 1. `[V1]` Fundação — Infraestrutura, esquema e estrutura base

- [x] 1.1 `[V1]` Configurar Railway, ambientes e pipeline CI/CD com GitHub Actions
  - Criar projeto Railway com três serviços: backend NestJS, plugin PostgreSQL 16 e plugin Redis
  - Configurar dois ambientes: staging (branch `develop`) e production (branch `main`)
  - Pipeline GitHub Actions: install → lint → unit tests → integration tests → deploy ao ambiente correspondente via `RAILWAY_TOKEN`
  - Health check em `GET /health` verificando conectividade com PostgreSQL e Redis
  - _Requirements: RNF-01_

- [x] 1.2 `[V1]` Criar esquema completo do banco com migrations Prisma
  - Criar todas as tabelas do modelo físico: professional, oauth_account, availability, calendar_sync, patient, appointment, waitlist_entry, conversation, message, interaction_record, subscription, payment, audit_log
  - Aplicar constraints e índices críticos: `UNIQUE(professional_id, start_at)` em appointment, `UNIQUE(professional_id, phone_number)` em patient, índices de busca por data e paciente
  - Configurar encryption at rest habilitada no plugin PostgreSQL Railway (padrão)
  - Incluir `prisma migrate deploy` como etapa do deploy no pipeline
  - _Requirements: RNF-02_

- [x] 1.3 `[V1]` Scaffoldar NestJS com módulos de domínio e adaptadores de porta
  - Criar os seis módulos de domínio com limites explícitos: Schedule, Conversation, Booking, Patient, Auth, Billing
  - Criar módulo de infraestrutura com interfaces de porta: WhatsAppGateway, AIGateway, CalendarGateway, PaymentGateway, AuditLogService, SSE EventBus
  - Configurar Prisma 5 como ORM e BullMQ com conexão Redis como motor de filas
  - Definir tipos compartilhados `Result<T, E>` e `DomainError` como discriminated union — base para todos os contratos de serviço
  - _Requirements: RNF-03_

---

## 2. Autenticação — registro, login, 2FA e OAuth

- [x] 2.1 `[V1]` Implementar registro, login por e-mail/senha e recuperação de acesso
  - Registro com validação de senha (mín. 8 chars, letras e números) e hash bcrypt custo 12
  - E-mail de verificação via Resend com token one-time; link de recuperação de senha válido por 1h
  - Login retorna JWT RS256 (access 15min) + refresh token opaque (7d) em cookie HttpOnly Secure SameSite=Strict
  - Bloqueio de conta após 5 tentativas falhas consecutivas por 15 min com notificação ao profissional
  - Rate limiting de 5 tentativas/conta no endpoint de login
  - _Requirements: 11.1, 11.3, 11.4, 11.5_

- [ ] 2.2 `[V2]` Implementar 2FA com TOTP e recovery codes
  - Setup TOTP: gera secret, retorna QR code URL e 8 recovery codes hashed
  - Ativação exige confirmação com código TOTP válido antes de persistir
  - Validação do código TOTP a cada login subsequente quando 2FA ativo
  - Recovery code de uso único: marcado como usado após primeira validação bem-sucedida
  - _Requirements: 11.2, 11.5_

- [ ] 2.3 `[V2]` Implementar Social Login com Google OAuth2
  - Endpoint que gera URL de autorização Google com state CSRF
  - Callback processa code de autorização, importa nome/e-mail/foto e cria ou encontra Professional
  - Tokens OAuth2 armazenados encriptados AES-256-GCM em oauth_account; nunca expostos em resposta ou logs
  - Se conta Google vinculada for suspensa, notifica profissional no próximo acesso e orienta configurar e-mail/senha
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ] 2.4 `[V2]` Implementar vínculo de contas e ciclo completo de tokens
  - Vincula conta Google a perfil e-mail/senha existente: exige autenticação ativa simultânea em ambas
  - Rejeita vínculo se google_account_id já pertence a outro professional_id
  - Endpoint de refresh de tokens e logout com invalidação do refresh token no banco
  - Registra operação de vínculo no AuditLog com timestamp e IP de origem
  - _Requirements: 12.1, 12.2, 12.3, 12.4_

---

## 3. `[V1]` (P) Módulo de agenda — disponibilidade e cálculo de slots

- [x] 3.1 `[V1]` Implementar gerenciamento de disponibilidade semanal
  - CRUD de templates por dia da semana com validação: end_time > start_time, slot_duration_minutes ≥ 15, unicidade por professional_id+day_of_week
  - Ao salvar nova configuração, publica evento `AvailabilityUpdated` para invalidar cache de slots do ConversationOrchestrator
  - AC 1.6: slot já oferecido em fluxo de agendamento ativo é preservado até o TTL da reserva expirar antes de aplicar nova config
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [x] 3.2 `[V1]` (P) Implementar cálculo de slots livres
  - Calcula slots subtraindo agendamentos existentes e bloqueios de calendário externo da disponibilidade configurada
  - Formato de slotId: `{professionalId}:{ISO-date}:{HHmm}`; retorna isReserved refletindo locks Redis ativos
  - Exclui slots anteriores a `now() + minAdvanceHours` conforme antecedência mínima configurável
  - _Requirements: 1.3, 5.1, 5.7, 5.10_

---

## 4. Módulo de pacientes — CRM e LGPD

- [x] 4.1 `[V1]` Implementar cadastro automático e perfil de pacientes
  - `findOrCreateByPhone`: idempotente com UNIQUE(professional_id, phone_number); registra `consent_recorded_at` no primeiro contato
  - Atualização progressiva de perfil durante conversa WhatsApp (nome, data de nascimento)
  - API REST para o profissional visualizar e editar fichas de pacientes pelo painel web
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ] 4.2 `[V2]` Implementar histórico de atendimento e anotações manuais
  - Registra todas as interações WhatsApp com data/hora em interaction_record; append-only após criação
  - Registra consultas realizadas com status (compareceu, faltou, cancelou, cancelado)
  - Anotações manuais do profissional com timestamp imutável; histórico ordenado cronologicamente
  - Acesso ao histórico restrito ao professional_id responsável pelo cadastro
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 4.3 `[V2]` Implementar anonimização LGPD (direito ao esquecimento)
  - `anonymize()` substitui name, phone_number e date_of_birth por nulos/hash irreversível
  - Mantém registros de agendamento e histórico de saúde por no mínimo 5 anos (retenção legal)
  - _Requirements: 8.5, RNF-02_

---

## 5. `[V2]` Faturamento — trial, assinaturas e pagamento

- [ ] 5.1 `[V2]` Implementar free trial e controle de acesso por assinatura
  - `startTrial()`: ativa 7 dias de acesso completo sem exigir cartão; verifica duplicidade por e-mail e telefone vinculado
  - `checkAccess()`: bloqueia funcionalidades quando trial expirado e sem assinatura ativa; direciona para tela de planos
  - Notificação por e-mail quando faltam 2 dias para expirar o trial
  - TrialExpirationJob: BullMQ cron a cada hora; atualiza status para `suspended` nos trials vencidos
  - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_

- [ ] 5.2 `[V2]` Implementar checkout e processamento de pagamento via Asaas
  - Criação de assinatura recorrente no Asaas com opções PIX, cartão (tokenizado via Asaas.js no frontend) e boleto
  - Ativa plano imediatamente após confirmação de pagamento; envia e-mail de confirmação
  - Período de carência em falha de renovação automática; suspende acesso após carência esgotada
  - Upgrade/downgrade: calcula crédito proporcional do ciclo atual e aplica na próxima cobrança via Asaas
  - Webhook Asaas: valida `authToken` no header; processa `PAYMENT_CONFIRMED`, `PAYMENT_OVERDUE`, `SUBSCRIPTION_CANCELLED`
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7_

- [ ] 5.3 `[V2]` Implementar painel de faturamento backend
  - API que retorna plano atual, data de renovação e histórico imutável de cobranças
  - Fluxo de alteração de método de pagamento e cancelamento de assinatura com acesso até fim do ciclo
  - _Requirements: 14.1, 14.2, 14.3_

---

## 6. `[V1]` Motor de IA — LangChain, Maritaca e state machine da conversa

- [x] 6.1 `[V1]` (P) Configurar LangChain.js com Maritaca e Claude como fallback
  - Instalar `@langchain/community` e `@langchain/anthropic`; configurar `ChatOpenAI` com `baseURL: https://chat.maritaca.ai/api` para Maritaca
  - AIGateway com `AIProvider` discriminador: `maritaca-small` e `maritaca` via ChatOpenAI; `claude-haiku` e `claude-sonnet` via `@langchain/anthropic`
  - Fallback via `.withFallbacks()`: detecção de intenção usa Sabiá-3-small → Haiku; geração/tool calling usa Sabiá-3 → Sonnet
  - Circuit breaker nos gateways: após 5 falhas consecutivas em 60s, abre por 30s
  - _Requirements: 4.1, 4.5_

- [x] 6.2 `[V1]` (P) Implementar WhatsApp Gateway e webhook handler
  - WhatsAppGateway: `sendTextMessage`, `sendTemplate`, `validateWebhookSignature` (HMAC-SHA256 via `X-Hub-Signature-256`), `parseWebhookPayload`
  - Endpoint webhook POST: valida assinatura obrigatoriamente antes de qualquer processamento; enfileira mensagem no BullMQ
  - Retorna 200 imediatamente ao Meta; processamento assíncrono pelo ConversationOrchestrator
  - Envia typing indicator imediatamente após receber mensagem para cumprir latência ≤5s
  - _Requirements: 4.1, 4.4_

- [x] 6.3 `[V1]` Implementar AITriageService — detecção de intenção e geração de resposta
  - `detectIntent()`: LCEL chain com Maritaca Sabiá-3-small; retorna `{intent, confidence}`; intent=`unclear` quando confiança insuficiente
  - `generateResponse()`: Maritaca Sabiá-3 com contexto da conversa como JSON estruturado (nunca histórico completo); resposta em PT-BR cordial e profissional
  - `executeWithTools()`: suporta tool calling para fluxos que exigem dados externos (ex: listar slots)
  - _Requirements: 4.1, 4.2, 4.3, 4.5_

- [x] 6.4 `[V1]` Implementar ConversationOrchestrator com state machine
  - Persiste estado da conversa no Redis (`HSET conv:{patientPhone}:{professionalId}`; TTL 1800s por inatividade)
  - Executa state machine determinística: IDLE → TRIAGING → BOOKING_COLLECTING → BOOKING_CONFIRMING → CONCLUDED (e demais transições do diagrama)
  - Lock por chave de conversa garante processamento sequencial de mensagens do mesmo paciente
  - Integra PatientService, AITriageService, BookingService e SlotReservationService nos pontos corretos de cada transição
  - `intent=human_handoff`: notifica profissional e informa paciente que será atendido em breve
  - Timeout de inatividade encerra fluxo e libera slot reservado de volta à disponibilidade
  - Fallback de IA indisponível: envia mensagem padrão ao paciente e notifica profissional
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.3, 5.6, 5.7, 5.8, 5.9_

---

## 7. `[V1]` Agendamento, reserva de slots e lista de espera

- [x] 7.1 `[V1]` Implementar BookingService com regras de negócio de agendamento
  - `createAppointment()`: valida que slot não está no passado, respeita antecedência mínima e usa idempotencyKey para reprocessamento seguro
  - `cancelAppointment()`: valida que consulta é futura e respeita antecedência mínima de cancelamento
  - `rescheduleAppointment()`: cancela consulta existente e cria nova no slot selecionado
  - Ao criar/cancelar/confirmar/reagendar, publica eventos correspondentes para CalendarSyncService, WaitlistService e SSE EventBus
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.6, 5.7, 5.8, 5.10_

- [x] 7.2 `[V1]` (P) Implementar SlotReservationService com lock atômico Redis
  - `reserve()`: executa `SET slot:{slotId} {sessionId} NX EX {ttl=600s}`; retorna `SLOT_NOT_AVAILABLE` se já ocupado por outra sessão
  - `release()`: Lua script atômico que verifica ownership antes de deletar (previne liberação por terceiros)
  - `extend()`: renova TTL somente se sessionId corresponde ao owner atual
  - Garante que exatamente uma entre N requisições concorrentes pelo mesmo slot recebe confirmação
  - _Requirements: 5.1, 5.5_

- [x] 7.3 `[V1]` Implementar WaitlistService com notificação FIFO
  - Adiciona paciente à lista quando nenhum slot disponível para a data desejada
  - Ao receber `AppointmentCancelled`: notifica próximo da fila FIFO via WhatsApp em ≤30s
  - Pula paciente com consulta confirmada no mesmo horário da vaga liberada
  - Ignora lista de espera se a vaga tiver antecedência inferior ao mínimo configurável; disponibiliza para agendamento geral
  - Se paciente aceitar a vaga: cria appointment automaticamente e remove da lista; se timeout: disponibiliza para agendamento geral
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

---

## 8. `[V2]` Lembretes automáticos e confirmação de presença

- [ ] 8.1 `[V2]` Implementar ReminderJob — disparo de lembretes agendados
  - BullMQ cron a cada hora; consulta appointments com `start_at` no intervalo de antecedência configurado sem `last_reminded_at`
  - Envia lembrete via WhatsApp com template pré-aprovado; marca `last_reminded_at` para garantir idempotência em re-execuções
  - Profissional configura antecedência dos lembretes por conta (24h ou 48h antes da consulta)
  - Falha no envio registrada em log e notificada ao profissional sem disparar reenvio automático
  - _Requirements: 6.1, 6.4, 6.5_

- [ ] 8.2 `[V2]` Implementar processamento de respostas ao lembrete
  - Resposta "Sim" ao lembrete: atualiza status da consulta para `confirmed` no dashboard em tempo real
  - Resposta "Não": inicia automaticamente o fluxo de reagendamento ou cancelamento via ConversationOrchestrator
  - Se paciente não responder dentro do período configurável: envia segundo lembrete de follow-up (sem duplicação se já respondeu)
  - _Requirements: 6.2, 6.3_

---

## 9. `[V2]` Sincronização de calendário externo

- [ ] 9.1 `[V2]` Implementar CalendarGateway e CalendarSyncService
  - CalendarGateway: `listEvents`, `createEvent`, `deleteEvent` para Google Calendar API v3 e Microsoft Graph v1.0
  - `connectCalendar()`: OAuth2 flow para Google/Outlook; armazena access_token + refresh_token encriptados
  - `syncExternalEvents()`: importa eventos existentes e bloqueia slots correspondentes na agenda do sistema
  - `handleExternalWebhook()`: processa push notifications de Google/Outlook; atualiza disponibilidade em ≤60s após mudança no calendário externo
  - Ao receber `AppointmentCreated`: cria evento correspondente no calendário externo do profissional
  - Falha de sync: notifica profissional e mantém última disponibilidade conhecida sem corromper dados
  - `disconnectCalendar()`: remove integração sem afetar consultas já agendadas
  - Conflito de slot simultâneo resolvido pelo lock Redis + UNIQUE constraint no banco como backstop
  - Todas as operações de sync são idempotentes: reprocessar mesmo webhook não duplica nem corrompe dados
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

---

## 10. Frontend — Painel web Next.js 14

- [x] 10.1 `[V1]` Implementar fluxo de autenticação no frontend
  - Telas de registro, login (e-mail/senha e Google OAuth), verificação de e-mail e recuperação de senha
  - Configuração de 2FA: exibição de QR code, confirmação de código TOTP e exibição de recovery codes
  - Gestão de sessão com refresh automático de JWT via cookie HttpOnly; redirect para login em token expirado
  - Tela de vínculo de contas Google a perfil existente
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 11.1, 11.2, 11.3, 11.4, 11.5, 12.1, 12.2, 12.3, 12.4_

- [x] 10.2 `[V1]` (P) Implementar dashboard de agenda com atualizações em tempo real
  - Visualização diária e semanal com todos os agendamentos e status (confirmado, pendente, cancelado, no-show)
  - Indicadores visuais de ocupação por slot; carregamento inicial ≤2s em conexão padrão
  - SSE via Route Handler: recebe eventos do EventBus e atualiza UI em ≤5s sem reload de página
  - Painel lateral de detalhes: nome do paciente, telefone, horário, tipo de consulta, status e observações
  - Layout responsivo funcional em smartphones e tablets sem aplicativo nativo
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, RNF-04_

- [x] 10.3 `[V1]` (P) Implementar tela de configuração de disponibilidade
  - Configuração por dia da semana: ativar/desativar, horário de início/fim, duração de slot e intervalo entre consultas
  - Validação client-side e server-side; alterações propagadas ao Motor de IA em ≤5s após salvar
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ] 10.4 `[V2]` Implementar CRM de pacientes no painel
  - Lista de pacientes com busca por nome/telefone; ficha completa com histórico cronológico de atendimentos
  - Adição de anotações manuais; edição de perfil pelo profissional
  - Solicitação de exclusão de dados LGPD: aciona fluxo de anonimização e confirma ao profissional
  - _Requirements: 7.4, 8.3, 8.4, 8.5_

- [ ] 10.5 `[V2]` Implementar checkout e painel de faturamento no frontend
  - Seleção de plano (Mensal/Semestral/Anual); tokenização de cartão via Asaas.js no browser (dados de cartão nunca atingem o backend)
  - Exibição de QR code PIX e instruções de pagamento quando método PIX selecionado
  - Painel de faturamento: plano atual, data de renovação, histórico imutável de cobranças
  - Banner de trial com contador de dias restantes; CTA de conversão quando faltam ≤2 dias
  - _Requirements: 13.1, 13.2, 13.6, 14.1, 14.2, 14.3, 15.3, 15.4, 15.5_

---

## 11. Auditoria, segurança e conformidade

- [ ] 11.1 Implementar AuditLogService e controles de rate limiting
  - AuditLogService registra ações críticas (agendamentos, cancelamentos, pagamentos, alterações de cadastro, vínculo de contas) com timestamp, actor_id, resource_type, old_value, new_value e IP de origem
  - Tabela audit_log é append-only: sem UPDATE/DELETE; registros imutáveis após inserção
  - Rate limiting global: 100 req/min por profissional na API; 5 tentativas/conta no login
  - _Requirements: 11.5, 12.4, 14.3, RNF-05_

- [ ] 11.2 (P) Implementar segurança de webhooks e encriptação de tokens sensíveis
  - WhatsApp: valida `X-Hub-Signature-256` (HMAC-SHA256) obrigatoriamente antes de qualquer processamento de payload
  - Asaas: valida `authToken` no header do webhook; rejeita requisições sem autenticação
  - Tokens OAuth2 e tokens de calendário encriptados AES-256-GCM no banco; nunca retornados em respostas de API ou registrados em logs
  - TOTP secret armazenado encriptado no campo `totp_secret` (BYTEA)
  - _Requirements: RNF-02, 10.1_

---

## 12. Testes de integração, concorrência e E2E

- [ ] 12.1 Implementar testes de integração dos fluxos principais
  - Fluxo WhatsApp completo com Redis e PostgreSQL reais: webhook → triagem (AIGateway mockado) → reserva de slot → criação de agendamento → confirmação
  - CalendarSyncService: sync bidirecional com CalendarGateway mockado; idempotência de reprocessamento
  - PaymentService: webhook Asaas com payload real → atualização de status de assinatura no banco
  - AuthService: registro → login com 2FA → refresh de token → logout com invalidação
  - ReminderJob: BullMQ job em Redis real → consulta banco → NotificationService mockado
  - _Requirements: RNF-01, RNF-03_

- [ ] 12.2 (P) Implementar testes de concorrência e performance
  - 10 pacientes simultâneos tentando reservar o mesmo slot: exatamente 1 confirmado, 9 recebem `SLOT_NOT_AVAILABLE`
  - `SlotCalculationService` com 90 dias de agenda e 50% de ocupação: resposta em < 200ms
  - 100 webhooks WhatsApp simultâneos processados sem perda de mensagem e latência total < 5s
  - _Requirements: 5.5, RNF-03_

- [ ] 12.3 (P) Implementar testes E2E dos fluxos críticos de negócio
  - Profissional configura disponibilidade → paciente agenda via WhatsApp simulado → agendamento aparece no dashboard em tempo real
  - Free trial: registro → ativação automática → uso das funcionalidades → expiração pelo job → bloqueio de acesso → assinatura e desbloqueio
  - Cancelamento com lista de espera: paciente cancela → WaitlistService notifica próximo da fila → slot ocupado pelo paciente da lista
  - _Requirements: RNF-01, 5.1, 5.3, 9.2, 15.5_
