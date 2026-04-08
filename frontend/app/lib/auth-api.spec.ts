/**
 * Task 10.1 — Auth API client unit tests
 *
 * Cobre: extração de erros de API Axios.
 * Requirements: 11.1
 */
import axios from 'axios';
import { extractApiError } from './auth-api';

describe('extractApiError()', () => {
  it('[TC-F-09] deve extrair code e message de erro Axios com response', () => {
    const axiosError = {
      isAxiosError: true,
      response: {
        data: { code: 'INVALID_CREDENTIALS', message: 'Credenciais inválidas' },
      },
    };
    jest.spyOn(axios, 'isAxiosError').mockReturnValue(true);

    const result = extractApiError(axiosError);

    expect(result.code).toBe('INVALID_CREDENTIALS');
    expect(result.message).toBe('Credenciais inválidas');
  });

  it('[TC-F-10] deve retornar NETWORK_ERROR para erro sem response (erro de rede)', () => {
    const networkError = new Error('Network Error');
    jest.spyOn(axios, 'isAxiosError').mockReturnValue(false);

    const result = extractApiError(networkError);

    expect(result.code).toBe('NETWORK_ERROR');
    expect(result.message).toContain('conexão');
  });

  it('deve retornar UNKNOWN_ERROR quando response existe mas não tem code', () => {
    const axiosError = {
      isAxiosError: true,
      response: {
        data: { message: 'Algo deu errado' },
      },
    };
    jest.spyOn(axios, 'isAxiosError').mockReturnValue(true);

    const result = extractApiError(axiosError);

    expect(result.code).toBe('UNKNOWN_ERROR');
    expect(result.message).toBe('Algo deu errado');
  });

  it('deve retornar mensagem padrão quando response data não tem message', () => {
    const axiosError = {
      isAxiosError: true,
      response: {
        data: { code: 'RATE_LIMITED' },
      },
    };
    jest.spyOn(axios, 'isAxiosError').mockReturnValue(true);

    const result = extractApiError(axiosError);

    expect(result.message).toBe('Ocorreu um erro inesperado');
  });
});
