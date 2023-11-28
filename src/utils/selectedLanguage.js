import { useUser } from '@/utils/userContext';
import Cookies from 'js-cookie';

export function useSelectedLanguage() {
    const { user } = useUser();

    if (user && user.language) {
        return user.language;
    }
    return Cookies.get('i18next') || 'fi_FI';

}

