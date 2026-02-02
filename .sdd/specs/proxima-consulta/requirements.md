# Documento de Requisitos

## Introdução

O **Próxima Consulta** é uma aplicação web SaaS voltada para profissionais autônomos da saúde (dentistas, fisioterapeutas, entre outros) que automatiza a gestão de agenda e o atendimento de pacientes via WhatsApp utilizando IA Generativa. O sistema elimina a necessidade de uma secretária dedicada, reduzindo custos operacionais e aumentando a fidelização de pacientes através de um atendimento disponível 24/7.

## Requisitos

### Requisito 1: Configuração de Disponibilidade

**Objetivo:** Como profissional de saúde, eu quero configurar meus dias, horários de atendimento e duração padrão de consultas, para que o sistema ofereça apenas horários válidos aos pacientes.

#### Critérios de Aceitação
1. When o profissional acessa a tela de configuração de agenda, the Sistema de Agenda shall exibir os dias da semana com opção de ativar/desativar cada dia individualmente.
2. When o profissional define horário de início e fim para um dia, the Sistema de Agenda shall validar que o horário de fim é posterior ao horário de início.
3. When o profissional define a duração padrão de consulta, the Sistema de Agenda shall calcular e exibir os slots disponíveis automaticamente.
4. When o profissional salva a configuração de disponibilidade, the Sistema de Agenda shall atualizar imediatamente os horários oferecidos aos pacientes via WhatsApp.
5. The Sistema de Agenda shall permitir configurar intervalos entre consultas (ex: 10 minutos de descanso entre atendimentos).

---

### Requisito 2: Sincronização de Calendário Externo

**Objetivo:** Como profissional de saúde, eu quero sincronizar minha agenda com Google Calendar ou Outlook, para que compromissos pessoais não conflitem com horários de atendimento.

#### Critérios de Aceitação
1. When o profissional conecta sua conta Google Calendar ou Outlook, the Serviço de Calendário shall importar os eventos existentes e bloquear os horários correspondentes na agenda do sistema.
2. When um novo evento é criado no calendário externo, the Serviço de Calendário shall atualizar a disponibilidade no Próxima Consulta em tempo hábil.
3. When uma consulta é agendada no Próxima Consulta, the Serviço de Calendário shall criar o evento correspondente no calendário externo do profissional.
4. If a sincronização com o calendário externo falhar, the Serviço de Calendário shall notificar o profissional e manter a última disponibilidade conhecida.
5. When o profissional desconecta o calendário externo, the Serviço de Calendário shall remover a integração sem afetar consultas já agendadas.

---

### Requisito 3: Dashboard de Visualização da Agenda

**Objetivo:** Como profissional de saúde, eu quero visualizar minha agenda do dia e da semana com o status de cada paciente, para que eu tenha controle completo dos atendimentos.

#### Critérios de Aceitação
1. When o profissional acessa o dashboard, the Painel Web shall exibir a agenda do dia atual com todos os agendamentos e seus respectivos status (confirmado, pendente, cancelado).
2. When o profissional alterna para a visão semanal, the Painel Web shall exibir a agenda completa da semana com indicadores visuais de ocupação.
3. When o status de uma consulta é alterado (confirmação, cancelamento), the Painel Web shall atualizar a visualização em tempo real sem necessidade de recarregar a página.
4. The Painel Web shall exibir o nome do paciente, horário e tipo de consulta em cada slot agendado.
5. When o profissional clica em um agendamento, the Painel Web shall exibir os detalhes completos do paciente e da consulta.

---

### Requisito 4: Triagem Inteligente via WhatsApp

**Objetivo:** Como paciente, eu quero enviar mensagens em linguagem natural pelo WhatsApp e ser compreendido pela IA, para que minha necessidade seja atendida rapidamente sem falar com uma pessoa.

#### Critérios de Aceitação
1. When um paciente envia uma mensagem pelo WhatsApp, the Motor de IA shall processar a mensagem em linguagem natural e identificar a intenção (agendamento, cancelamento, reagendamento, dúvida sobre preço, informação geral).
2. When a IA identifica a intenção do paciente, the Motor de IA shall direcionar o fluxo de conversa para o processo correto (agendamento, cancelamento, FAQ).
3. If a IA não conseguir identificar a intenção do paciente com confiança suficiente, the Motor de IA shall solicitar esclarecimento ao paciente com uma mensagem amigável.
4. If a mensagem do paciente requer atendimento humano, the Motor de IA shall notificar o profissional e informar o paciente que será atendido em breve.
5. The Motor de IA shall responder em português brasileiro com linguagem natural, cordial e profissional.

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

---

### Requisito 6: Confirmação Automática e Lembretes

**Objetivo:** Como profissional de saúde, eu quero que o sistema envie lembretes automáticos aos pacientes antes da consulta, para reduzir faltas e no-shows.

#### Critérios de Aceitação
1. When faltam 24 horas para uma consulta agendada, the Serviço de Lembretes shall enviar uma mensagem automática via WhatsApp solicitando confirmação do paciente (Sim/Não).
2. When o paciente confirma presença respondendo ao lembrete, the Serviço de Lembretes shall atualizar o status da consulta para "confirmado" no dashboard.
3. When o paciente indica que não poderá comparecer, the Serviço de Lembretes shall iniciar o fluxo de reagendamento ou cancelamento automaticamente.
4. If o paciente não responder ao lembrete dentro de um período configurável, the Serviço de Lembretes shall enviar um segundo lembrete de follow-up.
5. The Serviço de Lembretes shall permitir ao profissional configurar a antecedência dos lembretes (ex: 24h, 48h).

---

### Requisito 7: Cadastro Automático de Pacientes

**Objetivo:** Como profissional de saúde, eu quero que pacientes sejam cadastrados automaticamente a partir do primeiro contato via WhatsApp, para eliminar trabalho manual de registro.

#### Critérios de Aceitação
1. When um paciente entra em contato pela primeira vez via WhatsApp, the Módulo CRM shall criar uma ficha de paciente com o número de telefone capturado automaticamente.
2. When a IA coleta informações do paciente durante a conversa (nome, data de nascimento, etc.), the Módulo CRM shall atualizar a ficha do paciente progressivamente.
3. If um paciente já cadastrado entrar em contato, the Módulo CRM shall identificá-lo pelo número de WhatsApp e recuperar sua ficha existente.
4. The Módulo CRM shall permitir ao profissional visualizar e editar as fichas de pacientes pelo painel web.

---

### Requisito 8: Histórico de Atendimento

**Objetivo:** Como profissional de saúde, eu quero consultar o histórico completo de interações e consultas de cada paciente, para oferecer um atendimento mais personalizado.

#### Critérios de Aceitação
1. The Módulo CRM shall registrar todas as interações via WhatsApp de cada paciente com data e hora.
2. The Módulo CRM shall registrar todas as consultas realizadas com data, horário e status (compareceu, faltou, cancelou).
3. When o profissional acessa a ficha de um paciente, the Módulo CRM shall exibir o histórico completo de atendimentos em ordem cronológica.
4. The Módulo CRM shall permitir ao profissional adicionar anotações manuais ao histórico do paciente.

---

### Requisito 9: Lista de Espera Inteligente

**Objetivo:** Como profissional de saúde, eu quero que pacientes interessados sejam notificados quando surgir uma vaga de última hora, para maximizar a ocupação da agenda.

#### Critérios de Aceitação
1. When não há horários disponíveis para a data desejada pelo paciente, the Motor de IA shall oferecer a opção de entrar na lista de espera.
2. When uma consulta é cancelada e um horário é liberado, the Serviço de Lista de Espera shall notificar automaticamente via WhatsApp os pacientes na lista de espera para aquele período.
3. When um paciente da lista de espera aceita o horário disponibilizado, the Serviço de Lista de Espera shall realizar o agendamento automaticamente e remover o paciente da lista.
4. If nenhum paciente da lista de espera aceitar o horário dentro de um período configurável, the Serviço de Lista de Espera shall disponibilizar o horário para agendamento geral.

---

### Requisito 10: Social Login (OAuth2) com Google

**Objetivo:** Como profissional de saúde, eu quero fazer login com minha conta Google, para acessar o sistema de forma rápida e segura.

#### Critérios de Aceitação
1. When o profissional clica em "Entrar com Google" na tela de login, the Módulo de Autenticação shall iniciar o fluxo OAuth2 com a conta Google do usuário.
2. When o login OAuth2 é concluído com sucesso, the Módulo de Autenticação shall importar automaticamente nome, e-mail e foto de perfil da conta Google.
3. If o profissional não possui conta no sistema, the Módulo de Autenticação shall criar uma nova conta automaticamente a partir dos dados do Google.
4. If a autenticação OAuth2 falhar, the Módulo de Autenticação shall exibir mensagem de erro e oferecer alternativas de login.

---

### Requisito 11: Login Tradicional com E-mail e Senha

**Objetivo:** Como profissional de saúde, eu quero criar uma conta com e-mail e senha e protegê-la com verificação em dois fatores, para ter uma opção de acesso independente do Google.

#### Critérios de Aceitação
1. When o profissional se registra com e-mail e senha, the Módulo de Autenticação shall enviar um e-mail de verificação para confirmar o endereço.
2. When o profissional ativa a verificação em dois fatores (2FA), the Módulo de Autenticação shall solicitar o código 2FA a cada login subsequente.
3. The Módulo de Autenticação shall exigir senhas com no mínimo 8 caracteres, incluindo letras e números.
4. If o profissional esquecer a senha, the Módulo de Autenticação shall permitir recuperação via e-mail com link seguro de redefinição.

---

### Requisito 12: Vínculo de Contas

**Objetivo:** Como profissional de saúde, eu quero vincular minha conta Google a uma conta criada por e-mail, para unificar o acesso ao sistema.

#### Critérios de Aceitação
1. When o profissional solicita vincular uma conta Google a um perfil existente criado por e-mail, the Módulo de Autenticação shall verificar a identidade em ambas as contas antes de realizar o vínculo.
2. When as contas são vinculadas com sucesso, the Módulo de Autenticação shall permitir login por qualquer um dos métodos (Google ou e-mail/senha).
3. If o e-mail da conta Google for diferente do e-mail de registro, the Módulo de Autenticação shall solicitar confirmação explícita do profissional antes de vincular.

---

### Requisito 13: Checkout e Processamento de Pagamento

**Objetivo:** Como profissional de saúde, eu quero assinar um plano de forma rápida e segura com cartão de crédito ou Pix, para começar a usar o sistema sem fricção.

#### Critérios de Aceitação
1. When o profissional seleciona um plano de assinatura (Mensal, Semestral ou Anual), the Serviço de Pagamento shall exibir a tela de checkout com opções de pagamento por cartão de crédito e Pix.
2. When o pagamento é processado com sucesso, the Serviço de Pagamento shall ativar o plano imediatamente e enviar confirmação por e-mail.
3. The Serviço de Pagamento shall renovar a assinatura automaticamente ao final de cada ciclo, processando a cobrança no método de pagamento registrado.
4. If o pagamento falhar na renovação, the Serviço de Pagamento shall notificar o profissional e conceder um período de carência antes de suspender o acesso.
5. If a transação de pagamento falhar durante o checkout, the Serviço de Pagamento shall exibir mensagem de erro clara e permitir nova tentativa.

---

### Requisito 14: Painel de Faturamento

**Objetivo:** Como profissional de saúde, eu quero gerenciar minha assinatura e dados de pagamento em um painel dedicado, para ter controle financeiro do serviço.

#### Critérios de Aceitação
1. When o profissional acessa o painel de faturamento, the Serviço de Pagamento shall exibir o plano atual, data de renovação e histórico de cobranças.
2. When o profissional solicita download de nota fiscal, the Serviço de Pagamento shall gerar e disponibilizar o documento em formato PDF.
3. When o profissional altera o método de pagamento, the Serviço de Pagamento shall atualizar os dados e utilizá-los na próxima cobrança.
4. When o profissional solicita cancelamento da assinatura, the Serviço de Pagamento shall processar o cancelamento mantendo o acesso até o final do ciclo pago.

---

### Requisito 15: Período de Teste Gratuito (Free Trial)

**Objetivo:** Como profissional de saúde, eu quero experimentar todas as funcionalidades do sistema gratuitamente por 7 dias sem precisar informar cartão de crédito, para avaliar se o produto atende minhas necessidades.

#### Critérios de Aceitação
1. When um novo profissional completa o registro, the Serviço de Pagamento shall ativar automaticamente o período de teste de 7 dias com acesso completo a todas as funcionalidades.
2. The Serviço de Pagamento shall não exigir dados de cartão de crédito para iniciar o período de teste.
3. While o período de teste está ativo, the Painel Web shall exibir os dias restantes do trial de forma visível.
4. When faltam 2 dias para o fim do período de teste, the Serviço de Pagamento shall enviar notificação ao profissional convidando-o a assinar um plano.
5. When o período de teste expira sem assinatura, the Serviço de Pagamento shall restringir o acesso às funcionalidades e direcionar o profissional para a tela de planos.
