export interface SlotOption {
  slotId: string;
  startAt: Date;
  endAt: Date;
  label: string; // e.g. "12/06 (quinta) às 14h00"
}

export interface ISlotQuery {
  getNextAvailableSlots(
    professionalId: string,
    from: Date,
    maxResults: number,
  ): Promise<SlotOption[]>;
}
