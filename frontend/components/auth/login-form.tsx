'use client';

/**
 * Email login/signup form.
 * Source: 03-产品结构 §4.5, 04-UI规范 §5.5
 */

import { useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { sanitizeRedirectPath } from '@/lib/auth/safe-redirect';
import { getTranslations } from '@/lib/i18n/get-translations';

type Mode = 'login' | 'signup';

export function LoginForm({ redirectTo, lang = 'en' }: { redirectTo?: string; lang?: string }) {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const supabase = getSupabaseBrowserClient();
  const t = getTranslations(lang);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(undefined);
    setSuccess(undefined);

    const safeRedirect = sanitizeRedirectPath(redirectTo);

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeRedirect)}`,
        },
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess(t.auth.checkEmail);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        window.location.href = safeRedirect;
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          {t.auth.email}
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-base outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          {t.auth.password}
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-base outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
          placeholder={mode === 'signup' ? t.auth.passwordSignupPlaceholder : t.auth.passwordLoginPlaceholder}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}

      <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
        {mode === 'login' ? t.auth.loginButton : t.auth.signupButton}
      </Button>

      <p className="text-center text-sm text-gray-500">
        {mode === 'login' ? (
          <>
            {t.auth.noAccount}{' '}
            <button type="button" onClick={() => setMode('signup')} className="text-blue-600 hover:underline">
              {t.auth.signupButton}
            </button>
          </>
        ) : (
          <>
            {t.auth.hasAccount}{' '}
            <button type="button" onClick={() => setMode('login')} className="text-blue-600 hover:underline">
              {t.auth.loginButton}
            </button>
          </>
        )}
      </p>
    </form>
  );
}
