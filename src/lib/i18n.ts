// See www.i18next.com and www.i18next.com/overview/configuration-options

import i18n from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-chained-backend';
import Fetch from 'i18next-fetch-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';
import { initReactI18next } from 'react-i18next';

export type Locale = 'de';

// Getting the current locale requires the languages to be whitelisted.
export const currentLocale = (): Locale => i18n.languages[0] as Locale;

i18n
  .use(Backend)
  .use(Fetch)
  // .use(LanguageDetector)
  .use(initReactI18next)
  // @ts-ignore // TODO: sort out TS error
  .init({
    backend: {
      backends: [
        // First get from cache; if empty, fetch from backend.
        LocalStorageBackend,
        Fetch,
      ],
      backendOptions: [
        {
          prefix: 'i18next_lng_',
        },
        {
          loadPath: `/locales/{{lng}}/{{ns}}hello.json`,
        },
      ],
    },
    debug: false,
    defaultNS: 'frontend',
    fallbackLng: 'de',
    interpolation: {
      escapeValue: false, // Not needed for React as it escapes by default.
    },
    lng: 'de', // if you're using a language detector, do not define the lng option.
    keySeparator: false, // Not needed as we do not use keys.
    ns: 'frontend',
    whitelist: ['en', 'de'],
    react: {
      useSuspense: false,
    },
  });

export default i18n;
