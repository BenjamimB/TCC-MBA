export interface SlotOption {
    slotId: string;
    startAt: Date;
    endAt: Date;
    label: string;
}
export interface ISlotQuery {
    getNextAvailableSlots(professionalId: string, from: Date, maxResults: number): Promise<SlotOption[]>;
}
