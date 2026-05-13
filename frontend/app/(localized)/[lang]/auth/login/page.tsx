/**
 * Login/Signup page — noindex.
 * Source: 03-产品结构 §4.5, 05 §9.1 (noindex)
 */

import { Suspense } from 'react';
import { getPageMetadata } from '@/lib/seo/metadata';
import { LoginClient } from './login-client';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return getPageMetadata(lang, 'login');
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginClient />
    </Suspense>
  );
}
