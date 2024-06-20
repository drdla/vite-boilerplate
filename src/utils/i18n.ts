/**
 * This file sets up internationalization (i18n) for the application with i18next.
 * Translations are fetched from a backend and stored in local storage.
 * Fetching translations instead of compiling them into the bundle
 * allows internationalization workflows where an internationalization service
 * (https://locize.com/, https://crowdin.com/, https://lokalise.com/)
 * places the translations in a CDN.
 * @see {@link https://www.i18next.com/overview/configuration-options}
 */

import i18n from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-chained-backend';
import Fetch from 'i18next-fetch-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';
import { initReactI18next } from 'react-i18next';

export type Locale = 'de';

// Getting the current locale requires the languages to be whitelisted.
export const currentLocale = (): Locale => i18n.languages[0] as Locale;

void i18n
  .use(Backend)
  .use(Fetch)
  // .use(LanguageDetector)
  .use(initReactI18next)
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
    compatibilityJSON: 'v4', // Enable current pluralization, see https://www.i18next.com/translation-function/plurals
    debug: false,
    defaultNS: 'frontend',
    fallbackLng: 'de',
    interpolation: {
      escapeValue: false, // XSS protection - not needed as React escapes by default.
    },
    lng: 'de', // Set the language. Don't set when using a language detector!
    // keySeparator: false, // Set to false if working with a flat JSON file.
    ns: 'frontend',
    react: {
      useSuspense: false,
    },
  });

export default i18n;
