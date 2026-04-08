import { randomUUID } from 'crypto';
import type { WhatsAppInboundPayload, IWhatsAppGateway } from '../infra/ports/whatsapp-gateway.port';
import type { AITriageService } from './ai-triage.service';
import type { BookingService } from '../booking/booking.service';
import type { SlotReservationService } from '../booking/slot-reservation.service';
import type { PatientService } from '../patient/patient.service';
import type { IConversationStateStore } from './ports/conversation-state.store.port';
import type { ISlotQuery, SlotOption } from './ports/slot-query.port';
import type { ConversationSession } from './conversation.types';

const MAX_RECENT_MESSAGES = 10;
const SLOTS_TO_OFFER = 5;

const MSG_FALLBACK = 'Desculpe, estou com dificuldades técnicas no momento. Tente novamente em alguns instantes ou entre em contato com o consultório diretamente.';
const MSG_UNCLEAR = 'Desculpe, não entendi bem o que você precisa. Você gostaria de:\n1. Agendar uma consulta\n2. Cancelar ou remarcar\n3. Obter informações';
const MSG_ESCALATED = 'Certo! Vou chamar o profissional para continuar o seu atendimento. Aguarde um momento, por favor.';
const MSG_NO_SLOTS = 'Infelizmente não há horários disponíveis para os próximos dias. Deseja entrar na lista de espera?';

export class ConversationOrchestrator {
  constructor(
    private readonly stateStore: IConversationStateStore,
    private readonly whatsapp: IWhatsAppGateway,
    private readonly aiTriage: AITriageService,
    private readonly bookingService: BookingService,
    private readonly slotReservation: SlotReservationService,
    private readonly patientService: PatientService,
    private readonly slotQuery: ISlotQuery,
    private readonly clock: () => Date = () => new Date(),
  ) {}

  async handleIncomingMessage(
    payload: WhatsAppInboundPayload,
    professionalId: string,
  ): Promise<void> {
    const { from: patientPhone, text, messageId } = payload;

    // Ensure patient exists
    const patientResult = await this.patientService.findOrCreateByPhone(patientPhone, professionalId);
    if (!patientResult.ok) {
      await this.whatsapp.sendTextMessage(patientPhone, MSG_FALLBACK);
      return;
    }
    const patient = patientResult.value;

    // Load conversation session
    let session = await this.stateStore.load(patientPhone, professionalId);
    if (!session) {
      session = this.newSession(patient.id, professionalId);
    }

    const userText = text?.trim() ?? '';
    session.recentMessages.push({ role: 'user', content: userText });
    if (session.recentMessages.length > MAX_RECENT_MESSAGES) {
      session.recentMessages = session.recentMessages.slice(-MAX_RECENT_MESSAGES);
    }

    try {
      await this.dispatch(session, patientPhone, professionalId, userText, messageId);
    } catch {
      await this.whatsapp.sendTextMessage(patientPhone, MSG_FALLBACK);
    } finally {
      await this.stateStore.save(patientPhone, professionalId, session);
    }
  }

  // ---------------------------------------------------------------------------
  // State machine dispatcher
  // ---------------------------------------------------------------------------

  private async dispatch(
    session: ConversationSession,
    patientPhone: string,
    professionalId: string,
    userText: string,
    messageId: string,
  ): Promise<void> {
    switch (session.state) {
      case 'IDLE':
      case 'CONCLUDED':
      case 'FAQ':
        return this.handleTriaging(session, patientPhone, professionalId, userText);

      case 'TRIAGING':
        return this.handleTriaging(session, patientPhone, professionalId, userText);

      case 'BOOKING_COLLECTING':
        return this.handleBookingCollecting(session, patientPhone, professionalId, userText, messageId);

      case 'BOOKING_CONFIRMING':
        return this.handleBookingConfirming(session, patientPhone, professionalId, userText);

      case 'CANCELLING':
        return this.handleCancelling(session, patientPhone, professionalId, userText);

      default:
        await this.whatsapp.sendTextMessage(patientPhone, MSG_UNCLEAR);
    }
  }

  // ---------------------------------------------------------------------------
  // State handlers
  // ---------------------------------------------------------------------------

  private async handleTriaging(
    session: ConversationSession,
    patientPhone: string,
    professionalId: string,
    userText: string,
  ): Promise<void> {
    session.state = 'TRIAGING';

    const intentResult = await this.aiTriage.detectIntent(userText, {
      recentMessages: session.recentMessages.slice(-6),
    });

    if (!intentResult.ok) {
      await this.whatsapp.sendTextMessage(patientPhone, MSG_FALLBACK);
      return;
    }

    const { intent } = intentResult.value;

    if (intent === 'unclear') {
      const reply = await this.aiTriage.generateResponse(userText, {
        recentMessages: session.recentMessages.slice(-6),
      });
      await this.whatsapp.sendTextMessage(
        patientPhone,
        reply.ok ? reply.value : MSG_UNCLEAR,
      );
      return;
    }

    if (intent === 'human_handoff') {
      session.state = 'ESCALATED';
      await this.whatsapp.sendTextMessage(patientPhone, MSG_ESCALATED);
      return;
    }

    if (intent === 'booking') {
      session.state = 'BOOKING_COLLECTING';
      await this.offerSlots(session, patientPhone, professionalId);
      return;
    }

    if (intent === 'cancellation') {
      session.state = 'CANCELLING';
      await this.whatsapp.sendTextMessage(
        patientPhone,
        'Qual consulta você deseja cancelar? Informe o dia e horário.',
      );
      return;
    }

    // FAQ / general_info / etc.
    session.state = 'FAQ';
    const reply = await this.aiTriage.generateResponse(userText, {
      recentMessages: session.recentMessages.slice(-6),
    });
    await this.whatsapp.sendTextMessage(
      patientPhone,
      reply.ok ? reply.value : MSG_FALLBACK,
    );
  }

  private async handleBookingCollecting(
    session: ConversationSession,
    patientPhone: string,
    professionalId: string,
    userText: string,
    messageId: string,
  ): Promise<void> {
    // Try to parse a slot selection (e.g., "1", "2", ... matching offered slot index)
    const slotIndex = parseInt(userText, 10) - 1;
    const slots = await this.slotQuery.getNextAvailableSlots(professionalId, this.clock(), SLOTS_TO_OFFER);

    if (isNaN(slotIndex) || slotIndex < 0 || slotIndex >= slots.length) {
      // Ask again
      await this.offerSlots(session, patientPhone, professionalId);
      return;
    }

    const chosen = slots[slotIndex];
    const sessionId = messageId;

    const reserveResult = await this.slotReservation.reserve(chosen.slotId, sessionId);

    if (!reserveResult.ok) {
      await this.whatsapp.sendTextMessage(
        patientPhone,
        'Esse horário acabou de ser reservado por outro paciente. Escolha outro:',
      );
      await this.offerSlots(session, patientPhone, professionalId);
      return;
    }

    session.state = 'BOOKING_CONFIRMING';
    session.pendingSlotId = chosen.slotId;
    session.pendingSlotStartAt = chosen.startAt.toISOString();
    session.pendingSlotEndAt = chosen.endAt.toISOString();
    session.idempotencyKey = randomUUID();

    await this.whatsapp.sendTextMessage(
      patientPhone,
      `Ótimo! Você selecionou ${chosen.label}. Confirma o agendamento? (Sim/Não)`,
    );
  }

  private async handleBookingConfirming(
    session: ConversationSession,
    patientPhone: string,
    professionalId: string,
    userText: string,
  ): Promise<void> {
    const confirmed = /^sim|yes|confirmo|ok|s$/i.test(userText.trim());
    const refused = /^não|nao|no|n$/i.test(userText.trim());

    if (!confirmed && !refused) {
      await this.whatsapp.sendTextMessage(
        patientPhone,
        'Por favor, responda Sim para confirmar ou Não para escolher outro horário.',
      );
      return;
    }

    if (refused) {
      // Release slot and go back to collecting
      if (session.pendingSlotId) {
        await this.slotReservation.release(session.pendingSlotId, session.idempotencyKey ?? '');
      }
      session.state = 'BOOKING_COLLECTING';
      session.pendingSlotId = null;
      session.pendingSlotStartAt = null;
      session.pendingSlotEndAt = null;
      await this.offerSlots(session, patientPhone, professionalId);
      return;
    }

    // Confirmed — create appointment
    if (!session.pendingSlotStartAt || !session.pendingSlotEndAt || !session.idempotencyKey) {
      session.state = 'IDLE';
      await this.whatsapp.sendTextMessage(patientPhone, MSG_FALLBACK);
      return;
    }

    const appointmentResult = await this.bookingService.createAppointment({
      professionalId,
      patientId: session.patientId,
      startAt: new Date(session.pendingSlotStartAt),
      endAt: new Date(session.pendingSlotEndAt),
      serviceType: session.collectedServiceType ?? 'consulta',
      idempotencyKey: session.idempotencyKey,
    });

    if (!appointmentResult.ok) {
      await this.whatsapp.sendTextMessage(
        patientPhone,
        'Não foi possível confirmar o agendamento. Por favor, tente novamente.',
      );
      session.state = 'BOOKING_COLLECTING';
      return;
    }

    // Release slot lock (appointment is now in the DB)
    await this.slotReservation.release(session.pendingSlotId!, session.idempotencyKey);

    session.state = 'CONCLUDED';
    session.pendingSlotId = null;

    const startAt = new Date(session.pendingSlotStartAt);
    const dateStr = startAt.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
    const timeStr = startAt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    await this.whatsapp.sendTextMessage(
      patientPhone,
      `Consulta confirmada! ✅\n📅 ${dateStr} às ${timeStr}\n\nAté lá!`,
    );
  }

  private async handleCancelling(
    session: ConversationSession,
    patientPhone: string,
    _professionalId: string,
    userText: string,
  ): Promise<void> {
    const confirmed = /^sim|yes|confirmo|ok|s$/i.test(userText.trim());
    const refused = /^não|nao|no|n$/i.test(userText.trim());

    if (!confirmed && !refused) {
      await this.whatsapp.sendTextMessage(
        patientPhone,
        'Confirma o cancelamento? (Sim/Não)',
      );
      return;
    }

    if (refused) {
      session.state = 'IDLE';
      await this.whatsapp.sendTextMessage(patientPhone, 'Cancelamento não realizado. Posso ajudar com mais alguma coisa?');
      return;
    }

    if (session.targetAppointmentId) {
      await this.bookingService.cancelAppointment(session.targetAppointmentId, 'patient');
    }

    session.state = 'CONCLUDED';
    await this.whatsapp.sendTextMessage(patientPhone, 'Consulta cancelada com sucesso. Até logo!');
  }

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  private async offerSlots(
    session: ConversationSession,
    patientPhone: string,
    professionalId: string,
  ): Promise<void> {
    const slots = await this.slotQuery.getNextAvailableSlots(professionalId, this.clock(), SLOTS_TO_OFFER);

    if (slots.length === 0) {
      await this.whatsapp.sendTextMessage(patientPhone, MSG_NO_SLOTS);
      return;
    }

    const list = slots.map((s, i) => `${i + 1}. ${s.label}`).join('\n');
    await this.whatsapp.sendTextMessage(
      patientPhone,
      `Aqui estão os próximos horários disponíveis:\n${list}\n\nDigite o número do horário desejado.`,
    );
  }

  private newSession(patientId: string, professionalId: string): ConversationSession {
    return {
      conversationId: randomUUID(),
      patientId,
      professionalId,
      state: 'IDLE',
      pendingSlotId: null,
      pendingSlotStartAt: null,
      pendingSlotEndAt: null,
      collectedServiceType: null,
      targetAppointmentId: null,
      recentMessages: [],
      idempotencyKey: null,
    };
  }
}
