import type { WaitlistEntry, WaitlistEntryStatus } from '../waitlist.types';

export interface IWaitlistRepository {
  /**
   * Adds a new entry. Returns null if a duplicate pending entry already exists.
   */
  add(data: Omit<WaitlistEntry, 'id' | 'status' | 'createdAt' | 'notifiedAt'>): Promise<WaitlistEntry | null>;

  /**
   * Returns all pending entries for the professional and desired date,
   * ordered by createdAt ASC (FIFO).
   */
  findPendingByProfessionalAndDate(professionalId: string, desiredDate: string): Promise<WaitlistEntry[]>;

  /**
   * Returns all pending entries for a professional, ordered FIFO.
   */
  findPendingByProfessional(professionalId: string): Promise<WaitlistEntry[]>;

  findById(id: string): Promise<WaitlistEntry | null>;

  updateStatus(id: string, status: WaitlistEntryStatus, notifiedAt?: Date): Promise<WaitlistEntry>;
}
