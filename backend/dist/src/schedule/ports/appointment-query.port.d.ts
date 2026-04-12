export interface BookedSlot {
    startAt: Date;
    endAt: Date;
}
export interface IAppointmentQuery {
    findBookedSlots(professionalId: string, from: Date, to: Date): Promise<BookedSlot[]>;
}
