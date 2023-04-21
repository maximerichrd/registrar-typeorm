import * as React from 'react';
import { I18nextProvider } from 'react-i18next';

import type { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';

import i18n from './i18nStorybookConfig';

export function withI18next(
  storyFn: () => StoryFnReactReturnType,
  context: Record<string, Record<string, string>>
) {
  const locale = context.globals.locale;
  i18n.changeLanguage(locale);

  return (
    <React.Suspense fallback="Loading translations...">
      <I18nextProvider i18n={i18n}>{storyFn()}</I18nextProvider>
    </React.Suspense>
  );
}
