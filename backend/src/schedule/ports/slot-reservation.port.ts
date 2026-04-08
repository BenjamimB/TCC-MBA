export interface ISlotReservationChecker {
  isReserved(slotId: string): Promise<boolean>;
}
