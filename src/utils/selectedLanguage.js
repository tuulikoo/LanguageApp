import Cookies from "js-cookie";

export function getSelectedLanguage() {
    return Cookies.get("i18next") || "fi_FI";

}
