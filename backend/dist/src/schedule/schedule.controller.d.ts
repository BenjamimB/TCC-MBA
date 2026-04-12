import { AvailabilityService } from './availability.service';
import { SlotCalculationService } from './slot-calculation.service';
export declare class ScheduleController {
    private readonly availabilityService;
    private readonly slotCalculationService;
    constructor(availabilityService: AvailabilityService, slotCalculationService: SlotCalculationService);
    getAvailability(professionalId: string): Promise<import("./availability.types").AvailabilityConfig[]>;
    updateAvailability(professionalId: string, body: {
        configs: Parameters<AvailabilityService['updateConfig']>[1];
    }): Promise<{
        message: string;
    }>;
    getSlots(professionalId: string, from: string, to: string): Promise<import("./availability.types").TimeSlot[]>;
}
