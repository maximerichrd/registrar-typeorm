// Should not restrict import as it's the source
// eslint-disable-next-line no-restricted-imports
import { useTranslation as _useTranslation } from 'next-i18next';

import type { Namespace as AppNamespace } from './i18nConfig';

// Copied from i18next
type Resources = Record<string, never>;
type Fallback<F, T = keyof Resources> = [T] extends [never] ? F : T;
type Namespace<F = Fallback<string>> = F | F[];

export function useTranslation<N extends Namespace<AppNamespace>>(
  namespace: N
) {
  return _useTranslation(namespace);
}
