import type { WaitlistEntry, WaitlistEntryStatus } from '../waitlist.types';
export interface IWaitlistRepository {
    add(data: Omit<WaitlistEntry, 'id' | 'status' | 'createdAt' | 'notifiedAt'>): Promise<WaitlistEntry | null>;
    findPendingByProfessionalAndDate(professionalId: string, desiredDate: string): Promise<WaitlistEntry[]>;
    findPendingByProfessional(professionalId: string): Promise<WaitlistEntry[]>;
    findById(id: string): Promise<WaitlistEntry | null>;
    updateStatus(id: string, status: WaitlistEntryStatus, notifiedAt?: Date): Promise<WaitlistEntry>;
}
