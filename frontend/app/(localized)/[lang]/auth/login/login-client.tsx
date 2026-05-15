'use client';

/**
 * Login page client component.
 */

import { useSearchParams } from 'next/navigation';
import { LoginForm } from '@/components/auth/login-form';
import { GoogleOAuthButton } from '@/components/auth/google-oauth-button';
import { getTranslations } from '@/lib/i18n/get-translations';

export function LoginClient({ lang }: { lang: string }) {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || `/${lang}`;
  const error = searchParams.get('error');
  const t = getTranslations(lang);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-2">
          {t.auth.welcome}
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          {t.auth.signUpSubtitle}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {t.auth.authFailed}
          </div>
        )}

        <GoogleOAuthButton redirectTo={redirectTo} lang={lang} />

        <div className="my-4 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">{t.auth.or}</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <LoginForm redirectTo={redirectTo} lang={lang} />
      </div>
    </div>
  );
}
