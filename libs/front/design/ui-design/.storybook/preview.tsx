import '../src/index.css';
import { withI18next } from './i18n/withI18n';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇺🇸', title: 'English-US' },
        { value: 'fr', right: '🇫🇷', title: 'Français' },
      ],
    },
  },
};

export const decorators = [withI18next];
