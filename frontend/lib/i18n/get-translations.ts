import en from './locales/en';
import zh from './locales/zh';
import type { Translations } from './locales/en';

const TRANSLATIONS: Record<string, Translations> = { en, zh };

export function getTranslations(lang = 'en'): Translations {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}
