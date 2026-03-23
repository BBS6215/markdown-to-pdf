/**
 * Dashboard — conversion history + usage stats.
 * Source: 03-产品结构 §4.7, 06-数据库设计 §5.3
 * noindex page (05 §9.1)
 */

import { redirect } from 'next/navigation';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { DashboardClient } from './dashboard-client';

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

  // Fetch data server-side
  const [historyResult, usageResult] = await Promise.all([
    supabase
      .from('conversion_history')
      .select('id, format, filename, file_size_bytes, status, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50),
    supabase
      .from('daily_usage')
      .select('pdf_word_count')
      .eq('user_id', user.id)
      .eq('usage_date', new Date().toISOString().slice(0, 10))
      .single(),
  ]);

  const history = historyResult.data || [];
  const todayUsed = usageResult.data?.pdf_word_count || 0;

  return <DashboardClient history={history} todayUsed={todayUsed} />;
}
