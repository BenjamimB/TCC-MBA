'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateLogin } from '@/app/lib/auth-validation';
import { extractApiError, requestPasswordReset } from '@/app/lib/auth-api';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setApiError('');

    // Validate email field using existing validator
    const validation = validateLogin({ email, password: 'placeholder' });
    if (validation.errors.email) {
      setEmailError(validation.errors.email);
      return;
    }
    setEmailError('');

    setLoading(true);
    try {
      await requestPasswordReset(email);
      setSent(true);
    } catch (err) {
      const apiErr = extractApiError(err);
      setApiError(apiErr.message);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-md text-center">
          <h1 className="mb-4 text-2xl font-semibold text-zinc-800">E-mail enviado</h1>
          <p className="mb-6 text-sm text-zinc-500">
            Se houver uma conta com esse e-mail, você receberá as instruções para redefinir sua senha.
          </p>
          <button
            type="button"
            onClick={() => router.push('/auth/login')}
            className="w-full rounded-lg bg-zinc-900 py-2 text-sm font-medium text-white hover:bg-zinc-700"
          >
            Voltar ao login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-md">
        <h1 className="mb-2 text-2xl font-semibold text-zinc-800">Recuperar senha</h1>
        <p className="mb-6 text-sm text-zinc-500">
          Informe seu e-mail e enviaremos um link para redefinir sua senha.
        </p>

        <form onSubmit={handleSubmit} noValidate aria-label="Formulário de recuperação de senha">
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-zinc-700">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? 'email-error' : undefined}
              disabled={loading}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
            />
            {emailError && (
              <span id="email-error" role="alert" className="mt-1 text-xs text-red-600">
                {emailError}
              </span>
            )}
          </div>

          {apiError && (
            <div role="alert" aria-live="assertive" className="mb-4 text-sm text-red-600">
              {apiError}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-zinc-900 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50"
          >
            {loading ? 'Enviando...' : 'Enviar link'}
          </button>

          <button
            type="button"
            onClick={() => router.push('/auth/login')}
            className="mt-3 w-full text-center text-sm text-zinc-500 hover:text-zinc-700"
          >
            Voltar ao login
          </button>
        </form>
      </div>
    </main>
  );
}
