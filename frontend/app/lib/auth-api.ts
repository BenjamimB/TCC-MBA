import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export const authApi = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // sends HttpOnly cookie with each request
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LoginResponse {
  accessToken: string;
  professional: { id: string; email: string; name: string };
}

export interface RegisterResponse {
  message: string;
}

export interface AuthApiError {
  code: string;
  message: string;
}

// ---------------------------------------------------------------------------
// Functions
// ---------------------------------------------------------------------------

export async function loginWithEmailPassword(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const res = await authApi.post<LoginResponse>('/auth/login', { email, password });
  return res.data;
}

export async function registerProfessional(
  email: string,
  password: string,
  name: string,
): Promise<RegisterResponse> {
  const res = await authApi.post<RegisterResponse>('/auth/register', { email, password, name });
  return res.data;
}

export async function refreshAccessToken(): Promise<{ accessToken: string }> {
  const res = await authApi.post<{ accessToken: string }>('/auth/refresh');
  return res.data;
}

export async function logout(): Promise<void> {
  await authApi.post('/auth/logout');
}

export async function requestPasswordReset(email: string): Promise<void> {
  await authApi.post('/auth/forgot-password', { email });
}

export function extractApiError(error: unknown): AuthApiError {
  if (axios.isAxiosError(error) && error.response?.data) {
    const data = error.response.data as any;
    return {
      code: data.code ?? 'UNKNOWN_ERROR',
      message: data.message ?? 'Ocorreu um erro inesperado',
    };
  }
  return { code: 'NETWORK_ERROR', message: 'Erro de conexão. Verifique sua internet.' };
}
