export type WaitlistEntryStatus = 'pending' | 'notified' | 'accepted' | 'expired';

export interface WaitlistEntry {
  id: string;
  professionalId: string;
  patientId: string;
  /** Phone number of the patient — used to send WhatsApp notification */
  patientPhone: string;
  desiredDate: string; // ISO date string 'YYYY-MM-DD'
  desiredTimeRange?: { start: string; end: string }; // 'HH:mm'
  status: WaitlistEntryStatus;
  createdAt: Date;
  notifiedAt: Date | null;
}

export interface AddToWaitlistInput {
  professionalId: string;
  patientId: string;
  patientPhone: string;
  desiredDate: string;
  desiredTimeRange?: { start: string; end: string };
}

export interface SlotReleasedInput {
  professionalId: string;
  /** ISO datetime string of the released slot */
  slotStartAt: Date;
  slotEndAt: Date;
  serviceType: string;
  /** Minimum advance hours required for a booking */
  minAdvanceHours: number;
}

export type HandleSlotReleasedOutcome =
  | 'slot_released_directly'   // AC 9.6 — below min advance
  | 'no_waitlist_entries'       // no pending entries for the period
  | 'notified'                  // first eligible patient notified
  | 'all_skipped';              // all candidates skipped (confirmed conflict or send failure)
