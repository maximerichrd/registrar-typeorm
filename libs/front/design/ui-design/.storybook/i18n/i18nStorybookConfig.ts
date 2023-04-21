import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import Fetch from 'i18next-fetch-backend';

i18n
  .use(Fetch)
  .use(initReactI18next)
  .init({
    ns: ['common'],
    defaultNS: ['common'],
    fallbackLng: 'en',
    debug: true,
  });

export default i18n;
