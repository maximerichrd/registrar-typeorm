import type { UserConfig } from 'next-i18next';

import path from 'path';

export const supportedLocales = ['en', 'fr'] as const;
export type SupportedLocale = typeof supportedLocales[number];

export const supportedLocalesTerritory = ['fr_FR', 'en_US'] as const;
export type SupportedLocaleTerritory = typeof supportedLocalesTerritory[number];

export const defaultLocale: SupportedLocale = 'en';
export const defaultLocaleTerritory: SupportedLocaleTerritory = 'en_US';

export const namespaces = ['common', 'home'] as const;
export type Namespace = typeof namespaces[number];

export const localePrefix = ['/fr', ''] as const;
export type LocalePrefix = typeof localePrefix[number];

type NonDefaultLocale = Exclude<SupportedLocale, typeof defaultLocale>;

function isNonDefaultLocale(
  locale: SupportedLocale
): locale is NonDefaultLocale {
  return locale !== defaultLocale;
}

export function getLocaleFromString(
  locale: string | undefined
): SupportedLocale {
  switch (locale) {
    case 'fr':
      return 'fr';
    case 'en':
      return 'en';
    default:
      throw new Error('Locale does not have an assigned prefix');
  }
}

export function getLocaleTerritoryFromLocale(
  locale: SupportedLocale
): SupportedLocaleTerritory {
  switch (locale) {
    case 'fr':
      return 'fr_FR';
    case 'en':
      return 'en_US';
    default:
      throw new Error('Locale does not have an assigned territory');
  }
}

export function getLocalePrefix(
  locale: SupportedLocale
): `/${NonDefaultLocale}` | '' {
  return isNonDefaultLocale(locale) ? `/${locale}` : '';
}

export const i18nConfig: UserConfig = {
  debug: false, // if you have problems and want to verify change this to true
  serializeConfig: false,
  i18n: {
    defaultLocale: defaultLocale,
    locales: [...supportedLocales],
  },
  // WARN: You may need to modify this for production see https://github.com/isaachinman/next-i18next/issues/1458
  localePath:
    process.env.NEXT_PUBLIC_APP_STAGE === 'production'
      ? path.resolve('./public/locales/')
      : 'apps/front/public/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
