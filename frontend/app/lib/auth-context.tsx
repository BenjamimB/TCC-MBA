'use client';

import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { authApi, refreshAccessToken, logout as apiLogout } from './auth-api';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (token: string, user: AuthUser) => void;
  logout: () => Promise<void>;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const AuthContext = createContext<AuthContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Ref to allow interceptor to read current token without closing over stale state
  const tokenRef = useRef<string | null>(null);

  // Attempt silent refresh on mount to restore session
  useEffect(() => {
    refreshAccessToken()
      .catch(() => {/* no active session */})
      .finally(() => {
        setState((prev) => ({ ...prev, isLoading: false }));
      });
  }, []);

  // Keep ref in sync with state
  useEffect(() => {
    tokenRef.current = state.accessToken;
  }, [state.accessToken]);

  // Set up axios interceptor to add Bearer token to all requests
  useEffect(() => {
    const reqId = authApi.interceptors.request.use((config) => {
      const token = tokenRef.current;
      if (token) {
        config.headers = config.headers ?? {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });

    const resId = authApi.interceptors.response.use(
      (res) => res,
      async (error) => {
        const original = error.config;
        if (error.response?.status === 401 && !original._retry) {
          original._retry = true;
          try {
            const { accessToken } = await refreshAccessToken();
            tokenRef.current = accessToken;
            setState((prev) => ({ ...prev, accessToken }));
            original.headers['Authorization'] = `Bearer ${accessToken}`;
            return authApi(original);
          } catch {
            setState({ user: null, accessToken: null, isAuthenticated: false, isLoading: false });
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      authApi.interceptors.request.eject(reqId);
      authApi.interceptors.response.eject(resId);
    };
  }, []);

  const login = useCallback((token: string, user: AuthUser) => {
    setState({ user, accessToken: token, isAuthenticated: true, isLoading: false });
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } catch {
      // ignore errors on logout
    }
    setState({ user: null, accessToken: null, isAuthenticated: false, isLoading: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
