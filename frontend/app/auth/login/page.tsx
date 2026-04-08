'use client';

import { useRouter } from 'next/navigation';
import { decodeJwt } from 'jose';
import { LoginForm } from '@/app/components/LoginForm';
import { useAuth } from '@/app/lib/auth-context';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  function handleSuccess(accessToken: string) {
    // Decode JWT claims to extract user info (no signature check — token came from server)
    let user = { id: '', email: '', name: '' };
    try {
      const claims = decodeJwt(accessToken);
      user = {
        id: (claims.sub as string) ?? '',
        email: (claims.email as string) ?? '',
        name: (claims.name as string) ?? '',
      };
    } catch {
      // proceed with empty user — dashboard will handle missing profile
    }
    login(accessToken, user);
    router.push('/dashboard');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-semibold text-zinc-800">Próxima Consulta</h1>
        <p className="mb-6 text-sm text-zinc-500">Entre na sua conta para continuar.</p>
        <LoginForm
          onSuccess={handleSuccess}
          onRegisterClick={() => router.push('/auth/register')}
          onForgotPasswordClick={() => router.push('/auth/forgot-password')}
        />
      </div>
    </main>
  );
}
