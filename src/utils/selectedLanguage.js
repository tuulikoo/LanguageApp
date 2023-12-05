import { useUser } from "@/utils/userContext";
import Cookies from "js-cookie";
/**
 * A custom hook that determines the user's preferred language setting.
 * It first checks if a logged-in user has a specified language preference.
 * If not, it falls back to checking the 'i18next' cookie for the language setting.
 * If neither is available, it defaults to 'fi_FI' (Finnish).
 *
 * Usage:
 * This hook is primarily used in multilingual applications to dynamically set or switch
 * the interface language based on user preferences or saved settings in cookies.
 *
 * Returns:
 * - The language code (e.g., 'sv_SE', 'fi_FI') based on user preference or cookie value.
 *
 * @returns {string} The selected language code.
 */
export function useSelectedLanguage() {
    const { user } = useUser();

    if (user && user.language) {
        return user.language;
    }
    return Cookies.get("i18next") || "fi_FI";
}
