import i18n from "i18next";
import HttpApi from "i18next-http-backend";

i18n.use(HttpApi) // use http backend
    .init({
        // don't define resources here
        fallbackLng: "fi_FI",
        debug: true,
        supportedLngs: ["en_GB", "fi_FI", "ja_JP", "sv_SE"],

        // have a common namespace used around the full app
        ns: ["common"],
        defaultNS: "common",

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },

        react: {
            useSuspense: true,
        },

        backend: {
            loadPath: function(lngs, namespaces) {
                return `/locales/${lngs[0]}/${namespaces[0]}.json`;
            },
        },
    });

export default i18n;
