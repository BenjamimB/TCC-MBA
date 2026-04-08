import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { SlotCalculationService } from './slot-calculation.service';

@Controller('schedule')
export class ScheduleController {
  constructor(
    private readonly availabilityService: AvailabilityService,
    private readonly slotCalculationService: SlotCalculationService,
  ) {}

  @Get('availability')
  async getAvailability(@Query('professionalId') professionalId: string) {
    const result = await this.availabilityService.getConfig(professionalId);
    if (!result.ok) throw Object.assign(new Error(result.error.code), { status: 400 });
    return result.value;
  }

  @Put('availability')
  async updateAvailability(
    @Query('professionalId') professionalId: string,
    @Body() body: { configs: Parameters<AvailabilityService['updateConfig']>[1] },
  ) {
    const result = await this.availabilityService.updateConfig(professionalId, body.configs);
    if (!result.ok) throw Object.assign(new Error(result.error.code), { status: 422, error: result.error });
    return { message: 'Disponibilidade atualizada.' };
  }

  @Get('slots')
  async getSlots(
    @Query('professionalId') professionalId: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    const result = await this.slotCalculationService.getAvailableSlots(
      professionalId,
      new Date(from),
      new Date(to),
    );
    if (!result.ok) throw Object.assign(new Error(result.error.code), { status: 400 });
    return result.value;
  }
}
