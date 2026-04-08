import { Controller, Get, Post, Delete, Patch, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { BookingService } from './booking.service';
import type { CreateAppointmentInput } from './booking.types';

@Controller('appointments')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(@Body() body: CreateAppointmentInput) {
    const result = await this.bookingService.createAppointment(body);
    if (!result.ok) throw Object.assign(new Error(result.error.code), { status: 422, error: result.error });
    return result.value;
  }

  @Get('day')
  async getByDay(@Query('professionalId') professionalId: string, @Query('date') date: string) {
    const result = await this.bookingService.getByDay(professionalId, new Date(date));
    if (!result.ok) throw Object.assign(new Error(result.error.code), { status: 400 });
    return result.value;
  }

  @Get('week')
  async getByWeek(@Query('professionalId') professionalId: string, @Query('weekStart') weekStart: string) {
    const result = await this.bookingService.getByWeek(professionalId, new Date(weekStart));
    if (!result.ok) throw Object.assign(new Error(result.error.code), { status: 400 });
    return result.value;
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const result = await this.bookingService.getById(id);
    if (!result.ok) throw Object.assign(new Error(result.error.code), { status: 404, error: result.error });
    return result.value;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async cancel(@Param('id') id: string, @Query('requestedBy') requestedBy: 'patient' | 'professional' = 'patient') {
    const result = await this.bookingService.cancelAppointment(id, requestedBy);
    if (!result.ok) throw Object.assign(new Error(result.error.code), { status: 422, error: result.error });
  }

  @Patch(':id/confirm')
  async confirm(@Param('id') id: string) {
    const result = await this.bookingService.confirmAppointment(id);
    if (!result.ok) throw Object.assign(new Error(result.error.code), { status: 422, error: result.error });
    return { message: 'Consulta confirmada.' };
  }
}
