/**
 * Task 10.1 — LoginForm component tests
 *
 * Cobre: renderização, validação client-side, submissão e erros de API.
 * Requirements: 11.1, 11.4, 11.5
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';
import * as authApi from '@/app/lib/auth-api';

jest.mock('@/app/lib/auth-api', () => ({
  loginWithEmailPassword: jest.fn(),
  extractApiError: jest.requireActual('@/app/lib/auth-api').extractApiError,
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function fillAndSubmit(email: string, password: string) {
  const user = userEvent.setup();
  if (email) await user.type(screen.getByLabelText('E-mail'), email);
  if (password) await user.type(screen.getByLabelText('Senha'), password);
  await user.click(screen.getByRole('button', { name: /entrar/i }));
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar campos de e-mail e senha', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('deve exibir erro de validação quando e-mail está vazio', async () => {
    render(<LoginForm />);
    await fillAndSubmit('', 'senha123');
    expect(await screen.findByText('E-mail é obrigatório')).toBeInTheDocument();
  });

  it('deve exibir erro de validação quando senha está vazia', async () => {
    render(<LoginForm />);
    await fillAndSubmit('dr@clinica.com', '');
    expect(await screen.findByText('Senha é obrigatória')).toBeInTheDocument();
  });

  it('deve chamar loginWithEmailPassword com dados corretos ao submeter', async () => {
    (authApi.loginWithEmailPassword as jest.Mock).mockResolvedValue({
      accessToken: 'token-abc',
      professional: { id: 'prof-1', email: 'dr@clinica.com', name: 'Dr. Ana' },
    });
    const onSuccess = jest.fn();
    render(<LoginForm onSuccess={onSuccess} />);

    await fillAndSubmit('dr@clinica.com', 'senha123');

    await waitFor(() => {
      expect(authApi.loginWithEmailPassword).toHaveBeenCalledWith('dr@clinica.com', 'senha123');
      expect(onSuccess).toHaveBeenCalledWith('token-abc');
    });
  });

  it('deve exibir mensagem de erro da API quando login falha', async () => {
    const axiosError = Object.assign(new Error(), {
      isAxiosError: true,
      response: {
        data: { code: 'INVALID_CREDENTIALS', message: 'E-mail ou senha incorretos' },
      },
    });
    (authApi.loginWithEmailPassword as jest.Mock).mockRejectedValue(axiosError);
    render(<LoginForm />);

    await fillAndSubmit('dr@clinica.com', 'senhaerrada');

    expect(await screen.findByRole('alert')).toHaveTextContent('E-mail ou senha incorretos');
  });

  it('deve desabilitar o botão durante o carregamento', async () => {
    (authApi.loginWithEmailPassword as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000)),
    );
    render(<LoginForm />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText('E-mail'), 'dr@clinica.com');
    await user.type(screen.getByLabelText('Senha'), 'senha123');
    await user.click(screen.getByRole('button', { name: /entrar/i }));

    expect(screen.getByRole('button', { name: /entrando/i })).toBeDisabled();
  });

  it('deve exibir botão de recuperação de senha quando callback fornecido', () => {
    render(<LoginForm onForgotPasswordClick={jest.fn()} />);
    expect(screen.getByRole('button', { name: /esqueci/i })).toBeInTheDocument();
  });

  it('deve chamar onForgotPasswordClick ao clicar em "Esqueci minha senha"', async () => {
    const onForgot = jest.fn();
    render(<LoginForm onForgotPasswordClick={onForgot} />);
    fireEvent.click(screen.getByRole('button', { name: /esqueci/i }));
    expect(onForgot).toHaveBeenCalled();
  });

  it('deve exibir botão de cadastro quando callback fornecido', () => {
    render(<LoginForm onRegisterClick={jest.fn()} />);
    expect(screen.getByRole('button', { name: /criar conta/i })).toBeInTheDocument();
  });
});
