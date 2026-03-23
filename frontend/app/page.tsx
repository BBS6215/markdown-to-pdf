import { redirect } from 'next/navigation';

/**
 * Root page — redirects to default language (/en/).
 * Source: 05-技术方案 §4.1, i18n routing
 */
export default function RootPage() {
  redirect('/en');
}
