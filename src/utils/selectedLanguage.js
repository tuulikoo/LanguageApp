import Cookies from "js-cookie";
import { user } from "@/utils/userContext";


export function getSelectedLanguage() {
    if (user) {
        return user.language;
    } else return Cookies.get("i18next") || "fi_FI";
}
