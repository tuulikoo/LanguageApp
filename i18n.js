import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
    .use(HttpApi) // use http backend
    .use(LanguageDetector) // detect user language
    .init({
        // don't define resources here
        fallbackLng: 'fi',
        debug: true,

        // have a common namespace used around the full app
        ns: ['common'],
        defaultNS: 'common',

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },

        react: {
            useSuspense: false,
        },

        backend: {
            // path where resources get loaded from
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
    });

export default i18n;

