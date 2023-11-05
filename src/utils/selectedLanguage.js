import Cookies from 'js-cookie';


export function getSelectedLanguage() {

        const selectedLanguage = Cookies.get('selectedLanguage');
        return selectedLanguage || 'fi_FI';

}