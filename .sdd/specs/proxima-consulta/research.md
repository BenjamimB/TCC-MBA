# Pesquisa e Decisões de Design

---
**Purpose**: Capturar descobertas, investigações arquiteturais e justificativas que embasam o design técnico.
---

## Resumo

- **Feature**: `proxima-consulta`
- **Escopo da Descoberta**: Greenfield — nova aplicação SaaS completa
- **Principais Descobertas**:
  1. **WhatsApp API**: Apenas a Meta WhatsApp Cloud API é adequada para um SaaS de saúde em produção; APIs não-oficiais (Z-API, Evolution API modo Baileys) carregam risco inaceitável de banimento de número para um produto B2B.
  2. **Integração AI**: O padrão Tool Calling + State Machine impede alucinações do LLM em fluxos de agendamento; dividir entre modelo de roteamento rápido (Claude Haiku) e modelo de orquestração (Claude Sonnet) reduz latência e custo.
  3. **Pagamento**: Asaas é a escolha ideal para SaaS brasileiro voltado a profissionais autônomos de saúde — único entre os avaliados que suporta cobrança recorrente via PIX nativamente.
  4. **Reserva de Slot**: Redis `SET NX EX` com Lua para liberação atômica, combinado com constraint `UNIQUE` no banco como defesa final, é o padrão correto para lock distribuído de slots.

---

## Log de Pesquisa

### WhatsApp Business API — Opções para SaaS Brasileiro (2025)

- **Contexto**: O sistema depende fundamentalmente do WhatsApp para atendimento 24/7. A escolha da API impacta confiabilidade, custo e risco operacional.
- **Fontes Consultadas**:
  - https://developers.facebook.com/docs/whatsapp/cloud-api
  - https://developers.facebook.com/docs/whatsapp/pricing
  - https://www.twilio.com/docs/whatsapp
  - Documentação Z-API e Evolution API
- **Descobertas**:
  - **Meta Cloud API (oficial)**: Precificação por conversa (categorias: Marketing, Utility, Authentication, Service). 1.000 conversas de serviço gratuitas/mês. Exige Meta Business Manager verificado. Baixo risco de banimento se as políticas forem respeitadas (opt-in, qualidade do número).
  - **Twilio WhatsApp**: Camada adicional de custo sobre a Meta ($0,005/mensagem + taxa Meta). Sandbox para testes. Mais usado por times internacionais; não dominante no Brasil.
  - **Z-API**: Protocolo não-oficial (WhatsApp Web/Baileys). R$99,99/mês. Risco de banimento ALTO e imprevisível. Viola os Termos de Serviço do WhatsApp. Popular entre PMEs brasileiras para prototipagem, mas inaceitável para SaaS de saúde.
  - **Evolution API**: Open source, auto-hospedado. Suporta Baileys (risco alto) e WABA oficial (risco baixo). A dualidade é útil para migração gradual, mas o suporte community é limitado.
- **Implicações**: Utilizar Meta WhatsApp Cloud API diretamente. Todas as mensagens business-initiated fora da janela de 24h exigem templates pré-aprovados — o design deve contemplar templates para lembretes e confirmações.

---

### Padrões de Integração de IA para Fluxos de Agendamento Conversacional (2024-2025)

- **Contexto**: O núcleo do produto é um bot de IA que entende intenções e conduz fluxos multi-etapa. A escolha do padrão define confiabilidade, latência e capacidade de manutenção.
- **Fontes Consultadas**:
  - https://www.anthropic.com/research/building-effective-agents
  - Documentação OpenAI Function Calling
  - Documentação Anthropic Tool Use
- **Descobertas**:
  - **Padrão recomendado**: Roteamento de Intenção + State Machine explícita + Tool Calling.
  - O LLM *coleta informações* e *gera texto*; a máquina de estados e o backend *tomam decisões* e *executam ações*. Isso elimina o principal risco de alucinação (confirmar agendamento que não existe no banco).
  - Modelo de roteamento rápido (Haiku/GPT-4o-mini) para classificar intenção inicial; modelo orquestrador (Sonnet) para conduzir o fluxo.
  - Tool Calling ancora o LLM em dados reais: `check_availability()`, `reserve_slot()`, `create_booking()` são executados pelo backend com dados reais do banco.
  - Gerenciamento de contexto: estado da conversa armazenado no Redis (TTL 30 min de inatividade); apenas mensagens recentes + estado estruturado enviados ao LLM (evita exceder context window).
- **Implicações**: O ConversationOrchestrator implementa a state machine determinística; o AITriageService faz chamadas ao LLM com tools. Confirmações de agendamento são sempre originadas no BookingService, nunca inferidas pelo LLM.

---

### Reserva Distribuída de Slots com Redis

- **Contexto**: Múltiplos pacientes podem tentar agendar o mesmo slot simultaneamente. É necessário garantir exclusividade sem degradar performance.
- **Fontes Consultadas**:
  - https://redis.io/docs/latest/develop/use/patterns/distributed-locks/
  - https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html
- **Descobertas**:
  - `SET slot:{slotId} {sessionId} NX EX 600` é atômico no Redis. Exatamente um dentre N requisições concorrentes recebe `OK`.
  - Redlock (quorum multi-nó) não é recomendado para este caso de uso: adiciona complexidade e assume ausência de clock drift — premissa que pode falhar em produção.
  - Liberação segura via Lua script: verifica ownership antes de deletar (evita que sessão B libere a reserva da sessão A).
  - A constraint `UNIQUE(professional_id, start_at)` no banco é a última linha de defesa caso Redis e banco divirjam.
  - TTL de 10 minutos para o fluxo de agendamento. Aviso ao paciente aos 8 minutos ("sua reserva expira em 2 minutos").
- **Implicações**: SlotReservationService encapsula toda a lógica Redis. BookingService usa constraint DB como backstop. Fluxo de dois fases: reserva Redis → commit no banco → liberar/confirmar Redis.

---

### Pagamento Recorrente para SaaS Brasileiro — Stripe vs Pagar.me vs Asaas (2025)

- **Contexto**: O produto cobra assinatura mensal/semestral/anual. Profissionais de saúde autônomos brasileiros esperam pagar via PIX. A plataforma deve suportar cobrança recorrente automática.
- **Fontes Consultadas**:
  - https://docs.asaas.com
  - https://docs.stripe.com/payments/pix
  - https://docs.stripe.com/billing
  - https://docs.pagar.me
- **Descobertas**:
  - **Stripe**: Melhor experiência de desenvolvedor do mercado. Suporta PIX (one-time apenas — PIX recorrente não é suportado). Cobrança recorrente via boleto ou cartão. IOF adicional por ser entidade estrangeira. Melhor para SaaS com escala internacional.
  - **Pagar.me (Stone)**: Bom para marketplace/split payments e parcelamento. Documentação menos refinada. Pricing não transparente.
  - **Asaas**: Único entre os três com PIX recorrente nativo. Projetado para PJ brasileiros (MEI, ME). Sem mensalidade de plataforma; taxa por transação (boleto R$0,99; cartão a partir de R$1,99). Webhooks com autenticação obrigatória. Suporte em português. Sandbox disponível.
- **Implicações**: **Asaas** é a escolha para o Próxima Consulta. PIX recorrente é crítico para o público-alvo. O design deve contemplar Webhooks Asaas para eventos de pagamento (confirmação, falha, cancelamento).

---

## Avaliação de Padrões Arquiteturais

| Opção | Descrição | Pontos Fortes | Riscos / Limitações | Notas |
|-------|-----------|---------------|---------------------|-------|
| Monólito Modular | NestJS com módulos por domínio; deploy único | Simples de operar, refatorável, sem complexidade distribuída | Escala vertical limitada (aceitável para MVP) | **Selecionado** — alinha com fase inicial do produto |
| Microserviços | Serviços independentes por domínio | Escala independente, isolamento de falhas | Complexidade operacional excessiva para MVP; requer orquestração | Prematura para este estágio |
| Serverless | Next.js API Routes ou AWS Lambda | Baixo custo ops, auto-scaling | Cold starts incompatíveis com WebSockets/SSE; jobs longos problemáticos | Inadequado para background jobs e conexões persistentes |

---

## Decisões de Design

### Decisão: Meta WhatsApp Cloud API como único canal WhatsApp
- **Contexto**: Produto SaaS B2B na área de saúde requer confiabilidade total do canal de comunicação.
- **Alternativas Consideradas**:
  1. Z-API — barato, fácil, mas viola ToS do WhatsApp; risco de banimento irrecuperável
  2. Twilio WhatsApp — camada adicional de custo; não dominante no Brasil
- **Abordagem Selecionada**: Meta WhatsApp Cloud API direta, sem BSP intermediário
- **Justificativa**: Elimina risco de banimento e dupla cobrança. Fornece webhooks confiáveis e suporte a templates.
- **Trade-offs**: Requer aprovação de templates pré-aprovados para mensagens proativas. Processo de onboarding mais lento (Meta Business Manager).
- **Follow-up**: Definir catálogo de templates (lembrete 24h, confirmação, lista de espera) na fase de implementação.

### Decisão: Asaas como gateway de pagamento
- **Contexto**: Público-alvo (profissionais autônomos de saúde) usa PIX como método primário de pagamento para despesas de negócio.
- **Alternativas Consideradas**:
  1. Stripe — melhor DX, mas PIX não-recorrente e IOF adicional
  2. Pagar.me — valid para marketplace, mas documentação mais limitada
- **Abordagem Selecionada**: Asaas
- **Justificativa**: Único com PIX recorrente nativo; foco em PJ brasileiro; sem mensalidade.
- **Trade-offs**: Ecossistema menor que Stripe; menor comunidade open-source.
- **Follow-up**: Validar limites de rate de webhooks em ambiente de carga na fase de implementação.

### Decisão: Anthropic Claude como LLM (Haiku para roteamento, Sonnet para orquestração)
- **Contexto**: Latência de resposta ≤5s é requisito não-funcional. Cost-per-conversation precisa ser viável para plano de assinatura.
- **Alternativas Consideradas**:
  1. OpenAI GPT-4o — contexto 128k, ligeiramente mais rápido, mais caro ($5/M tokens input)
  2. Claude Sonnet único — mais simples, latência maior para triagem simples
- **Abordagem Selecionada**: Claude Haiku para detecção de intenção; Claude Sonnet para geração de resposta e tool calling
- **Justificativa**: Haiku (custo ~0,25/M tokens) para a chamada de roteamento rápida; Sonnet (3/M tokens) apenas quando necessário. Contexto 200k do Sonnet cobre históricos longos.
- **Trade-offs**: Maior complexidade no AIGateway (dois modelos). Gestão de prompts separados.
- **Follow-up**: Monitorar custo por conversa e ajustar divisão Haiku/Sonnet conforme métricas reais.

### Decisão: Server-Sent Events (SSE) para atualizações em tempo real do dashboard
- **Contexto**: Dashboard precisa de atualizações em tempo real (status de consultas, novos agendamentos) sem reload de página.
- **Alternativas Consideradas**:
  1. WebSockets (Socket.io) — bidirecional, maior overhead, mais complexo
  2. Polling — simples, mas ineficiente (carga desnecessária no servidor)
- **Abordagem Selecionada**: Server-Sent Events via Next.js
- **Justificativa**: Unidirecional (servidor → cliente) é suficiente para o dashboard. Nativo no browser, sem bibliotecas adicionais. Suportado nativamente pelo Next.js App Router (Route Handlers com streaming).
- **Trade-offs**: Não suporta comunicação cliente → servidor (mas o dashboard não precisa disto).

---

## Riscos e Mitigações

- **Banimento de número WhatsApp por envio sem opt-in** — Implementar coleta de opt-in explícito no primeiro contato; monitorar quality rating do número continuamente.
- **Latência da IA acima de 5s em horários de pico** — Chamar Haiku primeiro (roteamento ~0,5s); enviar "typing indicator" imediatamente; processar tool calls em paralelo onde possível.
- **Divergência Redis-banco em reserva de slot** — Constraint UNIQUE no banco como backstop; operações idempotentes com chave de idempotência; reconciliação por job periódico.
- **Rate limits do Meta WhatsApp API** — Implementar fila de envio com backoff exponencial; monitorar throughput por número.
- **LGPD: tensão entre direito ao esquecimento e retenção de 5 anos** — Anonimização em vez de exclusão: PII removida, registros de saúde retidos sem identificação pessoal.
- **Expiração imprecisa do trial** — Job BullMQ com verificação a cada hora; tolerância de ±1h documentada nos requisitos e aceitável para trial de 7 dias.

---

## Referências

- [Meta WhatsApp Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api) — documentação oficial da API de mensagens
- [Meta WhatsApp Pricing](https://developers.facebook.com/docs/whatsapp/pricing) — modelo de precificação por conversa
- [Anthropic Building Effective Agents](https://www.anthropic.com/research/building-effective-agents) — padrões de agentes e tool calling
- [Redis Distributed Locks](https://redis.io/docs/latest/develop/use/patterns/distributed-locks/) — padrão SET NX e Redlock
- [Kleppmann on Redlock](https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html) — limitações do Redlock
- [Asaas API Docs](https://docs.asaas.com) — pagamentos recorrentes e PIX no Brasil
- [Stripe PIX](https://docs.stripe.com/payments/pix) — limitações: PIX one-time apenas
- [Stripe Billing](https://docs.stripe.com/billing) — gestão de assinaturas
