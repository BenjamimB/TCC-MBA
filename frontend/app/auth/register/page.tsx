'use client';

import { useRouter } from 'next/navigation';
import { RegisterForm } from '@/app/components/RegisterForm';

export default function RegisterPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-semibold text-zinc-800">Criar conta</h1>
        <p className="mb-6 text-sm text-zinc-500">
          Crie sua conta de profissional de saúde.
        </p>
        <RegisterForm
          onSuccess={() => router.push('/auth/login')}
          onLoginClick={() => router.push('/auth/login')}
        />
      </div>
    </main>
  );
}
