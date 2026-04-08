/**
 * Task 3.2 — SlotCalculationService unit tests
 *
 * Cobre: cálculo de slots livres subtraindo agendamentos existentes,
 * formato de slotId, exclusão de slots passados e isReserved via Redis.
 * Requirements: 1.3, 5.1, 5.7, 5.10
 */
import { SlotCalculationService } from './slot-calculation.service';
import type { IAvailabilityRepository, AvailabilityRecord } from './ports/availability.repository.port';
import type { IAppointmentQuery } from './ports/appointment-query.port';
import type { ISlotReservationChecker } from './ports/slot-reservation.port';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const PROF_ID = 'prof-1';

// A "terça-feira" (day=2) fixa para simplificar os testes
// 2025-06-10 é uma terça-feira
const TUESDAY = new Date('2025-06-10T00:00:00.000Z');

function makeTuesdayRecord(overrides: Partial<AvailabilityRecord> = {}): AvailabilityRecord {
  return {
    id: 'avail-1',
    professionalId: PROF_ID,
    dayOfWeek: 2, // terça — corresponde ao dia de TUESDAY (UTC)
    startTime: '08:00',
    endTime: '10:00',
    slotDurationMinutes: 60,
    breakDurationMinutes: 0,
    isActive: true,
    minAdvanceHours: 0,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

describe('SlotCalculationService', () => {
  let service: SlotCalculationService;
  let availRepo: jest.Mocked<IAvailabilityRepository>;
  let appointmentQuery: jest.Mocked<IAppointmentQuery>;
  let slotReservation: jest.Mocked<ISlotReservationChecker>;

  beforeEach(() => {
    availRepo = {
      findByProfessional: jest.fn(),
      upsert: jest.fn(),
    };
    appointmentQuery = {
      findBookedSlots: jest.fn().mockResolvedValue([]),
    };
    slotReservation = {
      isReserved: jest.fn().mockResolvedValue(false),
    };

    // Clock fixo: 2025-06-10 06:00 UTC (antes dos slots de 08:00)
    service = new SlotCalculationService(
      availRepo,
      appointmentQuery,
      slotReservation,
      () => new Date('2025-06-10T06:00:00.000Z'),
    );
  });

  // =========================================================================
  // getAvailableSlots()
  // =========================================================================

  describe('getAvailableSlots()', () => {
    it('[TC-F-01] deve retornar dois slots para disponibilidade 08:00–10:00 com duração 60min', async () => {
      availRepo.findByProfessional.mockResolvedValue([makeTuesdayRecord()]);

      const result = await service.getAvailableSlots(PROF_ID, TUESDAY, TUESDAY);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toHaveLength(2);
      }
    });

    it('[TC-F-02] deve formatar slotId como {professionalId}:{ISO-date}:{HHmm}', async () => {
      availRepo.findByProfessional.mockResolvedValue([makeTuesdayRecord()]);

      const result = await service.getAvailableSlots(PROF_ID, TUESDAY, TUESDAY);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value[0].slotId).toMatch(/^prof-1:2025-06-10:0800$/);
        expect(result.value[1].slotId).toMatch(/^prof-1:2025-06-10:0900$/);
      }
    });

    it('[TC-F-03] deve retornar lista vazia quando dia não tem disponibilidade ativa', async () => {
      availRepo.findByProfessional.mockResolvedValue([makeTuesdayRecord({ isActive: false })]);

      const result = await service.getAvailableSlots(PROF_ID, TUESDAY, TUESDAY);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toHaveLength(0);
      }
    });

    it('[TC-F-04] deve excluir slots com agendamento existente (booked)', async () => {
      availRepo.findByProfessional.mockResolvedValue([makeTuesdayRecord()]);
      appointmentQuery.findBookedSlots.mockResolvedValue([
        {
          startAt: new Date('2025-06-10T08:00:00.000Z'),
          endAt: new Date('2025-06-10T09:00:00.000Z'),
        },
      ]);

      const result = await service.getAvailableSlots(PROF_ID, TUESDAY, TUESDAY);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toHaveLength(1);
        expect(result.value[0].slotId).toContain('0900');
      }
    });

    it('[TC-F-05] deve marcar isReserved=true para slot com lock Redis ativo', async () => {
      availRepo.findByProfessional.mockResolvedValue([makeTuesdayRecord()]);
      slotReservation.isReserved.mockImplementation(async (slotId) =>
        slotId.includes('0800'),
      );

      const result = await service.getAvailableSlots(PROF_ID, TUESDAY, TUESDAY);

      expect(result.ok).toBe(true);
      if (result.ok) {
        const slot0800 = result.value.find((s) => s.slotId.includes('0800'));
        const slot0900 = result.value.find((s) => s.slotId.includes('0900'));
        expect(slot0800?.isReserved).toBe(true);
        expect(slot0900?.isReserved).toBe(false);
      }
    });

    it('[TC-F-06] deve excluir slots anteriores a now() + minAdvanceHours', async () => {
      // Clock às 08:30, minAdvanceHours=1 → exige startAt > 09:30 → exclui slot das 08:00 e 09:00
      const lateService = new SlotCalculationService(
        availRepo,
        appointmentQuery,
        slotReservation,
        () => new Date('2025-06-10T08:30:00.000Z'),
      );
      availRepo.findByProfessional.mockResolvedValue([makeTuesdayRecord({ minAdvanceHours: 1 })]);

      const result = await lateService.getAvailableSlots(PROF_ID, TUESDAY, TUESDAY);

      expect(result.ok).toBe(true);
      if (result.ok) {
        // 08:00 slot starts before 09:30 (08:30 + 1h) → excluded
        // 09:00 slot starts before 09:30 → excluded
        expect(result.value).toHaveLength(0);
      }
    });

    it('[TC-F-07] deve respeitar breakDurationMinutes entre slots', async () => {
      // 08:00–12:00, slot 60min, break 10min → slots em 08:00, 09:10, 10:20, 11:30
      const record = makeTuesdayRecord({
        startTime: '08:00',
        endTime: '12:00',
        slotDurationMinutes: 60,
        breakDurationMinutes: 10,
      });
      availRepo.findByProfessional.mockResolvedValue([record]);

      const result = await service.getAvailableSlots(PROF_ID, TUESDAY, TUESDAY);

      expect(result.ok).toBe(true);
      if (result.ok) {
        // slot 1: 08:00–09:00, slot 2: 09:10–10:10, slot 3: 10:20–11:20, slot 4: 11:30–12:30 > endTime → invalid
        expect(result.value).toHaveLength(3);
        expect(result.value[0].slotId).toContain('0800');
        expect(result.value[1].slotId).toContain('0910');
        expect(result.value[2].slotId).toContain('1020');
      }
    });

    it('[TC-F-08] deve cobrir intervalo de múltiplos dias', async () => {
      // Terça (day=2) e quarta (day=3) na mesma semana
      const wednesday = new Date('2025-06-11T00:00:00.000Z'); // quarta
      availRepo.findByProfessional.mockResolvedValue([
        makeTuesdayRecord({ dayOfWeek: 2 }),
        makeTuesdayRecord({ id: 'avail-2', dayOfWeek: 3 }), // quarta
      ]);

      const result = await service.getAvailableSlots(PROF_ID, TUESDAY, wednesday);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toHaveLength(4); // 2 slots por dia × 2 dias
      }
    });

    it('[TC-F-09] deve retornar lista vazia quando não há disponibilidade no período', async () => {
      // Disponibilidade apenas na terça, mas pedindo somente segunda
      const monday = new Date('2025-06-09T00:00:00.000Z');
      availRepo.findByProfessional.mockResolvedValue([makeTuesdayRecord({ dayOfWeek: 2 })]);

      const result = await service.getAvailableSlots(PROF_ID, monday, monday);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toHaveLength(0);
      }
    });

    it('[TC-F-10] deve definir startAt e endAt corretos no slot', async () => {
      availRepo.findByProfessional.mockResolvedValue([makeTuesdayRecord()]);

      const result = await service.getAvailableSlots(PROF_ID, TUESDAY, TUESDAY);

      expect(result.ok).toBe(true);
      if (result.ok) {
        const first = result.value[0];
        expect(first.startAt).toEqual(new Date('2025-06-10T08:00:00.000Z'));
        expect(first.endAt).toEqual(new Date('2025-06-10T09:00:00.000Z'));
      }
    });
  });
});
