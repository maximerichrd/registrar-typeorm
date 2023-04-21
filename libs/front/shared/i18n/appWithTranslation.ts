// Should not restrict import as it's the source
// eslint-disable-next-line no-restricted-imports
import { appWithTranslation as _appWithTranslation } from 'next-i18next';

import { i18nConfig } from './i18nConfig';

export function appWithTranslation(
  WrappedComponent: Parameters<typeof _appWithTranslation>[0]
) {
  return _appWithTranslation(WrappedComponent, i18nConfig);
}
