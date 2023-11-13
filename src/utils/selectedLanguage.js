import Cookies from "js-cookie";

export function getSelectedLanguage() {


    const selectedLanguage = Cookies.get("i18next") || "fi_FI";
    return selectedLanguage;

}
