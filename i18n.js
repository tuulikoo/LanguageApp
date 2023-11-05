import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
    // we init with resources
    resources: {
        fi_FI: {
            translations: {
                welcome: "Tervetuloa omalle sivullesi",
                userPoints: "Pisteesi on ",
                level: "Olet tasolla ",
                updateDetails: "Tee tietoihisi muutoksia tästä",
                updateDetailsButton: "Tallenna",
                deleteAccount: "Poista tietoni",
                deleteAccountConfirmation: "Haluatko varmasti poistaa tilisi?",
                yes: "Kyllä",
                no: "Ei"
            }
        },
        sv_SE: {
            translations: {
                welcome: "Välkommen till din egen sida",
                userPoints: "Dina poäng",
                level: "Du är på level",
                updateDetails: "Göra ändringar till dina uppgifter här",
                updateDetailsButton: "Spara",
                deleteAccount: "Avlägsna data",
                deleteAccountConfirmation: "Är du säkert att du vill avlägsna din konto?",
                yes: "Ja",
                no: "Nej"
            }
        },

        ja_JP: {
            translations: {
                welcome: "自分のページ へようこそ",
                userPoints: "あなたのスコアは です",
                level: "あなたは {lastLevel} にいます",
                updateDetails: "ここで情報を変更します",
                updateDetailsButton: "保存",
                deleteAccount: "データを削除する",
                deleteAccountConfirmation: "アカウントを削除してもよろしいですか?",
                yes: "はい",
                no: "いいえ"
            }
        }
    },
    fallbackLng: "fi_FI",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
    },

    react: {
        wait: true
    }
});

export default i18n;
