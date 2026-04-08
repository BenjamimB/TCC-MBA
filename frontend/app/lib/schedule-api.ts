import { authApi } from './auth-api';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';

export interface Appointment {
  id: string;
  professionalId: string;
  patientId: string;
  patientName?: string;
  patientPhone?: string;
  startAt: string; // ISO string
  endAt: string;
  status: AppointmentStatus;
  serviceType: string;
  notes: string | null;
}

export interface DayAppointments {
  date: string; // YYYY-MM-DD
  appointments: Appointment[];
}

export interface AvailabilityConfig {
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  startTime: string; // HH:mm
  endTime: string;
  slotDurationMinutes: number;
  breakDurationMinutes: number;
  isActive: boolean;
}

// ---------------------------------------------------------------------------
// Appointments
// ---------------------------------------------------------------------------

export async function getAppointmentsByDay(
  professionalId: string,
  date: string,
): Promise<DayAppointments> {
  const res = await authApi.get<DayAppointments>(
    `/schedule/${professionalId}/appointments`,
    { params: { date } },
  );
  return res.data;
}

export async function getAppointmentsByWeek(
  professionalId: string,
  weekStart: string,
): Promise<DayAppointments[]> {
  const res = await authApi.get<DayAppointments[]>(
    `/schedule/${professionalId}/appointments/week`,
    { params: { weekStart } },
  );
  return res.data;
}

export async function cancelAppointment(
  appointmentId: string,
): Promise<void> {
  await authApi.post(`/schedule/appointments/${appointmentId}/cancel`);
}

// ---------------------------------------------------------------------------
// Availability
// ---------------------------------------------------------------------------

export async function getAvailabilityConfig(
  professionalId: string,
): Promise<AvailabilityConfig[]> {
  const res = await authApi.get<AvailabilityConfig[]>(
    `/schedule/${professionalId}/availability`,
  );
  return res.data;
}

export async function updateAvailabilityConfig(
  professionalId: string,
  config: AvailabilityConfig[],
): Promise<void> {
  await authApi.put(`/schedule/${professionalId}/availability`, config);
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

export const DAY_NAMES: Record<number, string> = {
  0: 'Domingo',
  1: 'Segunda-feira',
  2: 'Terça-feira',
  3: 'Quarta-feira',
  4: 'Quinta-feira',
  5: 'Sexta-feira',
  6: 'Sábado',
};

export function formatAppointmentTime(startAt: string, endAt: string): string {
  const start = new Date(startAt);
  const end = new Date(endAt);
  return `${start.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} – ${end.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
}

export function getStatusLabel(status: AppointmentStatus): string {
  const labels: Record<AppointmentStatus, string> = {
    pending: 'Pendente',
    confirmed: 'Confirmado',
    cancelled: 'Cancelado',
    completed: 'Realizado',
    no_show: 'Não compareceu',
  };
  return labels[status];
}
