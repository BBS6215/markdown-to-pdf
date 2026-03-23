/**
 * i18n configuration.
 * Source: 05-技术方案 §4.1
 */

export const LOCALES = ['en', 'zh'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export function isValidLocale(lang: string): lang is Locale {
  return LOCALES.includes(lang as Locale);
}
