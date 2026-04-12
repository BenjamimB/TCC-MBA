export interface AvailabilityConfig {
    dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    startTime: string;
    endTime: string;
    slotDurationMinutes: number;
    breakDurationMinutes: number;
    isActive: boolean;
    minAdvanceHours: number;
}
export interface TimeSlot {
    slotId: string;
    startAt: Date;
    endAt: Date;
    isReserved: boolean;
}
export interface AvailabilityUpdatedEvent {
    professionalId: string;
    updatedAt: Date;
}
