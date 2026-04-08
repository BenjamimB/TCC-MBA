'use client';

import { useState } from 'react';
import { validateRegister } from '@/app/lib/auth-validation';
import { extractApiError, registerProfessional } from '@/app/lib/auth-api';

interface RegisterFormProps {
  onSuccess?: () => void;
  onLoginClick?: () => void;
}

export function RegisterForm({ onSuccess, onLoginClick }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setApiError('');

    const validation = validateRegister({ name, email, password });
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});

    setLoading(true);
    try {
      await registerProfessional(email, password, name);
      setSuccess(true);
      onSuccess?.();
    } catch (err) {
      const apiErr = extractApiError(err);
      setApiError(apiErr.message);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div role="status">
        <p>Cadastro realizado! Verifique seu e-mail para ativar a conta.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Formulário de cadastro">
      <div>
        <label htmlFor="name">Nome completo</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          disabled={loading}
        />
        {errors.name && (
          <span id="name-error" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="reg-email">E-mail</label>
        <input
          id="reg-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'reg-email-error' : undefined}
          disabled={loading}
        />
        {errors.email && (
          <span id="reg-email-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="reg-password">Senha</label>
        <input
          id="reg-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'reg-password-error' : undefined}
          disabled={loading}
        />
        {errors.password && (
          <span id="reg-password-error" role="alert">
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
        {loading ? 'Cadastrando...' : 'Criar conta'}
      </button>

      {onLoginClick && (
        <button type="button" onClick={onLoginClick}>
          Já tenho conta
        </button>
      )}
    </form>
  );
}
