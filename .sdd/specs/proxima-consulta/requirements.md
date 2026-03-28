# Documento de Requisitos

## Introdução

O **Próxima Consulta** é uma aplicação web SaaS voltada para profissionais autônomos da saúde (dentistas, fisioterapeutas, entre outros) que automatiza a gestão de agenda e o atendimento de pacientes via WhatsApp utilizando IA Generativa. O sistema elimina a necessidade de uma secretária dedicada, reduzindo custos operacionais e aumentando a fidelização de pacientes através de um atendimento disponível 24/7.

---

## Requisitos Não Funcionais Globais

Estes requisitos se aplicam ao sistema como um todo.

### RNF-01: Disponibilidade
O sistema deve estar disponível 99,9% do tempo (downtime máximo de ~8,7 horas/ano), garantindo o atendimento 24/7 aos pacientes via WhatsApp.

### RNF-02: Segurança e Conformidade com LGPD
Dados pessoais e de saúde de pacientes devem ser armazenados e tratados em conformidade com a LGPD. Dados em repouso devem ser criptografados. Toda comunicação deve ocorrer via HTTPS/TLS 1.2+. O consentimento do paciente para coleta de dados deve ser registrado.

### RNF-03: Escalabilidade
A arquitetura deve suportar crescimento horizontal para atender múltiplos profissionais e pacientes simultâneos sem degradação perceptível de desempenho.

### RNF-04: Usabilidade e Responsividade
O Painel Web deve ser responsivo e totalmente funcional em dispositivos móveis (smartphones e tablets), sem necessidade de aplicativo nativo.

### RNF-05: Auditabilidade
Todas as ações críticas (agendamentos, cancelamentos, pagamentos, alterações de cadastro) devem ser registradas em log de auditoria com timestamp, identificação do ator e dados alterados.

---

## Requisitos Funcionais

### Requisito 1: Configuração de Disponibilidade

**Objetivo:** Como profissional de saúde, eu quero configurar meus dias, horários de atendimento e duração padrão de consultas, para que o sistema ofereça apenas horários válidos aos pacientes.

#### Critérios de Aceitação
1. When o profissional acessa a tela de configuração de agenda, the Sistema de Agenda shall exibir os dias da semana com opção de ativar/desativar cada dia individualmente.
2. When o profissional define horário de início e fim para um dia, the Sistema de Agenda shall validar que o horário de fim é posterior ao horário de início.
3. When o profissional define a duração padrão de consulta, the Sistema de Agenda shall calcular e exibir os slots disponíveis automaticamente.
4. When o profissional salva a configuração de disponibilidade, the Sistema de Agenda shall atualizar imediatamente os horários oferecidos aos pacientes via WhatsApp.
5. The Sistema de Agenda shall permitir configurar intervalos entre consultas (ex: 10 minutos de descanso entre atendimentos).
6. If o profissional salvar uma nova configuração de disponibilidade enquanto um paciente estiver em um fluxo de agendamento ativo, the Sistema de Agenda shall honrar o slot originalmente oferecido ao paciente até que o fluxo seja concluído ou expirado, sem cancelá-lo automaticamente.

#### Requisitos Não Funcionais
- Alterações salvas devem ser propagadas ao Motor de IA em no máximo **5 segundos**.
- A tela de configuração deve carregar e responder a interações em no máximo **2 segundos**.

#### Detalhamento para Implementação

**Dados Necessários**
- `professional_id`, `day_of_week` (enum MON–SUN / 0–6), `is_active`, `start_time`, `end_time`, `slot_duration_minutes`, `break_between_slots_minutes` (default 0), `min_advance_hours`, `updated_at`

**Regras de Validação**
- `end_time > start_time`
- `slot_duration_minutes ≥ 15`
- `break_between_slots_minutes ≥ 0`
- Unicidade `(professional_id, day_of_week)` → upsert, não duplicata
- Slot em fluxo ativo: honrar TTL da reserva Redis antes de aplicar nova config (AC 1.6)

**Resolução de Erros**
| Situação | Resposta |
|---|---|
| `end_time ≤ start_time` | 422 "Horário de fim deve ser posterior ao de início" |
| `slot_duration_minutes < 15` | 422 "Duração mínima é 15 minutos" |
| Propagação ao Motor IA > 5s | Retry automático 3×; alerta ao profissional se persistir |

**Target de Performance**
- Carregamento da tela de configuração: ≤ 2s
- Save + propagação ao Motor IA: ≤ 5s
- Response da API de save: ≤ 500ms

---

### Requisito 2: Sincronização de Calendário Externo

**Objetivo:** Como profissional de saúde, eu quero sincronizar minha agenda com Google Calendar ou Outlook, para que compromissos pessoais não conflitem com horários de atendimento.

#### Critérios de Aceitação
1. When o profissional conecta sua conta Google Calendar ou Outlook, the Serviço de Calendário shall importar os eventos existentes e bloquear os horários correspondentes na agenda do sistema.
2. When um novo evento é criado no calendário externo, the Serviço de Calendário shall atualizar a disponibilidade no Próxima Consulta em tempo hábil.
3. When uma consulta é agendada no Próxima Consulta, the Serviço de Calendário shall criar o evento correspondente no calendário externo do profissional.
4. If a sincronização com o calendário externo falhar, the Serviço de Calendário shall notificar o profissional e manter a última disponibilidade conhecida.
5. When o profissional desconecta o calendário externo, the Serviço de Calendário shall remover a integração sem afetar consultas já agendadas.
6. If um evento do calendário externo for criado para um slot que está sendo confirmado simultaneamente por um paciente via WhatsApp, the Serviço de Calendário shall garantir que apenas uma das operações seja efetivada, prevenindo double-booking.

#### Requisitos Não Funcionais
- A sincronização de eventos externos deve ocorrer em no máximo **60 segundos** após criação ou atualização no calendário externo.
- Operações de sincronização devem ser idempotentes: falhas parciais não devem corromper nem duplicar dados existentes.

#### Detalhamento para Implementação

**Dados Necessários**
- `professional_id`, `provider` (google | outlook), `access_token` + `refresh_token` (encriptados AES-256-GCM), `token_expires_at`, `calendar_id`, `last_sync_at`, `sync_status`
- Por evento bloqueado: `external_event_id`, `start_at`, `end_at`
- `oauth_state` (CSRF, Redis TTL 5min, descartado após uso)

**Regras de Validação**
- `oauth_state` CSRF válido e não expirado antes de aceitar callback
- `email_verified: true` no token Google
- `external_event_id` único por `professional_id` → upsert idempotente
- Conflito de slot: lock Redis `SET NX` + `UNIQUE(professional_id, start_at)` (AC 2.6)
- Tokens nunca retornados em API response nem logados

**Resolução de Erros**
| Situação | Resposta |
|---|---|
| Token expirado e refresh falhou | `sync_status = error`, notificar profissional, manter última disponibilidade (AC 2.4) |
| API externa 429 | Backoff exponencial: 30s → 60s → 120s |
| API externa 5xx (3× consecutivo) | Fallback para última disponibilidade + alerta ao profissional |
| Webhook duplicado | Upsert por `external_event_id` — sem duplicata |
| State CSRF inválido no callback | 400 + log de segurança; sem criar integração |

**Target de Performance**
- Sync após evento externo: ≤ 60s
- Import inicial (calendário com ≤ 100 eventos futuros): ≤ 10s
- Exportar evento após `AppointmentCreated`: ≤ 5s

---

### Requisito 3: Dashboard de Visualização da Agenda

**Objetivo:** Como profissional de saúde, eu quero visualizar minha agenda do dia e da semana com o status de cada paciente, para que eu tenha controle completo dos atendimentos.

#### Critérios de Aceitação
1. When o profissional acessa o dashboard, the Painel Web shall exibir a agenda do dia atual com todos os agendamentos e seus respectivos status (confirmado, pendente, cancelado).
2. When o profissional alterna para a visão semanal, the Painel Web shall exibir a agenda completa da semana com indicadores visuais de ocupação.
3. When o status de uma consulta é alterado (confirmação, cancelamento), the Painel Web shall atualizar a visualização em tempo real sem necessidade de recarregar a página.
4. The Painel Web shall exibir o nome do paciente, horário e tipo de consulta em cada slot agendado.
5. When o profissional clica em um agendamento, the Painel Web shall exibir um painel de detalhes contendo: nome completo do paciente, número de telefone, data e horário da consulta, tipo/motivo da consulta, status atual e observações registradas.

#### Requisitos Não Funcionais
- O dashboard deve carregar e exibir os agendamentos em no máximo **2 segundos** em conexão padrão (4G/broadband).
- Atualizações em tempo real devem ter latência máxima de **5 segundos** entre o evento e a atualização visual no painel.

#### Detalhamento para Implementação

**Dados Necessários**
- Por appointment: `id`, `patient_name`, `patient_phone`, `start_at`, `end_at`, `appointment_type`, `status`, `notes`
- Indicadores de ocupação: total de slots disponíveis vs. ocupados por dia
- Stream SSE de eventos: `AppointmentCreated`, `AppointmentCancelled`, `AppointmentConfirmed`, `AppointmentRescheduled`

**Regras de Validação**
- JWT válido; profissional acessa apenas seus próprios dados
- Range máximo de consulta: 7 dias para visão semanal
- SSE autenticado via Bearer token no header ou query param seguro

**Resolução de Erros**
| Situação | Resposta |
|---|---|
| Falha no carregamento inicial | Skeleton + botão "Tentar novamente" |
| SSE desconectado | Reconexão automática (EventSource nativo com backoff) |
| Appointment deletado enquanto visualizando | 404 → fechar painel de detalhes + "Consulta não encontrada" |
| Token SSE expirado | Reconectar silenciosamente com novo token |

**Target de Performance**
- Carregamento inicial: ≤ 2s
- Latência SSE (evento → atualização visual): ≤ 5s
- API de appointments (range 1 semana): ≤ 200ms
- API de detalhes de um appointment: ≤ 100ms

---

### Requisito 4: Triagem Inteligente via WhatsApp

**Objetivo:** Como paciente, eu quero enviar mensagens em linguagem natural pelo WhatsApp e ser compreendido pela IA, para que minha necessidade seja identificada e encaminhada corretamente de forma rápida e sem atrito.

#### Critérios de Aceitação
1. When um paciente envia uma mensagem pelo WhatsApp, the Motor de IA shall processar a mensagem em linguagem natural e identificar a intenção (agendamento, cancelamento, reagendamento, dúvida sobre preço, informação geral).
2. When a IA identifica a intenção do paciente, the Motor de IA shall direcionar o fluxo de conversa para o processo correto (agendamento, cancelamento, FAQ).
3. If a IA não conseguir identificar a intenção do paciente com confiança suficiente, the Motor de IA shall solicitar esclarecimento ao paciente com uma mensagem amigável.
4. If a mensagem do paciente requer atendimento humano, the Motor de IA shall notificar o profissional e informar o paciente que será atendido em breve.
5. The Motor de IA shall responder em português brasileiro com linguagem natural, cordial e profissional.

#### Requisitos Não Funcionais
- O Motor de IA deve enviar a primeira resposta ao paciente em no máximo **5 segundos** após o recebimento da mensagem.
- O Motor de IA deve estar disponível 24/7; em caso de indisponibilidade do serviço de IA, o sistema deve enviar mensagem automática de fallback ao paciente e notificar o profissional.

#### Detalhamento para Implementação

**Dados Necessários**
- Mensagem do paciente: `text`, `timestamp`, `from`, `to`
- Estado da conversa no Redis: `state`, `intent_history`, `patient_id`, `professional_id`, `context_json`
- Perfil do paciente (recuperado do PatientService)
- Configuração do profissional: `min_advance_hours`, `clinic_address`

**Regras de Validação**
- `X-Hub-Signature-256` (HMAC-SHA256) válida — obrigatória antes de qualquer processamento
- `professional_id` derivado internamente do `phone_number_id` do webhook (não do payload do cliente)
- `confidence ≥ 0.7` para roteamento direto; abaixo → solicitar esclarecimento (AC 4.3)
- Lock por chave de conversa: máximo de 1 mensagem processada por vez por `patient+professional`
- Mensagem não vazia após trimming

**Resolução de Erros**
| Situação | Resposta |
|---|---|
| Assinatura `X-Hub-Signature-256` inválida | 403 + log de alerta de segurança; sem processar payload |
| Maritaca indisponível | Fallback automático para Claude via `.withFallbacks()` (LangChain) |
| Ambos LLMs indisponíveis | Mensagem padrão ao paciente + notificação ao profissional (AC 4.4) |
| Estado Redis corrompido | Reset para `IDLE` + mensagem amigável ao paciente |
| WhatsApp API 429 | Enfileirar mensagem para reenvio com backoff exponencial |

**Target de Performance**
- Typing indicator enviado: ≤ 1s após webhook recebido
- Primeira resposta ao paciente: ≤ 5s
- Detecção de intenção (LLM Maritaca Sabiá-3-small): ≤ 2s
- Disponibilidade: 24/7 com fallback obrigatório

---

### Requisito 5: Agendamento, Reagendamento e Cancelamento Self-Service

**Objetivo:** Como paciente, eu quero agendar, reagendar ou cancelar consultas diretamente pelo WhatsApp sem intervenção humana, para que eu tenha autonomia e conveniência.

#### Critérios de Aceitação
1. When o paciente solicita um agendamento, the Motor de IA shall apresentar os próximos horários disponíveis e realizar a reserva após confirmação do paciente.
2. When o paciente solicita reagendamento, the Motor de IA shall cancelar a consulta existente e apresentar novos horários disponíveis para seleção.
3. When o paciente solicita cancelamento, the Motor de IA shall confirmar a intenção e liberar o horário na agenda do profissional.
4. When uma consulta é agendada, reagendada ou cancelada via WhatsApp, the Sistema de Agenda shall atualizar a agenda do profissional instantaneamente.
5. If o paciente tentar agendar em um horário já ocupado, the Motor de IA shall informar a indisponibilidade e sugerir horários alternativos próximos.
6. When o agendamento é confirmado, the Motor de IA shall enviar uma mensagem de confirmação ao paciente com data, horário e endereço do consultório.
7. If o paciente tentar agendar uma consulta para uma data ou horário no passado, the Motor de IA shall recusar o agendamento e apresentar apenas horários futuros disponíveis.
8. If o paciente tentar cancelar uma consulta que já ocorreu, the Motor de IA shall informar que consultas passadas não podem ser canceladas e orientar o paciente a entrar em contato diretamente com o profissional.
9. If o paciente não interagir com o fluxo de agendamento dentro de um período de inatividade configurável, the Motor de IA shall encerrar o fluxo e liberar o slot reservado de volta à disponibilidade.
10. The Sistema de Agenda shall exigir antecedência mínima configurável para agendamento e para cancelamento (ex: não é possível agendar com menos de 2 horas de antecedência; não é possível cancelar com menos de 24 horas de antecedência).

#### Requisitos Não Funcionais
- O sistema deve prevenir condições de corrida (race conditions): tentativas simultâneas de dois pacientes pelo mesmo slot devem garantir que apenas um seja confirmado.
- A mensagem de confirmação de agendamento deve ser entregue ao paciente em no máximo **10 segundos** após a confirmação.

#### Detalhamento para Implementação

**Dados Necessários**
- `patient_id`, `professional_id`, `slot_id`, `start_at`, `end_at`, `appointment_type`, `idempotency_key`
- Reserva: `session_id`, `TTL` (600s padrão)
- Configurações: `min_advance_hours`, `min_advance_hours_cancellation`, `inactivity_timeout_minutes`

**Regras de Validação**
- `start_at > now()` (AC 5.7)
- `start_at > now() + min_advance_hours` (AC 5.10)
- Slot livre: `SET NX` Redis + `UNIQUE(professional_id, start_at)` no banco como backstop (AC 5.5)
- Cancelamento: `start_at > now()` (AC 5.8) + antecedência mínima de cancelamento
- `idempotency_key` único por `professional_id` (previne duplo agendamento em retry de rede)

**Resolução de Erros**
| Situação | Resposta |
|---|---|
| Slot ocupado (`SET NX` retorna nil) | `SLOT_NOT_AVAILABLE` → Motor IA oferece 3 horários alternativos próximos (AC 5.5) |
| Agendamento no passado | Rejeição com apresentação de horários futuros disponíveis (AC 5.7) |
| Antecedência insuficiente | Rejeição + explicação do tempo mínimo exigido |
| Cancelamento de consulta passada | Informa impossibilidade e orienta contato direto (AC 5.8) |
| Timeout de inatividade | TTL Redis expira → slot liberado + estado resetado para `IDLE` (AC 5.9) |
| `UNIQUE` violation no banco (backstop) | Rollback → retornar `SLOT_NOT_AVAILABLE` |

**Target de Performance**
- Confirmação de agendamento entregue ao paciente: ≤ 10s
- Atomicidade da reserva `SET NX` Redis: < 1ms
- Atualização da agenda do profissional via SSE: ≤ 5s
- `SlotCalculationService` (90 dias, 50% ocupação): ≤ 200ms

---

### Requisito 6: Confirmação Automática e Lembretes

**Objetivo:** Como profissional de saúde, eu quero que o sistema envie lembretes automáticos aos pacientes antes da consulta, para reduzir faltas e no-shows.

#### Critérios de Aceitação
1. When faltam 24 horas para uma consulta agendada, the Serviço de Lembretes shall enviar uma mensagem automática via WhatsApp solicitando confirmação do paciente (Sim/Não).
2. When o paciente confirma presença respondendo ao lembrete, the Serviço de Lembretes shall atualizar o status da consulta para "confirmado" no dashboard.
3. When o paciente indica que não poderá comparecer, the Serviço de Lembretes shall iniciar o fluxo de reagendamento ou cancelamento automaticamente.
4. If o paciente não responder ao lembrete dentro de um período configurável, the Serviço de Lembretes shall enviar um segundo lembrete de follow-up.
5. The Serviço de Lembretes shall permitir ao profissional configurar a antecedência dos lembretes (ex: 24h, 48h).

#### Requisitos Não Funcionais
- Mensagens de lembrete devem ser disparadas com tolerância máxima de **5 minutos** em relação ao horário configurado.
- Falhas no envio de lembretes devem ser registradas em log e notificadas ao profissional, sem reenvios automáticos que possam duplicar mensagens ao paciente.

#### Detalhamento para Implementação

**Dados Necessários**
- `appointment_id`, `patient_phone`, `start_at`, `status`, `last_reminded_at`
- Configuração: `reminder_advance_hours` (24 ou 48h), `second_reminder_hours`
- Template de mensagem aprovado pelo Meta (nome do template + idioma)

**Regras de Validação**
- Idempotência: enviar somente se `last_reminded_at IS NULL` ou fora da janela de tolerância (±10min)
- `status IN ('pending', 'scheduled')` — não enviar para `confirmed`, `cancelled`, `completed`
- `start_at > now()` — não enviar para consultas já passadas
- Segundo lembrete: somente se primeiro foi enviado e paciente não respondeu no período configurável

**Resolução de Erros**
| Situação | Resposta |
|---|---|
| Falha no envio WhatsApp (4xx/5xx) | Log de erro + notificação ao profissional; sem reenvio automático (AC 6.4) |
| Template não aprovado pelo Meta | Marcar como erro + notificar profissional para revisar template |
| Resposta recebida mas consulta já cancelada | Ignorar resposta; sem alterar status |
| Job BullMQ falhou | Retry 3× com backoff; se persistir → dead letter queue + alerta |

**Target de Performance**
- Tolerância máxima de disparo: ≤ 5min do horário configurado
- Cron job: executa a cada 5min
- Atualização de status no dashboard após resposta do paciente: ≤ 5s via SSE

---

### Requisito 7: Cadastro Automático de Pacientes

**Objetivo:** Como profissional de saúde, eu quero que pacientes sejam cadastrados automaticamente a partir do primeiro contato via WhatsApp, para eliminar trabalho manual de registro.

#### Critérios de Aceitação
1. When um paciente entra em contato pela primeira vez via WhatsApp, the Módulo CRM shall criar uma ficha de paciente com o número de telefone capturado automaticamente.
2. When a IA coleta informações do paciente durante a conversa (nome, data de nascimento, etc.), the Módulo CRM shall atualizar a ficha do paciente progressivamente.
3. If um paciente já cadastrado entrar em contato, the Módulo CRM shall identificá-lo pelo número de WhatsApp e recuperar sua ficha existente.
4. The Módulo CRM shall permitir ao profissional visualizar e editar as fichas de pacientes pelo painel web.

#### Requisitos Não Funcionais
- O cadastro automático deve ocorrer em segundo plano sem impactar o tempo de resposta da conversa com o paciente.
- Dados pessoais coletados devem atender à LGPD: finalidade de coleta registrada, acesso restrito ao profissional responsável e possibilidade de exclusão mediante solicitação.

#### Detalhamento para Implementação

**Dados Necessários**
- `phone_number` (capturado do webhook), `professional_id`, `name` (coletado progressivamente), `date_of_birth` (coletado progressivamente), `consent_recorded_at`, `created_at`, `updated_at`

**Regras de Validação**
- `phone_number` não vazio, formato internacional (`+55...`)
- `UNIQUE(professional_id, phone_number)` → upsert, sem duplicata (AC 7.3)
- `name` não vazio após trimming antes de persistir
- `date_of_birth` é data válida no passado
- Acesso estritamente restrito ao `professional_id` responsável pelo cadastro

**Resolução de Erros**
| Situação | Resposta |
|---|---|
| Telefone com formato inválido | Log de alerta; sem criar ficha; conversa continua com fallback genérico |
| Conflito `UNIQUE` (paciente já cadastrado) | `findExisting` — sem criar duplicata (AC 7.3) |
| Campo nulo retornado pela IA | Ignorar campo; manter valor anterior |
| Falha de persistência em background | Conversa continua sem interrupção; retry assíncrono |

**Target de Performance**
- `findOrCreateByPhone`: ≤ 50ms (índice UNIQUE)
- Atualização progressiva de perfil: ≤ 100ms
- Cadastro em background: zero impacto no tempo de resposta da conversa

---

### Requisito 8: Histórico de Atendimento

**Objetivo:** Como profissional de saúde, eu quero consultar o histórico completo de interações e consultas de cada paciente, para oferecer um atendimento mais personalizado.

#### Critérios de Aceitação
1. The Módulo CRM shall registrar todas as interações via WhatsApp de cada paciente com data e hora.
2. The Módulo CRM shall registrar todas as consultas realizadas com data, horário e status (compareceu, faltou, cancelou).
3. When o profissional acessa a ficha de um paciente, the Módulo CRM shall exibir o histórico completo de atendimentos em ordem cronológica.
4. The Módulo CRM shall permitir ao profissional adicionar anotações manuais ao histórico do paciente.
5. If um paciente solicitar a exclusão de seus dados pessoais (direito ao esquecimento, Art. 18 LGPD), the Módulo CRM shall anonimizar os dados de identificação pessoal (nome, telefone, dados de contato) enquanto retém os registros de atendimento pelo período mínimo de retenção legal, preservando assim a conformidade com a LGPD sem violar obrigações de guarda de informações de saúde.

#### Requisitos Não Funcionais
- Dados de histórico devem ser retidos por no mínimo **5 anos**, em conformidade com obrigações legais de guarda de informações de saúde.
- O acesso ao histórico de cada paciente deve ser estritamente restrito ao profissional responsável pelo cadastro.
- O histórico deve ser imutável após registro; anotações manuais do profissional devem ser versionadas com data e hora de criação.

#### Detalhamento para Implementação

**Dados Necessários**
- `interaction_record`: `patient_id`, `professional_id`, `direction` (inbound | outbound), `created_at`
- Histórico de consultas: `appointment_id`, `start_at`, `status`
- `manual_note`: `patient_id`, `professional_id`, `content`, `created_at` (imutável, setado pelo servidor)
- Campos de anonimização: `name`, `phone_number`, `date_of_birth` → NULL/hash irreversível

**Regras de Validação**
- `interaction_record` e `appointment` são append-only: sem UPDATE/DELETE após criação
- `manual_note.created_at` setado pelo servidor; `content` não vazio
- Acesso ao histórico: `professional_id` do JWT = `professional_id` do patient (row-level security)
- Anonimização: apenas campos de identificação pessoal; registros de atendimento retidos por ≥ 5 anos

**Resolução de Erros**
| Situação | Resposta |
|---|---|
| Tentativa de UPDATE em registro imutável | 405 Method Not Allowed |
| Acesso a paciente de outro profissional | 403 Forbidden |
| Falha parcial na anonimização | Rollback transacional: anonimiza tudo ou nada |
| Paciente não encontrado | 404 com mensagem clara |

**Target de Performance**
- Carregamento do histórico (últimos 50 registros, paginado): ≤ 500ms
- Busca de pacientes por nome/telefone: ≤ 200ms
- Inserção de anotação manual: ≤ 200ms

---

### Requisito 9: Lista de Espera Inteligente

**Objetivo:** Como profissional de saúde, eu quero que pacientes interessados sejam notificados quando surgir uma vaga de última hora, para maximizar a ocupação da agenda.

#### Critérios de Aceitação
1. When não há horários disponíveis para a data desejada pelo paciente, the Motor de IA shall oferecer a opção de entrar na lista de espera.
2. When uma consulta é cancelada e um horário é liberado, the Serviço de Lista de Espera shall notificar automaticamente via WhatsApp os pacientes na lista de espera para aquele período.
3. When um paciente da lista de espera aceita o horário disponibilizado, the Serviço de Lista de Espera shall realizar o agendamento automaticamente e remover o paciente da lista.
4. If nenhum paciente da lista de espera aceitar o horário dentro de um período configurável, the Serviço de Lista de Espera shall disponibilizar o horário para agendamento geral.
5. If um paciente da lista de espera já possuir uma consulta confirmada no mesmo horário da vaga liberada, the Serviço de Lista de Espera shall pular esse paciente e notificar o próximo da fila.
6. If o horário liberado tiver antecedência inferior ao mínimo configurável para agendamento (conforme Requisito 5), the Serviço de Lista de Espera shall ignorar a lista de espera e disponibilizar o slot diretamente para agendamento geral.

#### Requisitos Não Funcionais
- Notificações de vaga devem ser enviadas em **ordem FIFO** (primeiro a entrar na lista, primeiro a ser notificado), garantindo equidade.
- A notificação deve ser disparada em no máximo **30 segundos** após a liberação do horário.

#### Detalhamento para Implementação

**Dados Necessários**
- `waitlist_entry`: `id`, `patient_id`, `professional_id`, `desired_date`, `desired_time_range`, `created_at`, `status` (pending | notified | accepted | expired), `notified_at`

**Regras de Validação**
- Sem entrada duplicada pendente para `patient_id + professional_id + desired_date`
- Ordem FIFO rigorosa por `created_at`
- AC 9.5: verificar consulta confirmada no mesmo horário antes de notificar
- AC 9.6: `start_at_vaga > now() + min_advance_hours`; caso contrário liberar diretamente sem notificar lista

**Resolução de Erros**
| Situação | Resposta |
|---|---|
| Falha no envio WhatsApp ao paciente da lista | Retry 3×; se persistir → pular paciente, notificar próximo da fila |
| Paciente aceitou mas slot já tomado (race condition) | Mensagem de desculpas + oferta da próxima vaga disponível |
| Timeout sem resposta do paciente | Status `expired` + slot liberado para agendamento geral (AC 9.4) |
| Vaga com antecedência insuficiente | Ignorar lista, liberar slot diretamente (AC 9.6) |

**Target de Performance**
- Notificação após cancelamento: ≤ 30s
- `AppointmentCancelled` → início do processamento da fila: ≤ 5s (event-driven)

---

### Requisito 10: Social Login (OAuth2) com Google

**Objetivo:** Como profissional de saúde, eu quero fazer login com minha conta Google, para acessar o sistema de forma rápida e segura.

#### Critérios de Aceitação
1. When o profissional clica em "Entrar com Google" na tela de login, the Módulo de Autenticação shall iniciar o fluxo OAuth2 com a conta Google do usuário.
2. When o login OAuth2 é concluído com sucesso, the Módulo de Autenticação shall importar automaticamente nome, e-mail e foto de perfil da conta Google.
3. If o profissional não possui conta no sistema, the Módulo de Autenticação shall criar uma nova conta automaticamente a partir dos dados do Google.
4. If a autenticação OAuth2 falhar, the Módulo de Autenticação shall exibir mensagem de erro e oferecer alternativas de login.
5. If a conta Google vinculada ao profissional for suspensa ou excluída pelo Google, the Módulo de Autenticação shall notificar o profissional no próximo acesso e orientá-lo a configurar um método alternativo de login (e-mail e senha) para evitar bloqueio de conta.

#### Requisitos Não Funcionais
- Tokens OAuth2 devem ser armazenados de forma segura no servidor e nunca expostos ao cliente ou em logs.
- O fluxo completo de login social deve ser concluído em no máximo **5 segundos** em condições normais de rede.

#### Detalhamento para Implementação

**Dados Necessários**
- `google_account_id` (sub do ID token), `name`, `email`, `profile_picture`
- `access_token` + `refresh_token` (encriptados AES-256-GCM), `token_expires_at`
- `oauth_state` (CSRF, Redis TTL 5min, descartado após uso)

**Regras de Validação**
- `oauth_state` CSRF válido e não expirado antes de processar callback
- ID token verificado via JWKS do Google
- `email_verified: true` no token
- `google_account_id` não vinculado a outro `professional_id`
- Tokens nunca retornados em API response nem registrados em logs

**Resolução de Erros**
| Situação | Resposta |
|---|---|
| State CSRF inválido | 400 + log de alerta de segurança; sem criar sessão |
| OAuth cancelado pelo usuário | Redirect para login com "Login cancelado" |
| `email_verified: false` | Rejeitar + "Sua conta Google precisa ter e-mail verificado" |
| API Google 5xx | Exibir erro + alternativas de login (AC 10.4) |
| Conta Google suspensa/excluída | Notificar no próximo acesso + orientar configurar e-mail/senha (AC 10.5) |

**Target de Performance**
- Fluxo completo de login OAuth: ≤ 5s
- Processamento do callback: ≤ 2s
- `findOrCreate` Professional: ≤ 100ms

---

### Requisito 11: Login Tradicional com E-mail e Senha

**Objetivo:** Como profissional de saúde, eu quero criar uma conta com e-mail e senha e protegê-la com verificação em dois fatores, para ter uma opção de acesso independente do Google.

#### Critérios de Aceitação
1. When o profissional se registra com e-mail e senha, the Módulo de Autenticação shall enviar um e-mail de verificação para confirmar o endereço.
2. When o profissional ativa a verificação em dois fatores (2FA), the Módulo de Autenticação shall solicitar o código 2FA a cada login subsequente.
3. The Módulo de Autenticação shall exigir senhas com no mínimo 8 caracteres, incluindo letras e números.
4. If o profissional esquecer a senha, the Módulo de Autenticação shall permitir recuperação via e-mail com link seguro de redefinição.
5. When o profissional ativa o 2FA, the Módulo de Autenticação shall gerar e exibir códigos de recuperação de uso único, permitindo que o profissional recupere acesso à conta caso perca o dispositivo autenticador.

#### Requisitos Não Funcionais
- Senhas devem ser armazenadas com hash **bcrypt** (custo mínimo 12); nenhuma senha deve ser armazenada em texto simples.
- Após **5 tentativas de login malsucedidas** consecutivas, a conta deve ser temporariamente bloqueada por período configurável, com notificação ao profissional.

#### Detalhamento para Implementação

**Dados Necessários**
- `email` (UNIQUE), `password_hash` (bcrypt custo 12), `email_verified_at`, `failed_login_attempts`, `locked_until`
- `verification_token` (TTL 24h), `password_reset_token` (TTL 1h)
- `totp_secret` (encriptado AES-256-GCM), `totp_enabled`, `recovery_codes` (8 hashes bcrypt, cada um de uso único)

**Regras de Validação**
- Senha: ≥ 8 caracteres, ≥ 1 letra e ≥ 1 número (AC 11.3)
- E-mail verificado antes de permitir login
- `locked_until IS NULL OR locked_until < now()`
- TOTP: janela de ±1 período (30s) para tolerância de clock skew
- Recovery code: 8 itens únicos, cada um marcado como usado após primeira validação

**Resolução de Erros**
| Situação | Resposta |
|---|---|
| Credencial inválida (< 5 tentativas) | 401 "E-mail ou senha inválidos" (sem indicar qual está errado) |
| 5ª tentativa inválida consecutiva | Bloquear 15min + notificar profissional por e-mail |
| E-mail não verificado | 403 + opção de reenviar e-mail de verificação |
| TOTP inválido | 401 + conta como tentativa falha |
| Recovery code já utilizado | 401 "Código de recuperação já utilizado" |
| Token de redefinição expirado | 400 + link para solicitar novo |

**Target de Performance**
- `bcrypt` compare (custo 12): ~100ms (intencional — resistência a brute force)
- Login endpoint total: ≤ 500ms
- E-mail de verificação/reset entregue: ≤ 60s via Resend

---

### Requisito 12: Vínculo de Contas

**Objetivo:** Como profissional de saúde, eu quero vincular minha conta Google a uma conta criada por e-mail, para unificar o acesso ao sistema.

#### Critérios de Aceitação
1. When o profissional solicita vincular uma conta Google a um perfil existente criado por e-mail, the Módulo de Autenticação shall verificar a identidade em ambas as contas antes de realizar o vínculo.
2. When as contas são vinculadas com sucesso, the Módulo de Autenticação shall permitir login por qualquer um dos métodos (Google ou e-mail/senha).
3. If o e-mail da conta Google for diferente do e-mail de registro, the Módulo de Autenticação shall solicitar confirmação explícita do profissional antes de vincular.
4. If a conta Google que o profissional deseja vincular já estiver associada a outro perfil no sistema, the Módulo de Autenticação shall rejeitar o vínculo e informar o profissional que aquela conta Google já está em uso.

#### Requisitos Não Funcionais
- O fluxo de vínculo deve exigir autenticação ativa simultânea em ambas as contas para prevenir sequestro de conta por terceiros.
- A operação de vínculo deve ser registrada no log de auditoria com timestamp e IP de origem.

#### Detalhamento para Implementação

**Dados Necessários**
- `professional_id` (conta principal autenticada), `google_account_id` (conta a vincular)
- Verificação de unicidade em `oauth_account`
- `audit_log`: `actor_id`, `action='account_link'`, `ip_address`, `created_at`

**Regras de Validação**
- Ambas as contas com sessões ativas simultaneamente (AC 12.1)
- `google_account_id` não presente em `oauth_account` com `professional_id` diferente (AC 12.4)
- E-mails diferentes → confirmação explícita obrigatória antes de vincular (AC 12.3)
- Operação idempotente: contas já vinculadas → 200 sem erro

**Resolução de Erros**
| Situação | Resposta |
|---|---|
| Google já vinculado a outro perfil | 409 "Esta conta Google já está em uso por outro perfil" (AC 12.4) |
| Sessão expirada durante o fluxo | 401 + reiniciar fluxo de vínculo |
| Confirmação recusada (e-mails diferentes) | Cancelar sem vínculo; sem alterar dados |
| Falha no registro do AuditLog | Rollback do vínculo (auditoria é obrigatória para esta operação) |

**Target de Performance**
- Verificação de unicidade por `google_account_id`: ≤ 50ms
- Registro no AuditLog: síncrono, ≤ 100ms
- Fluxo completo de vínculo: ≤ 3s

---

### Requisito 13: Checkout e Processamento de Pagamento

**Objetivo:** Como profissional de saúde, eu quero assinar um plano de forma rápida e segura com cartão de crédito ou Pix, para começar a usar o sistema sem fricção.

#### Critérios de Aceitação
1. When o profissional seleciona um plano de assinatura (Mensal, Semestral ou Anual), the Serviço de Pagamento shall exibir a tela de checkout com opções de pagamento por cartão de crédito e Pix.
2. When o pagamento é processado com sucesso, the Serviço de Pagamento shall ativar o plano imediatamente e enviar confirmação por e-mail.
3. The Serviço de Pagamento shall renovar a assinatura automaticamente ao final de cada ciclo, processando a cobrança no método de pagamento registrado.
4. If o pagamento falhar na renovação, the Serviço de Pagamento shall notificar o profissional e conceder um período de carência antes de suspender o acesso.
5. If a transação de pagamento falhar durante o checkout, the Serviço de Pagamento shall exibir mensagem de erro clara e permitir nova tentativa.
6. If o profissional com trial ativo selecionar um plano pago, the Serviço de Pagamento shall informar claramente se o trial será encerrado imediatamente com o início do plano pago ou se o plano passará a valer após o vencimento do trial.
7. When o profissional faz upgrade ou downgrade de plano durante um ciclo de cobrança ativo, the Serviço de Pagamento shall aplicar crédito proporcional ao período não utilizado do plano atual na próxima cobrança.

#### Requisitos Não Funcionais
- Dados de cartão de crédito **nunca devem trafegar pelos servidores do Próxima Consulta**; a tokenização deve ser realizada diretamente via gateway PCI DSS certificado.
- O timeout de processamento de uma transação deve ser de no máximo **30 segundos** antes de retornar erro ao usuário.

#### Detalhamento para Implementação

**Dados Necessários**
- `professional_id`, `plano` (monthly | semiannual | annual), `card_token` (gerado via Asaas.js no browser — nunca o número real)
- `asaas_customer_id`, `asaas_subscription_id`
- `subscription`: `status`, `current_period_end`
- `payment`: `amount`, `method`, `status`, `asaas_payment_id` (imutável), `paid_at`
- `idempotency_key` por tentativa de checkout

**Regras de Validação**
- Dados de cartão nunca atingem o backend — apenas `card_token` do Asaas.js (RNF)
- Webhook Asaas: `authToken` no header com comparação constant-time (evita timing attack)
- `asaas_payment_id` único por `payment` (idempotência de webhooks duplicados)
- Sem assinatura ativa duplicada para o mesmo `professional_id`

**Resolução de Erros**
| Situação | Resposta |
|---|---|
| Falha no checkout | 402 com mensagem clara + opção de nova tentativa (AC 13.5) |
| Timeout > 30s | 408 "Não foi possível processar. Tente novamente." |
| Falha na renovação automática | Período de carência (ex: 3 dias) + notificação; após carência → `suspended` (AC 13.4) |
| Webhook duplicado | Upsert por `asaas_payment_id` — processar uma vez, ignorar demais |
| Webhook `authToken` inválido | 401 + log de alerta de segurança; sem processar |

**Target de Performance**
- Timeout de transação: ≤ 30s
- Ativação do plano após confirmação: ≤ 5s
- Processamento de webhook Asaas: 200 imediato + processamento assíncrono via BullMQ

---

### Requisito 14: Painel de Faturamento

**Objetivo:** Como profissional de saúde, eu quero gerenciar minha assinatura e dados de pagamento em um painel dedicado, para ter controle financeiro do serviço.

#### Critérios de Aceitação
1. When o profissional acessa o painel de faturamento, the Serviço de Pagamento shall exibir o plano atual, data de renovação e histórico de cobranças.
2. When o profissional altera o método de pagamento, the Serviço de Pagamento shall atualizar os dados e utilizá-los na próxima cobrança.
3. When o profissional solicita cancelamento da assinatura, the Serviço de Pagamento shall processar o cancelamento mantendo o acesso até o final do ciclo pago.

#### Requisitos Não Funcionais
- O histórico de cobranças deve ser **imutável e auditável**; nenhum registro financeiro pode ser alterado ou excluído retroativamente.

#### Detalhamento para Implementação

**Dados Necessários**
- `subscription`: `plan`, `status`, `current_period_end`
- `payment` history: `amount`, `method`, `status`, `paid_at`, `asaas_payment_id` (append-only)
- Método de pagamento mascarado: últimos 4 dígitos ou tipo PIX (sem dados sensíveis)
- `asaas_customer_id` para operações via Asaas API

**Regras de Validação**
- Tabela `payment` é append-only: sem UPDATE/DELETE (RNF)
- Cancelamento permitido somente com `subscription.status = 'active'`
- Alteração de método: novo `card_token` válido via Asaas.js antes de atualizar
- Acesso restrito ao `professional_id` autenticado

**Resolução de Erros**
| Situação | Resposta |
|---|---|
| Falha ao buscar histórico da Asaas API | Exibir dados locais do banco como fallback |
| Cancelamento falhou na API Asaas | Manter status atual + retornar erro ao usuário |
| Alteração de método de pagamento falhou | Manter método anterior + notificar usuário |
| Tentativa de modificar registro histórico | 405 Method Not Allowed |

**Target de Performance**
- Carregamento do painel: ≤ 2s
- Histórico de cobranças (query paginada): ≤ 300ms
- Operações de cancelamento/alteração (inclui chamada Asaas): ≤ 5s

---

### Requisito 15: Período de Teste Gratuito (Free Trial)

**Objetivo:** Como profissional de saúde, eu quero experimentar todas as funcionalidades do sistema gratuitamente por 7 dias sem precisar informar cartão de crédito, para avaliar se o produto atende minhas necessidades.

#### Critérios de Aceitação
1. When um novo profissional completa o registro, the Serviço de Pagamento shall ativar automaticamente o período de teste de 7 dias com acesso completo a todas as funcionalidades.
2. The Serviço de Pagamento shall não exigir dados de cartão de crédito para iniciar o período de teste.
3. While o período de teste está ativo, the Painel Web shall exibir os dias restantes do trial de forma visível.
4. When faltam 2 dias para o fim do período de teste, the Serviço de Pagamento shall enviar notificação ao profissional convidando-o a assinar um plano.
5. When o período de teste expira sem assinatura, the Serviço de Pagamento shall restringir o acesso às funcionalidades e direcionar o profissional para a tela de planos.

#### Requisitos Não Funcionais
- O sistema deve impedir múltiplos trials para o mesmo profissional, verificando duplicidade por e-mail e por número de telefone vinculado.
- A expiração do trial é processada por um job agendado periódico (ex: a cada hora); portanto, o bloqueio de acesso pode ocorrer com até **1 hora de atraso** em relação ao momento exato de vencimento. Essa tolerância é aceitável dado que a duração do trial é de 7 dias.

#### Detalhamento para Implementação

**Dados Necessários**
- `professional_id`, `email`, `phone_number` (para deduplicação)
- `subscription`: `status='trial'`, `trial_starts_at`, `trial_ends_at` (= starts_at + 7 dias)
- `notification_2d_sent` (boolean, controle de notificação de 2 dias)

**Regras de Validação**
- Deduplicação por `email` AND por `phone_number` antes de ativar (RNF)
- Sem exigência de dados de cartão (AC 15.2)
- 1 trial por profissional — sem reativação após uso
- `checkAccess()`: `trial_ends_at ≥ now() AND status = 'trial'` → libera; caso contrário → bloqueia

**Resolução de Erros**
| Situação | Resposta |
|---|---|
| Segundo trial detectado (mesmo e-mail ou telefone) | 409 "Você já utilizou o período de teste. Selecione um plano para continuar." |
| `TrialExpirationJob` falhou | Retry no próximo ciclo do cron (tolerância ≤ 1h, explícita no RNF) |
| Notificação de 2 dias falhou (Resend) | Retry 3×; se persistir → log + trial continua normalmente |
| Acesso negado pós-trial | Redirect para `/planos` com banner "Seu período de teste expirou" |

**Target de Performance**
- Ativação do trial após registro: ≤ 500ms (síncrona)
- `checkAccess()`: ≤ 50ms (índice em `subscription.professional_id`)
- Expiração: job a cada hora; atraso máximo aceitável de 1h (RNF explícito)
