'use client';

/**
 * Login page client component.
 */

import { useSearchParams } from 'next/navigation';
import { LoginForm } from '@/components/auth/login-form';
import { GoogleOAuthButton } from '@/components/auth/google-oauth-button';

export function LoginClient() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/en';
  const error = searchParams.get('error');

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-2">
          Welcome
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Sign up for 5 free conversions per day — no credit card needed.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            Authentication failed. Please try again.
          </div>
        )}

        <GoogleOAuthButton redirectTo={redirectTo} />

        <div className="my-4 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <LoginForm redirectTo={redirectTo} />
      </div>
    </div>
  );
}
