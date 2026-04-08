'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/lib/auth-context';
import {
  getAvailabilityConfig,
  updateAvailabilityConfig,
  DAY_NAMES,
  type AvailabilityConfig,
} from '@/app/lib/schedule-api';
import {
  validateAllConfigs,
  type AvailabilityValidationResult,
} from '@/app/lib/availability-validation';

// ---------------------------------------------------------------------------
// Default config for each day
// ---------------------------------------------------------------------------

function defaultConfig(dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6): AvailabilityConfig {
  return {
    dayOfWeek,
    startTime: '08:00',
    endTime: '18:00',
    slotDurationMinutes: 50,
    breakDurationMinutes: 10,
    isActive: dayOfWeek >= 1 && dayOfWeek <= 5, // Mon–Fri active by default
  };
}

function buildInitialConfigs(): AvailabilityConfig[] {
  return ([0, 1, 2, 3, 4, 5, 6] as const).map(defaultConfig);
}

// ---------------------------------------------------------------------------
// Day row component
// ---------------------------------------------------------------------------

function DayRow({
  config,
  errors,
  onChange,
}: {
  config: AvailabilityConfig;
  errors: AvailabilityValidationResult['errors'];
  onChange: (updated: AvailabilityConfig) => void;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${config.isActive ? 'border-zinc-200 bg-white' : 'border-zinc-100 bg-zinc-50 opacity-60'}`}
    >
      <div className="flex items-center gap-4 flex-wrap">
        {/* Toggle */}
        <label className="flex items-center gap-2 min-w-[140px]">
          <input
            type="checkbox"
            checked={config.isActive}
            onChange={(e) => onChange({ ...config, isActive: e.target.checked })}
            className="h-4 w-4 rounded"
            aria-label={`Ativar ${DAY_NAMES[config.dayOfWeek]}`}
          />
          <span className="text-sm font-medium text-zinc-700">{DAY_NAMES[config.dayOfWeek]}</span>
        </label>

        {/* Times */}
        <div className="flex items-center gap-2">
          <div>
            <label className="sr-only" htmlFor={`start-${config.dayOfWeek}`}>
              Início — {DAY_NAMES[config.dayOfWeek]}
            </label>
            <input
              id={`start-${config.dayOfWeek}`}
              type="time"
              value={config.startTime}
              onChange={(e) => onChange({ ...config, startTime: e.target.value })}
              disabled={!config.isActive}
              className="rounded border border-zinc-300 px-2 py-1 text-sm disabled:opacity-40"
              aria-invalid={!!errors.startTime}
            />
            {errors.startTime && (
              <span role="alert" className="block text-xs text-red-600 mt-0.5">
                {errors.startTime}
              </span>
            )}
          </div>

          <span className="text-zinc-400 text-sm">–</span>

          <div>
            <label className="sr-only" htmlFor={`end-${config.dayOfWeek}`}>
              Término — {DAY_NAMES[config.dayOfWeek]}
            </label>
            <input
              id={`end-${config.dayOfWeek}`}
              type="time"
              value={config.endTime}
              onChange={(e) => onChange({ ...config, endTime: e.target.value })}
              disabled={!config.isActive}
              className="rounded border border-zinc-300 px-2 py-1 text-sm disabled:opacity-40"
              aria-invalid={!!errors.endTime}
            />
            {errors.endTime && (
              <span role="alert" className="block text-xs text-red-600 mt-0.5">
                {errors.endTime}
              </span>
            )}
          </div>
        </div>

        {/* Slot duration */}
        <div className="flex items-center gap-1">
          <label htmlFor={`slot-${config.dayOfWeek}`} className="text-xs text-zinc-500">
            Consulta
          </label>
          <input
            id={`slot-${config.dayOfWeek}`}
            type="number"
            min={15}
            max={240}
            value={config.slotDurationMinutes}
            onChange={(e) => onChange({ ...config, slotDurationMinutes: Number(e.target.value) })}
            disabled={!config.isActive}
            className="w-16 rounded border border-zinc-300 px-2 py-1 text-sm disabled:opacity-40"
            aria-label={`Duração do slot em minutos — ${DAY_NAMES[config.dayOfWeek]}`}
          />
          <span className="text-xs text-zinc-500">min</span>
          {errors.slotDurationMinutes && (
            <span role="alert" className="text-xs text-red-600">{errors.slotDurationMinutes}</span>
          )}
        </div>

        {/* Break duration */}
        <div className="flex items-center gap-1">
          <label htmlFor={`break-${config.dayOfWeek}`} className="text-xs text-zinc-500">
            Intervalo
          </label>
          <input
            id={`break-${config.dayOfWeek}`}
            type="number"
            min={0}
            max={120}
            value={config.breakDurationMinutes}
            onChange={(e) => onChange({ ...config, breakDurationMinutes: Number(e.target.value) })}
            disabled={!config.isActive}
            className="w-16 rounded border border-zinc-300 px-2 py-1 text-sm disabled:opacity-40"
            aria-label={`Intervalo entre consultas em minutos — ${DAY_NAMES[config.dayOfWeek]}`}
          />
          <span className="text-xs text-zinc-500">min</span>
          {errors.breakDurationMinutes && (
            <span role="alert" className="text-xs text-red-600">{errors.breakDurationMinutes}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function SchedulePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  const [configs, setConfigs] = useState<AvailabilityConfig[]>(buildInitialConfigs());
  const [validationErrors, setValidationErrors] = useState<Map<number, AvailabilityValidationResult>>(new Map());
  const [fetchLoading, setFetchLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saved, setSaved] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isLoading, isAuthenticated, router]);

  // Load existing config
  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;
    setFetchLoading(true);
    getAvailabilityConfig(user.id)
      .then((data) => {
        if (data.length > 0) setConfigs(data);
      })
      .catch(() => {/* keep defaults */})
      .finally(() => setFetchLoading(false));
  }, [isAuthenticated, user?.id]);

  function handleChange(updated: AvailabilityConfig) {
    setConfigs((prev) =>
      prev.map((c) => (c.dayOfWeek === updated.dayOfWeek ? updated : c)),
    );
    setSaved(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaveError('');
    setSaved(false);

    const results = validateAllConfigs(configs);
    setValidationErrors(results);
    const hasErrors = [...results.values()].some((r) => !r.valid);
    if (hasErrors) return;

    setSaving(true);
    try {
      await updateAvailabilityConfig(user!.id, configs);
      setSaved(true);
    } catch {
      setSaveError('Erro ao salvar. Tente novamente.');
    } finally {
      setSaving(false);
    }
  }

  if (isLoading || fetchLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-zinc-400">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            aria-label="Voltar ao dashboard"
            className="text-zinc-400 hover:text-zinc-600 text-lg"
          >
            ←
          </button>
          <h1 className="text-lg font-semibold text-zinc-800">Disponibilidade</h1>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <p className="mb-6 text-sm text-zinc-500">
          Configure seus horários de atendimento por dia da semana. Alterações são refletidas no assistente de agendamento em até 5 segundos.
        </p>

        <form onSubmit={handleSave} aria-label="Formulário de disponibilidade">
          <div className="space-y-3 mb-6">
            {configs.map((config) => (
              <DayRow
                key={config.dayOfWeek}
                config={config}
                errors={validationErrors.get(config.dayOfWeek)?.errors ?? {}}
                onChange={handleChange}
              />
            ))}
          </div>

          {saveError && (
            <div role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {saveError}
            </div>
          )}

          {saved && (
            <div role="status" className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              Disponibilidade salva com sucesso.
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-zinc-900 px-6 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50"
          >
            {saving ? 'Salvando...' : 'Salvar disponibilidade'}
          </button>
        </form>
      </main>
    </div>
  );
}
