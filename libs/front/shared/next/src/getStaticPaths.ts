import type {
  // Should not restrict import as it's the source
  // eslint-disable-next-line no-restricted-imports
  GetStaticPathsContext as NextGetStaticPathsContext,
  GetStaticPathsResult,
} from 'next';

import type {
  defaultLocale,
  SupportedLocale,
} from '@demo/front/shared/i18n/i18nConfig';
import type { ParsedUrlQuery } from 'node:querystring';

export type GetStaticPathsContext = Omit<
  NextGetStaticPathsContext,
  'locales' | 'locale' | 'defaultLocale'
> & {
  locale?: SupportedLocale;
  locales: SupportedLocale[];
  defaultLocale: typeof defaultLocale;
};
export type GetStaticPaths<P extends ParsedUrlQuery> = (
  context: GetStaticPathsContext
) => Promise<GetStaticPathsResult<P>>;
