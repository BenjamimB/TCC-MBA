export interface AvailabilityConfig {
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  startTime: string;       // HH:mm
  endTime: string;         // HH:mm
  slotDurationMinutes: number;
  breakDurationMinutes: number;
  isActive: boolean;
  minAdvanceHours: number; // antecedência mínima para agendamento
}

export interface TimeSlot {
  slotId: string;  // {professionalId}:{ISO-date}:{HHmm}
  startAt: Date;
  endAt: Date;
  isReserved: boolean;
}

export interface AvailabilityUpdatedEvent {
  professionalId: string;
  updatedAt: Date;
}
