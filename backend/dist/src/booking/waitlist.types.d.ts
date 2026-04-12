export type WaitlistEntryStatus = 'pending' | 'notified' | 'accepted' | 'expired';
export interface WaitlistEntry {
    id: string;
    professionalId: string;
    patientId: string;
    patientPhone: string;
    desiredDate: string;
    desiredTimeRange?: {
        start: string;
        end: string;
    };
    status: WaitlistEntryStatus;
    createdAt: Date;
    notifiedAt: Date | null;
}
export interface AddToWaitlistInput {
    professionalId: string;
    patientId: string;
    patientPhone: string;
    desiredDate: string;
    desiredTimeRange?: {
        start: string;
        end: string;
    };
}
export interface SlotReleasedInput {
    professionalId: string;
    slotStartAt: Date;
    slotEndAt: Date;
    serviceType: string;
    minAdvanceHours: number;
}
export type HandleSlotReleasedOutcome = 'slot_released_directly' | 'no_waitlist_entries' | 'notified' | 'all_skipped';
