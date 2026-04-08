'use client';

import { useState } from 'react';
import { validateLogin } from '@/app/lib/auth-validation';
import { extractApiError, loginWithEmailPassword } from '@/app/lib/auth-api';

interface LoginFormProps {
  onSuccess?: (accessToken: string) => void;
  onRegisterClick?: () => void;
  onForgotPasswordClick?: () => void;
}

export function LoginForm({ onSuccess, onRegisterClick, onForgotPasswordClick }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setApiError('');

    const validation = validateLogin({ email, password });
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});

    setLoading(true);
    try {
      const data = await loginWithEmailPassword(email, password);
      onSuccess?.(data.accessToken);
    } catch (err) {
      const apiErr = extractApiError(err);
      setApiError(apiErr.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Formulário de login">
      <div>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          disabled={loading}
        />
        {errors.email && (
          <span id="email-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
          disabled={loading}
        />
        {errors.password && (
          <span id="password-error" role="alert">
            {errors.password}
          </span>
        )}
      </div>

      {apiError && (
        <div role="alert" aria-live="assertive">
          {apiError}
        </div>
      )}

      <button type="submit" disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>

      {onForgotPasswordClick && (
        <button type="button" onClick={onForgotPasswordClick}>
          Esqueci minha senha
        </button>
      )}

      {onRegisterClick && (
        <button type="button" onClick={onRegisterClick}>
          Criar conta
        </button>
      )}
    </form>
  );
}
