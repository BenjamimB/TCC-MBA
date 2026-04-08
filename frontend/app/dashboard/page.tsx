'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/lib/auth-context';
import {
  getAppointmentsByWeek,
  cancelAppointment,
  formatAppointmentTime,
  getStatusLabel,
  DAY_NAMES,
  type Appointment,
  type DayAppointments,
} from '@/app/lib/schedule-api';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

// ---------------------------------------------------------------------------
// Status badge colors
// ---------------------------------------------------------------------------

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-zinc-100 text-zinc-600',
  no_show: 'bg-orange-100 text-orange-800',
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getWeekStart(date: Date): string {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun
  d.setDate(d.getDate() - day);
  return d.toISOString().slice(0, 10);
}

function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' });
}

// ---------------------------------------------------------------------------
// Side panel component
// ---------------------------------------------------------------------------

function AppointmentPanel({
  appointment,
  onClose,
  onCancel,
}: {
  appointment: Appointment;
  onClose: () => void;
  onCancel: (id: string) => void;
}) {
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState('');

  async function handleCancel() {
    setCancelling(true);
    setError('');
    try {
      await cancelAppointment(appointment.id);
      onCancel(appointment.id);
    } catch {
      setError('Erro ao cancelar. Tente novamente.');
    } finally {
      setCancelling(false);
    }
  }

  return (
    <aside
      aria-label="Detalhes do agendamento"
      className="w-80 shrink-0 border-l border-zinc-200 bg-white p-6 flex flex-col gap-4"
    >
      <div className="flex items-start justify-between">
        <h2 className="text-base font-semibold text-zinc-800">Detalhes</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar painel"
          className="text-zinc-400 hover:text-zinc-600 text-lg leading-none"
        >
          ×
        </button>
      </div>

      <dl className="space-y-3 text-sm">
        <div>
          <dt className="text-zinc-500">Paciente</dt>
          <dd className="font-medium text-zinc-800">{appointment.patientName ?? '—'}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">Telefone</dt>
          <dd className="text-zinc-700">{appointment.patientPhone ?? '—'}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">Horário</dt>
          <dd className="text-zinc-700">{formatAppointmentTime(appointment.startAt, appointment.endAt)}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">Tipo</dt>
          <dd className="text-zinc-700">{appointment.serviceType}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">Status</dt>
          <dd>
            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[appointment.status] ?? ''}`}>
              {getStatusLabel(appointment.status)}
            </span>
          </dd>
        </div>
        {appointment.notes && (
          <div>
            <dt className="text-zinc-500">Observações</dt>
            <dd className="text-zinc-700 whitespace-pre-wrap">{appointment.notes}</dd>
          </div>
        )}
      </dl>

      {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
        <div className="mt-auto pt-4 border-t border-zinc-100">
          {error && <p className="mb-2 text-xs text-red-600">{error}</p>}
          <button
            type="button"
            onClick={handleCancel}
            disabled={cancelling}
            className="w-full rounded-lg border border-red-200 bg-red-50 py-2 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-50"
          >
            {cancelling ? 'Cancelando...' : 'Cancelar consulta'}
          </button>
        </div>
      )}
    </aside>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  const [weekData, setWeekData] = useState<DayAppointments[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [weekOffset, setWeekOffset] = useState(0); // weeks from today

  const weekStart = getWeekStart(
    new Date(Date.now() + weekOffset * 7 * 24 * 60 * 60 * 1000),
  );

  const fetchWeek = useCallback(async () => {
    if (!user?.id) return;
    setFetchLoading(true);
    setFetchError('');
    try {
      const data = await getAppointmentsByWeek(user.id, weekStart);
      setWeekData(data);
    } catch {
      setFetchError('Erro ao carregar agenda. Tente recarregar a página.');
    } finally {
      setFetchLoading(false);
    }
  }, [user?.id, weekStart]);

  // Redirect to login if not authenticated after loading
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isLoading, isAuthenticated, router]);

  // Fetch week data on mount / week change
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchWeek();
    }
  }, [isAuthenticated, user?.id, fetchWeek]);

  // SSE for real-time updates (Req 3.3)
  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;

    const es = new EventSource(`${API_BASE}/schedule/${user.id}/events`, {
      withCredentials: true,
    });

    es.addEventListener('appointment_created', () => fetchWeek());
    es.addEventListener('appointment_updated', () => fetchWeek());
    es.addEventListener('appointment_cancelled', () => fetchWeek());

    es.onerror = () => {
      // EventSource auto-reconnects; ignore transient errors
    };

    return () => es.close();
  }, [isAuthenticated, user?.id, fetchWeek]);

  function handleCancel(appointmentId: string) {
    setWeekData((prev) =>
      prev.map((day) => ({
        ...day,
        appointments: day.appointments.map((a) =>
          a.id === appointmentId ? { ...a, status: 'cancelled' as const } : a,
        ),
      })),
    );
    setSelectedAppointment(null);
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-zinc-400">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-zinc-50">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4">
        <h1 className="text-lg font-semibold text-zinc-800">Próxima Consulta</h1>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.push('/schedule')}
            className="text-sm text-zinc-500 hover:text-zinc-700"
          >
            Configurar disponibilidade
          </button>
          <span className="text-sm text-zinc-600">{user?.name || user?.email}</span>
        </div>
      </header>

      {/* Week navigation */}
      <div className="flex items-center gap-4 border-b border-zinc-100 bg-white px-6 py-3">
        <button
          type="button"
          onClick={() => setWeekOffset((w) => w - 1)}
          aria-label="Semana anterior"
          className="rounded p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
        >
          ←
        </button>
        <span className="text-sm font-medium text-zinc-700">
          Semana de {formatDate(weekStart)}
        </span>
        <button
          type="button"
          onClick={() => setWeekOffset((w) => w + 1)}
          aria-label="Próxima semana"
          className="rounded p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
        >
          →
        </button>
        <button
          type="button"
          onClick={() => setWeekOffset(0)}
          className="ml-2 text-xs text-zinc-400 hover:text-zinc-600"
        >
          Hoje
        </button>
        {fetchLoading && <span className="ml-auto text-xs text-zinc-400">Atualizando...</span>}
      </div>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          {fetchError && (
            <div role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {fetchError}
            </div>
          )}

          {weekData.length === 0 && !fetchLoading && (
            <p className="text-sm text-zinc-400">Nenhum agendamento nesta semana.</p>
          )}

          <div className="space-y-6">
            {weekData.map((day) => (
              <section key={day.date}>
                <h2 className="mb-3 text-sm font-medium text-zinc-500 uppercase tracking-wide">
                  {formatDate(day.date)} — {DAY_NAMES[new Date(day.date + 'T12:00:00').getDay()]}
                </h2>
                {day.appointments.length === 0 ? (
                  <p className="text-sm text-zinc-300 pl-1">Sem consultas</p>
                ) : (
                  <ul className="space-y-2">
                    {day.appointments.map((appt) => (
                      <li key={appt.id}>
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedAppointment(
                              selectedAppointment?.id === appt.id ? null : appt,
                            )
                          }
                          className={`w-full rounded-xl border text-left px-4 py-3 transition-colors ${
                            selectedAppointment?.id === appt.id
                              ? 'border-zinc-400 bg-zinc-50'
                              : 'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-zinc-800">
                                {appt.patientName ?? 'Paciente'}
                              </p>
                              <p className="text-xs text-zinc-500">
                                {formatAppointmentTime(appt.startAt, appt.endAt)} · {appt.serviceType}
                              </p>
                            </div>
                            <span
                              className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[appt.status] ?? ''}`}
                            >
                              {getStatusLabel(appt.status)}
                            </span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </main>

        {selectedAppointment && (
          <AppointmentPanel
            appointment={selectedAppointment}
            onClose={() => setSelectedAppointment(null)}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}
