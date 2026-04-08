/**
 * Task 6.4 — ConversationOrchestrator unit tests
 *
 * Cobre: transições de estado IDLE→TRIAGING→BOOKING_COLLECTING→BOOKING_CONFIRMING→CONCLUDED,
 * escalation, FAQ, cancelling, e fallback de IA.
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.3, 5.5, 5.9
 */
import { ConversationOrchestrator } from './conversation-orchestrator.service';
import type { IConversationStateStore } from './ports/conversation-state.store.port';
import type { ISlotQuery } from './ports/slot-query.port';
import type { IWhatsAppGateway } from '../infra/ports/whatsapp-gateway.port';
import type { AITriageService } from './ai-triage.service';
import type { BookingService } from '../booking/booking.service';
import type { SlotReservationService } from '../booking/slot-reservation.service';
import type { PatientService } from '../patient/patient.service';
import type { ConversationSession } from './conversation.types';
import type { WhatsAppInboundPayload } from '../infra/ports/whatsapp-gateway.port';

// ---------------------------------------------------------------------------
// Constants / helpers
// ---------------------------------------------------------------------------

const PROF_ID = 'prof-1';
const PATIENT_PHONE = '+5511999990001';
const PATIENT_ID = 'patient-1';
const FIXED_NOW = new Date('2025-06-10T10:00:00.000Z');

const SLOT_1 = {
  slotId: `${PROF_ID}:2025-06-12:1400`,
  startAt: new Date('2025-06-12T14:00:00.000Z'),
  endAt: new Date('2025-06-12T15:00:00.000Z'),
  label: '12/06 (quinta) às 14h00',
};

function makePayload(text: string, messageId = 'msg-1'): WhatsAppInboundPayload {
  return { from: PATIENT_PHONE, messageId, text, timestamp: FIXED_NOW.getTime() };
}

function idleSession(): ConversationSession {
  return {
    conversationId: 'conv-1',
    patientId: PATIENT_ID,
    professionalId: PROF_ID,
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

function bookingConfirmingSession(): ConversationSession {
  return {
    ...idleSession(),
    state: 'BOOKING_CONFIRMING',
    pendingSlotId: SLOT_1.slotId,
    pendingSlotStartAt: SLOT_1.startAt.toISOString(),
    pendingSlotEndAt: SLOT_1.endAt.toISOString(),
    idempotencyKey: 'idem-key-1',
  };
}

// ---------------------------------------------------------------------------
// Setup factory
// ---------------------------------------------------------------------------

function setup(sessionOverride?: ConversationSession | null) {
  const stateStore: jest.Mocked<IConversationStateStore> = {
    load: jest.fn().mockResolvedValue(sessionOverride === undefined ? null : sessionOverride),
    save: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  const whatsapp: jest.Mocked<IWhatsAppGateway> = {
    sendTextMessage: jest.fn().mockResolvedValue({ ok: true, value: { messageId: 'wamid-1' } }),
    sendTemplate: jest.fn().mockResolvedValue({ ok: true, value: { messageId: 'wamid-2' } }),
    validateWebhookSignature: jest.fn().mockReturnValue(true),
    parseWebhookPayload: jest.fn(),
  };

  const aiTriage: jest.Mocked<Pick<AITriageService, 'detectIntent' | 'generateResponse' | 'executeWithTools'>> = {
    detectIntent: jest.fn(),
    generateResponse: jest.fn().mockResolvedValue({ ok: true, value: 'Resposta gerada pela IA.' }),
    executeWithTools: jest.fn(),
  };

  const bookingService: jest.Mocked<Pick<BookingService, 'createAppointment' | 'cancelAppointment'>> = {
    createAppointment: jest.fn().mockResolvedValue({
      ok: true,
      value: {
        id: 'appt-1', professionalId: PROF_ID, patientId: PATIENT_ID,
        startAt: SLOT_1.startAt, endAt: SLOT_1.endAt, status: 'pending',
        serviceType: 'consulta', notes: null, externalCalendarEventId: null, idempotencyKey: 'idem-key-1',
      },
    }),
    cancelAppointment: jest.fn().mockResolvedValue({ ok: true, value: undefined }),
  };

  const slotReservation: jest.Mocked<Pick<SlotReservationService, 'reserve' | 'release'>> = {
    reserve: jest.fn().mockResolvedValue({ ok: true, value: undefined }),
    release: jest.fn().mockResolvedValue({ ok: true, value: undefined }),
  };

  const patientService: jest.Mocked<Pick<PatientService, 'findOrCreateByPhone'>> = {
    findOrCreateByPhone: jest.fn().mockResolvedValue({
      ok: true,
      value: { id: PATIENT_ID, professionalId: PROF_ID, phone: PATIENT_PHONE, name: 'João', dateOfBirth: null, consentRecordedAt: new Date() },
    }),
  };

  const slotQuery: jest.Mocked<ISlotQuery> = {
    getNextAvailableSlots: jest.fn().mockResolvedValue([SLOT_1]),
  };

  const orchestrator = new ConversationOrchestrator(
    stateStore as any,
    whatsapp as any,
    aiTriage as any,
    bookingService as any,
    slotReservation as any,
    patientService as any,
    slotQuery,
    () => FIXED_NOW,
  );

  return { orchestrator, stateStore, whatsapp, aiTriage, bookingService, slotReservation, patientService, slotQuery };
}

// ---------------------------------------------------------------------------
// Helper to get the saved session from stateStore.save mock
// ---------------------------------------------------------------------------

function savedSession(stateStore: jest.Mocked<IConversationStateStore>): ConversationSession {
  return stateStore.save.mock.calls[0][2] as ConversationSession;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ConversationOrchestrator', () => {
  // =========================================================================
  // IDLE → BOOKING_COLLECTING
  // =========================================================================

  describe('[TC-F-01] IDLE + booking intent → BOOKING_COLLECTING', () => {
    it('deve oferecer slots e transitar para BOOKING_COLLECTING', async () => {
      const { orchestrator, stateStore, whatsapp, aiTriage } = setup(null);
      aiTriage.detectIntent.mockResolvedValue({ ok: true, value: { intent: 'booking', confidence: 0.95 } });

      await orchestrator.handleIncomingMessage(makePayload('Quero agendar'), PROF_ID);

      const session = savedSession(stateStore);
      expect(session.state).toBe('BOOKING_COLLECTING');
      expect(whatsapp.sendTextMessage).toHaveBeenCalledWith(
        PATIENT_PHONE,
        expect.stringContaining('1.'),
      );
    });
  });

  // =========================================================================
  // IDLE → TRIAGING (unclear)
  // =========================================================================

  describe('[TC-F-02] IDLE + unclear intent → pede esclarecimento', () => {
    it('deve gerar resposta de esclarecimento, estado permanece TRIAGING', async () => {
      const { orchestrator, stateStore, whatsapp, aiTriage } = setup(null);
      aiTriage.detectIntent.mockResolvedValue({ ok: true, value: { intent: 'unclear', confidence: 0.4 } });
      aiTriage.generateResponse.mockResolvedValue({ ok: true, value: 'Pode me explicar melhor?' });

      await orchestrator.handleIncomingMessage(makePayload('Hmm...'), PROF_ID);

      const session = savedSession(stateStore);
      expect(session.state).toBe('TRIAGING');
      expect(whatsapp.sendTextMessage).toHaveBeenCalledWith(PATIENT_PHONE, 'Pode me explicar melhor?');
    });
  });

  // =========================================================================
  // IDLE → ESCALATED
  // =========================================================================

  describe('[TC-F-03] IDLE + human_handoff intent → ESCALATED', () => {
    it('deve transitar para ESCALATED e notificar paciente', async () => {
      const { orchestrator, stateStore, whatsapp, aiTriage } = setup(null);
      aiTriage.detectIntent.mockResolvedValue({ ok: true, value: { intent: 'human_handoff', confidence: 0.9 } });

      await orchestrator.handleIncomingMessage(makePayload('Quero falar com um humano'), PROF_ID);

      const session = savedSession(stateStore);
      expect(session.state).toBe('ESCALATED');
      expect(whatsapp.sendTextMessage).toHaveBeenCalledWith(
        PATIENT_PHONE,
        expect.stringContaining('profissional'),
      );
    });
  });

  // =========================================================================
  // IDLE → CANCELLING
  // =========================================================================

  describe('[TC-F-04] IDLE + cancellation intent → CANCELLING', () => {
    it('deve transitar para CANCELLING e perguntar qual consulta', async () => {
      const { orchestrator, stateStore, whatsapp, aiTriage } = setup(null);
      aiTriage.detectIntent.mockResolvedValue({ ok: true, value: { intent: 'cancellation', confidence: 0.88 } });

      await orchestrator.handleIncomingMessage(makePayload('Quero cancelar'), PROF_ID);

      const session = savedSession(stateStore);
      expect(session.state).toBe('CANCELLING');
      expect(whatsapp.sendTextMessage).toHaveBeenCalledWith(
        PATIENT_PHONE,
        expect.stringContaining('cancelar'),
      );
    });
  });

  // =========================================================================
  // IDLE → FAQ
  // =========================================================================

  describe('[TC-F-05] IDLE + general_info intent → FAQ', () => {
    it('deve transitar para FAQ e gerar resposta informativa', async () => {
      const { orchestrator, stateStore, whatsapp, aiTriage } = setup(null);
      aiTriage.detectIntent.mockResolvedValue({ ok: true, value: { intent: 'general_info', confidence: 0.82 } });
      aiTriage.generateResponse.mockResolvedValue({ ok: true, value: 'Respondendo sobre preços...' });

      await orchestrator.handleIncomingMessage(makePayload('Qual o preço?'), PROF_ID);

      const session = savedSession(stateStore);
      expect(session.state).toBe('FAQ');
      expect(whatsapp.sendTextMessage).toHaveBeenCalledWith(PATIENT_PHONE, 'Respondendo sobre preços...');
    });
  });

  // =========================================================================
  // BOOKING_COLLECTING + valid slot → BOOKING_CONFIRMING
  // =========================================================================

  describe('[TC-F-06] BOOKING_COLLECTING + slot válido → BOOKING_CONFIRMING', () => {
    it('deve reservar slot e transitar para BOOKING_CONFIRMING', async () => {
      const collectingSession = { ...idleSession(), state: 'BOOKING_COLLECTING' as const };
      const { orchestrator, stateStore, whatsapp, slotReservation } = setup(collectingSession);

      await orchestrator.handleIncomingMessage(makePayload('1', 'msg-slot-select'), PROF_ID);

      const session = savedSession(stateStore);
      expect(session.state).toBe('BOOKING_CONFIRMING');
      expect(session.pendingSlotId).toBe(SLOT_1.slotId);
      expect(slotReservation.reserve).toHaveBeenCalledWith(SLOT_1.slotId, 'msg-slot-select');
      expect(whatsapp.sendTextMessage).toHaveBeenCalledWith(
        PATIENT_PHONE,
        expect.stringContaining('Confirma'),
      );
    });
  });

  // =========================================================================
  // BOOKING_COLLECTING + slot já ocupado
  // =========================================================================

  describe('[TC-F-07] BOOKING_COLLECTING + slot ocupado → re-oferece slots', () => {
    it('deve informar indisponibilidade e re-oferece slots', async () => {
      const collectingSession = { ...idleSession(), state: 'BOOKING_COLLECTING' as const };
      const { orchestrator, stateStore, whatsapp, slotReservation } = setup(collectingSession);
      slotReservation.reserve.mockResolvedValue({ ok: false, error: { code: 'SLOT_NOT_AVAILABLE', slotId: SLOT_1.slotId } });

      await orchestrator.handleIncomingMessage(makePayload('1'), PROF_ID);

      const session = savedSession(stateStore);
      expect(session.state).toBe('BOOKING_COLLECTING');
      expect(whatsapp.sendTextMessage).toHaveBeenCalledWith(
        PATIENT_PHONE,
        expect.stringContaining('reservado'),
      );
    });
  });

  // =========================================================================
  // BOOKING_COLLECTING + seleção inválida
  // =========================================================================

  describe('[TC-F-08] BOOKING_COLLECTING + seleção inválida → re-oferece slots', () => {
    it('deve re-oferecer slots quando entrada não é número', async () => {
      const collectingSession = { ...idleSession(), state: 'BOOKING_COLLECTING' as const };
      const { orchestrator, stateStore, whatsapp } = setup(collectingSession);

      await orchestrator.handleIncomingMessage(makePayload('qualquer coisa'), PROF_ID);

      const session = savedSession(stateStore);
      expect(session.state).toBe('BOOKING_COLLECTING');
      expect(whatsapp.sendTextMessage).toHaveBeenCalledWith(
        PATIENT_PHONE,
        expect.stringContaining('1.'),
      );
    });
  });

  // =========================================================================
  // BOOKING_CONFIRMING + "Sim" → CONCLUDED
  // =========================================================================

  describe('[TC-F-09] BOOKING_CONFIRMING + "Sim" → CONCLUDED', () => {
    it('deve criar appointment, liberar slot e transitar para CONCLUDED', async () => {
      const { orchestrator, stateStore, whatsapp, bookingService, slotReservation } = setup(bookingConfirmingSession());

      await orchestrator.handleIncomingMessage(makePayload('Sim'), PROF_ID);

      const session = savedSession(stateStore);
      expect(session.state).toBe('CONCLUDED');
      expect(bookingService.createAppointment).toHaveBeenCalled();
      expect(slotReservation.release).toHaveBeenCalledWith(SLOT_1.slotId, 'idem-key-1');
      expect(whatsapp.sendTextMessage).toHaveBeenCalledWith(
        PATIENT_PHONE,
        expect.stringContaining('confirmada'),
      );
    });
  });

  // =========================================================================
  // BOOKING_CONFIRMING + "Não" → BOOKING_COLLECTING
  // =========================================================================

  describe('[TC-F-10] BOOKING_CONFIRMING + "Não" → BOOKING_COLLECTING', () => {
    it('deve liberar slot reservado e voltar a oferecer opções', async () => {
      const { orchestrator, stateStore, whatsapp, slotReservation } = setup(bookingConfirmingSession());

      await orchestrator.handleIncomingMessage(makePayload('Não'), PROF_ID);

      const session = savedSession(stateStore);
      expect(session.state).toBe('BOOKING_COLLECTING');
      expect(session.pendingSlotId).toBeNull();
      expect(slotReservation.release).toHaveBeenCalledWith(SLOT_1.slotId, 'idem-key-1');
    });
  });

  // =========================================================================
  // BOOKING_CONFIRMING + ambíguo
  // =========================================================================

  describe('[TC-F-11] BOOKING_CONFIRMING + ambíguo → permanece BOOKING_CONFIRMING', () => {
    it('deve pedir confirmação novamente sem mudar estado', async () => {
      const { orchestrator, stateStore, whatsapp } = setup(bookingConfirmingSession());

      await orchestrator.handleIncomingMessage(makePayload('talvez'), PROF_ID);

      const session = savedSession(stateStore);
      expect(session.state).toBe('BOOKING_CONFIRMING');
      expect(whatsapp.sendTextMessage).toHaveBeenCalledWith(
        PATIENT_PHONE,
        expect.stringContaining('Sim'),
      );
    });
  });

  // =========================================================================
  // CANCELLING + "Sim" → CONCLUDED
  // =========================================================================

  describe('[TC-F-12] CANCELLING + "Sim" → CONCLUDED', () => {
    it('deve cancelar appointment e transitar para CONCLUDED', async () => {
      const cancellingSession = {
        ...idleSession(),
        state: 'CANCELLING' as const,
        targetAppointmentId: 'appt-to-cancel',
      };
      const { orchestrator, stateStore, whatsapp, bookingService } = setup(cancellingSession);

      await orchestrator.handleIncomingMessage(makePayload('Sim'), PROF_ID);

      const session = savedSession(stateStore);
      expect(session.state).toBe('CONCLUDED');
      expect(bookingService.cancelAppointment).toHaveBeenCalledWith('appt-to-cancel', 'patient');
      expect(whatsapp.sendTextMessage).toHaveBeenCalledWith(
        PATIENT_PHONE,
        expect.stringContaining('cancelada'),
      );
    });
  });

  // =========================================================================
  // CANCELLING + "Não" → IDLE
  // =========================================================================

  describe('[TC-F-13] CANCELLING + "Não" → IDLE', () => {
    it('deve manter appointment e transitar para IDLE', async () => {
      const cancellingSession = { ...idleSession(), state: 'CANCELLING' as const };
      const { orchestrator, stateStore, bookingService } = setup(cancellingSession);

      await orchestrator.handleIncomingMessage(makePayload('Não'), PROF_ID);

      const session = savedSession(stateStore);
      expect(session.state).toBe('IDLE');
      expect(bookingService.cancelAppointment).not.toHaveBeenCalled();
    });
  });

  // =========================================================================
  // IA indisponível → fallback
  // =========================================================================

  describe('[TC-F-14] IA indisponível → envia MSG_FALLBACK', () => {
    it('deve enviar mensagem de fallback quando detectIntent retorna erro', async () => {
      const { orchestrator, whatsapp, aiTriage } = setup(null);
      aiTriage.detectIntent.mockResolvedValue({ ok: false, error: { code: 'AI_UNAVAILABLE' } });

      await orchestrator.handleIncomingMessage(makePayload('Quero agendar'), PROF_ID);

      expect(whatsapp.sendTextMessage).toHaveBeenCalledWith(
        PATIENT_PHONE,
        expect.stringContaining('dificuldades técnicas'),
      );
    });
  });

  // =========================================================================
  // Patient not found → fallback
  // =========================================================================

  describe('PatientService falha → fallback', () => {
    it('deve enviar MSG_FALLBACK quando patient não pode ser criado', async () => {
      const { orchestrator, whatsapp, patientService } = setup(null);
      patientService.findOrCreateByPhone.mockResolvedValue({
        ok: false,
        error: { code: 'VALIDATION_ERROR', fields: {} },
      });

      await orchestrator.handleIncomingMessage(makePayload('Olá'), PROF_ID);

      expect(whatsapp.sendTextMessage).toHaveBeenCalledWith(
        PATIENT_PHONE,
        expect.stringContaining('dificuldades técnicas'),
      );
    });
  });

  // =========================================================================
  // No available slots
  // =========================================================================

  describe('Sem slots disponíveis', () => {
    it('deve informar ausência de horários em BOOKING_COLLECTING', async () => {
      const { orchestrator, whatsapp, aiTriage, slotQuery } = setup(null);
      aiTriage.detectIntent.mockResolvedValue({ ok: true, value: { intent: 'booking', confidence: 0.9 } });
      slotQuery.getNextAvailableSlots.mockResolvedValue([]);

      await orchestrator.handleIncomingMessage(makePayload('Quero agendar'), PROF_ID);

      expect(whatsapp.sendTextMessage).toHaveBeenCalledWith(
        PATIENT_PHONE,
        expect.stringContaining('lista de espera'),
      );
    });
  });

  // =========================================================================
  // State sempre salvo no finally
  // =========================================================================

  describe('Estado salvo mesmo após exceção interna', () => {
    it('deve salvar estado no stateStore mesmo quando dispatch lança exceção', async () => {
      const { orchestrator, stateStore, aiTriage } = setup(null);
      aiTriage.detectIntent.mockRejectedValue(new Error('Unexpected error'));

      await orchestrator.handleIncomingMessage(makePayload('Olá'), PROF_ID);

      expect(stateStore.save).toHaveBeenCalled();
    });
  });

  // =========================================================================
  // Limita recentMessages a MAX (10)
  // =========================================================================

  describe('Limita recentMessages a 10', () => {
    it('deve manter apenas os últimos 10 messages', async () => {
      const sessionWithHistory = {
        ...idleSession(),
        recentMessages: Array.from({ length: 10 }, (_, i) => ({
          role: 'user' as const,
          content: `msg ${i}`,
        })),
      };
      const { orchestrator, stateStore, aiTriage } = setup(sessionWithHistory);
      aiTriage.detectIntent.mockResolvedValue({ ok: true, value: { intent: 'general_info', confidence: 0.9 } });
      aiTriage.generateResponse.mockResolvedValue({ ok: true, value: 'ok' });

      await orchestrator.handleIncomingMessage(makePayload('nova mensagem'), PROF_ID);

      const session = savedSession(stateStore);
      expect(session.recentMessages.length).toBeLessThanOrEqual(10);
    });
  });

  // =========================================================================
  // =========================================================================
  // Estado TRIAGING (sessão existente)
  // =========================================================================

  describe('Estado TRIAGING → re-triagem', () => {
    it('deve retomar triagem quando sessão já está em TRIAGING', async () => {
      const triagingSession = { ...idleSession(), state: 'TRIAGING' as const };
      const { orchestrator, stateStore, aiTriage } = setup(triagingSession);
      aiTriage.detectIntent.mockResolvedValue({ ok: true, value: { intent: 'booking', confidence: 0.9 } });

      await orchestrator.handleIncomingMessage(makePayload('Quero agendar'), PROF_ID);

      const session = savedSession(stateStore);
      expect(session.state).toBe('BOOKING_COLLECTING');
    });
  });

  // Estado ESCALATED / RESCHEDULING → default handler
  // =========================================================================

  describe('Estado ESCALATED → default handler', () => {
    it('deve enviar MSG_UNCLEAR para estado não tratado (ESCALATED)', async () => {
      const escalatedSession = { ...idleSession(), state: 'ESCALATED' as const };
      const { orchestrator, whatsapp } = setup(escalatedSession);

      await orchestrator.handleIncomingMessage(makePayload('Olá'), PROF_ID);

      expect(whatsapp.sendTextMessage).toHaveBeenCalledWith(
        PATIENT_PHONE,
        expect.stringContaining('entendi'),
      );
    });
  });

  // =========================================================================
  // BOOKING_CONFIRMING + "Sim" mas createAppointment falha
  // =========================================================================

  describe('BOOKING_CONFIRMING + "Sim" mas createAppointment falha', () => {
    it('deve voltar para BOOKING_COLLECTING quando criação de appointment falha', async () => {
      const { orchestrator, stateStore, whatsapp, bookingService } = setup(bookingConfirmingSession());
      bookingService.createAppointment.mockResolvedValue({ ok: false, error: { code: 'SLOT_NOT_AVAILABLE', slotId: SLOT_1.slotId } });

      await orchestrator.handleIncomingMessage(makePayload('Sim'), PROF_ID);

      const session = savedSession(stateStore);
      expect(session.state).toBe('BOOKING_COLLECTING');
      expect(whatsapp.sendTextMessage).toHaveBeenCalledWith(
        PATIENT_PHONE,
        expect.stringContaining('possível confirmar'),
      );
    });
  });

  // =========================================================================
  // BOOKING_CONFIRMING + "Sim" mas sessão corrompida (sem pendingSlotStartAt)
  // =========================================================================

  describe('BOOKING_CONFIRMING + sessão sem dados de slot → IDLE', () => {
    it('deve transitar para IDLE quando session está incompleta', async () => {
      const corruptedSession: ConversationSession = {
        ...idleSession(),
        state: 'BOOKING_CONFIRMING',
        pendingSlotId: SLOT_1.slotId,
        pendingSlotStartAt: null, // corrupt
        pendingSlotEndAt: null,
        idempotencyKey: null,
      };
      const { orchestrator, stateStore, whatsapp } = setup(corruptedSession);

      await orchestrator.handleIncomingMessage(makePayload('Sim'), PROF_ID);

      const session = savedSession(stateStore);
      expect(session.state).toBe('IDLE');
      expect(whatsapp.sendTextMessage).toHaveBeenCalledWith(
        PATIENT_PHONE,
        expect.stringContaining('dificuldades técnicas'),
      );
    });
  });

  // =========================================================================
  // CANCELLING + ambíguo
  // =========================================================================

  describe('CANCELLING + ambíguo → pede confirmação', () => {
    it('deve perguntar Sim/Não novamente quando resposta é ambígua', async () => {
      const cancellingSession = { ...idleSession(), state: 'CANCELLING' as const };
      const { orchestrator, stateStore, whatsapp } = setup(cancellingSession);

      await orchestrator.handleIncomingMessage(makePayload('talvez'), PROF_ID);

      const session = savedSession(stateStore);
      expect(session.state).toBe('CANCELLING');
      expect(whatsapp.sendTextMessage).toHaveBeenCalledWith(
        PATIENT_PHONE,
        expect.stringContaining('Confirma o cancelamento'),
      );
    });
  });
});
