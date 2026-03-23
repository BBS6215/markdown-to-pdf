/**
 * Server-side i18n utilities for RSC.
 * Source: 05-技术方案 §4.1 (lib/i18n/server-utils.ts)
 */

import type { Locale } from './config';
import type { Translations } from './locales/en';

const dictionaries: Record<Locale, () => Promise<{ default: Translations }>> = {
  en: () => import('./locales/en'),
  zh: () => import('./locales/zh'),
};

export async function getTranslations(locale: Locale): Promise<Translations> {
  const mod = await dictionaries[locale]();
  return mod.default;
}
