"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationOrchestrator = void 0;
const crypto_1 = require("crypto");
const MAX_RECENT_MESSAGES = 10;
const SLOTS_TO_OFFER = 5;
const MSG_FALLBACK = 'Desculpe, estou com dificuldades técnicas no momento. Tente novamente em alguns instantes ou entre em contato com o consultório diretamente.';
const MSG_UNCLEAR = 'Desculpe, não entendi bem o que você precisa. Você gostaria de:\n1. Agendar uma consulta\n2. Cancelar ou remarcar\n3. Obter informações';
const MSG_ESCALATED = 'Certo! Vou chamar o profissional para continuar o seu atendimento. Aguarde um momento, por favor.';
const MSG_NO_SLOTS = 'Infelizmente não há horários disponíveis para os próximos dias. Deseja entrar na lista de espera?';
class ConversationOrchestrator {
    stateStore;
    whatsapp;
    aiTriage;
    bookingService;
    slotReservation;
    patientService;
    slotQuery;
    clock;
    constructor(stateStore, whatsapp, aiTriage, bookingService, slotReservation, patientService, slotQuery, clock = () => new Date()) {
        this.stateStore = stateStore;
        this.whatsapp = whatsapp;
        this.aiTriage = aiTriage;
        this.bookingService = bookingService;
        this.slotReservation = slotReservation;
        this.patientService = patientService;
        this.slotQuery = slotQuery;
        this.clock = clock;
    }
    async handleIncomingMessage(payload, professionalId) {
        const { from: patientPhone, text, messageId } = payload;
        const patientResult = await this.patientService.findOrCreateByPhone(patientPhone, professionalId);
        if (!patientResult.ok) {
            await this.whatsapp.sendTextMessage(patientPhone, MSG_FALLBACK);
            return;
        }
        const patient = patientResult.value;
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
        }
        catch {
            await this.whatsapp.sendTextMessage(patientPhone, MSG_FALLBACK);
        }
        finally {
            await this.stateStore.save(patientPhone, professionalId, session);
        }
    }
    async dispatch(session, patientPhone, professionalId, userText, messageId) {
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
    async handleTriaging(session, patientPhone, professionalId, userText) {
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
            await this.whatsapp.sendTextMessage(patientPhone, reply.ok ? reply.value : MSG_UNCLEAR);
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
            await this.whatsapp.sendTextMessage(patientPhone, 'Qual consulta você deseja cancelar? Informe o dia e horário.');
            return;
        }
        session.state = 'FAQ';
        const reply = await this.aiTriage.generateResponse(userText, {
            recentMessages: session.recentMessages.slice(-6),
        });
        await this.whatsapp.sendTextMessage(patientPhone, reply.ok ? reply.value : MSG_FALLBACK);
    }
    async handleBookingCollecting(session, patientPhone, professionalId, userText, messageId) {
        const slotIndex = parseInt(userText, 10) - 1;
        const slots = await this.slotQuery.getNextAvailableSlots(professionalId, this.clock(), SLOTS_TO_OFFER);
        if (isNaN(slotIndex) || slotIndex < 0 || slotIndex >= slots.length) {
            await this.offerSlots(session, patientPhone, professionalId);
            return;
        }
        const chosen = slots[slotIndex];
        const sessionId = messageId;
        const reserveResult = await this.slotReservation.reserve(chosen.slotId, sessionId);
        if (!reserveResult.ok) {
            await this.whatsapp.sendTextMessage(patientPhone, 'Esse horário acabou de ser reservado por outro paciente. Escolha outro:');
            await this.offerSlots(session, patientPhone, professionalId);
            return;
        }
        session.state = 'BOOKING_CONFIRMING';
        session.pendingSlotId = chosen.slotId;
        session.pendingSlotStartAt = chosen.startAt.toISOString();
        session.pendingSlotEndAt = chosen.endAt.toISOString();
        session.idempotencyKey = (0, crypto_1.randomUUID)();
        await this.whatsapp.sendTextMessage(patientPhone, `Ótimo! Você selecionou ${chosen.label}. Confirma o agendamento? (Sim/Não)`);
    }
    async handleBookingConfirming(session, patientPhone, professionalId, userText) {
        const confirmed = /^sim|yes|confirmo|ok|s$/i.test(userText.trim());
        const refused = /^não|nao|no|n$/i.test(userText.trim());
        if (!confirmed && !refused) {
            await this.whatsapp.sendTextMessage(patientPhone, 'Por favor, responda Sim para confirmar ou Não para escolher outro horário.');
            return;
        }
        if (refused) {
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
            await this.whatsapp.sendTextMessage(patientPhone, 'Não foi possível confirmar o agendamento. Por favor, tente novamente.');
            session.state = 'BOOKING_COLLECTING';
            return;
        }
        await this.slotReservation.release(session.pendingSlotId, session.idempotencyKey);
        session.state = 'CONCLUDED';
        session.pendingSlotId = null;
        const startAt = new Date(session.pendingSlotStartAt);
        const dateStr = startAt.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
        const timeStr = startAt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        await this.whatsapp.sendTextMessage(patientPhone, `Consulta confirmada! ✅\n📅 ${dateStr} às ${timeStr}\n\nAté lá!`);
    }
    async handleCancelling(session, patientPhone, _professionalId, userText) {
        const confirmed = /^sim|yes|confirmo|ok|s$/i.test(userText.trim());
        const refused = /^não|nao|no|n$/i.test(userText.trim());
        if (!confirmed && !refused) {
            await this.whatsapp.sendTextMessage(patientPhone, 'Confirma o cancelamento? (Sim/Não)');
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
    async offerSlots(session, patientPhone, professionalId) {
        const slots = await this.slotQuery.getNextAvailableSlots(professionalId, this.clock(), SLOTS_TO_OFFER);
        if (slots.length === 0) {
            await this.whatsapp.sendTextMessage(patientPhone, MSG_NO_SLOTS);
            return;
        }
        const list = slots.map((s, i) => `${i + 1}. ${s.label}`).join('\n');
        await this.whatsapp.sendTextMessage(patientPhone, `Aqui estão os próximos horários disponíveis:\n${list}\n\nDigite o número do horário desejado.`);
    }
    newSession(patientId, professionalId) {
        return {
            conversationId: (0, crypto_1.randomUUID)(),
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
exports.ConversationOrchestrator = ConversationOrchestrator;
//# sourceMappingURL=conversation-orchestrator.service.js.map