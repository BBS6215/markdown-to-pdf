/**
 * Dashboard — conversion history.
 * Source: 03-产品结构 §4.7, 06-数据库设计 §5.3
 * noindex page (05 §9.1)
 *
 * The frontend-only pipeline removed daily quota gating, so this page no
 * longer reads daily_usage. Conversion history is still shown so users can
 * see what they've recently exported.
 */

import { redirect } from 'next/navigation';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { getPageMetadata } from '@/lib/seo/metadata';
import { DashboardClient } from './dashboard-client';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return getPageMetadata(lang, 'dashboard');
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${lang}/auth/login?redirect=/${lang}/dashboard`);
  }

  const historyResult = await supabase
    .from('conversion_history')
    .select('id, format, filename, file_size_bytes, status, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50);

  const history = historyResult.data || [];

  return <DashboardClient history={history} lang={lang} />;
}
