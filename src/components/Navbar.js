import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/Navbar.module.scss';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/userContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

function Navbar() {
    const { t, i18n } = useTranslation();
    const { user, logout, loading, setUser } = useUser();
    const router = useRouter();
    const [avatarHovered, setAvatarHovered] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    const [selectedLanguage, setSelectedLanguage] = useState('');

    useEffect(() => {
        setSelectedLanguage(Cookies.get('selectedLanguage') || '');
    }, []);

    const setLanguageCookie = (languageCode) => {
        Cookies.set('selectedLanguage', languageCode, { expires: 7 });
        setSelectedLanguage(languageCode);
    };

    const handleLogout = async () => {
        await logout();
        router.push('/Login');
    };

    const avatarLinkUrl = user ? '/UserPage' : '/Login';

    const handleLanguageButtonClick = () => {
        setDropdownVisible(!dropdownVisible);
    };
    const handleLanguageChange = (languageCode) => {
        setLanguageCookie(languageCode);
        i18n.changeLanguage(languageCode);

        if (user) {
            console.log("userid " + user.id);
           // const data = { language: languageCode };

            axios
                .post(`/api/updateUserLanguage?userId=${user.id}&language=${languageCode}`)
                .then((response) => {
                    if (response.status === 200) {
                        // Set the user context with the updated language
                        const updatedUser = { ...user, language: languageCode };
                        setUser(updatedUser);
                        console.log("UpdatedUser kieli: " + updatedUser.language);
                        fetchUserData()

                    } else {
                        console.error('Failed to update user language:', response.statusText);
                    }
                })
                .catch((error) => {
                    console.error('An error occurred while updating language:', error);
                });
        } else {
            setSelectedLanguage(languageCode);

        }
        setDropdownVisible(false);
    };


    const fetchUserData = async () => {
        try {
            const response = await axios.get('/api/user');

        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }

        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    //const selectedLanguage = Cookies.get('selectedLanguage');
    const getRemainingLanguages = (selectedLanguage) => {
        const allLanguages = ['fi_FI', 'sv_SE', 'ja_JP'];
        const selectedLangIndex = allLanguages.indexOf(selectedLanguage);
        return allLanguages
            .filter((_, index) => index !== selectedLangIndex)
            .map((lang) => ({
                code: lang,
                name:
                    lang === 'fi_FI'
                        ? 'Suomeksi'
                        : lang === 'sv_SE'
                            ? 'På svenska'
                            : 'Japaniksi',
                image: `lang/${lang}.png`,
            }));
    };

    const remainingLanguages = !user || loading
        ? [
            {
                code: 'fi_FI',
                name: 'Suomeksi',
                image: 'lang/fi_FI.png',
            },
            {
                code: 'sv_SE',
                name: 'På svenska',
                image: 'lang/sv_SE.png',
            },
            {
                code: 'ja_JP',
                name: 'Japaniksi',
                image: 'lang/ja_JP.png',
            },
        ]
        : getRemainingLanguages(user.language);

    return (
        <div className={styles.navbar}>
            <div className={styles.navItems}>
                <div className={styles.langContainer}>
                    <div className={styles.languageDropdown}>
                        <button onClick={handleLanguageButtonClick} className={styles.langButton}>
                            <img
                                src={
                                    user
                                        ? `lang/${user.language}.png`
                                        : selectedLanguage
                                            ? `lang/${selectedLanguage}.png`
                                            : 'lang/default.png'
                                }
                                alt={
                                    user
                                        ? `${user.language} language`
                                        : selectedLanguage
                                            ? `${selectedLanguage} language`
                                            : 'Default language'
                                }
                                className={styles.langImage}
                            />
                            <span className={styles.langText}>Language</span>
                        </button>
                        {dropdownVisible && (
                            <div ref={dropdownRef} className={styles.languageOptions}>
                                {remainingLanguages.map((lang) => (
                                    <div key={lang.code} onClick={() => handleLanguageChange(lang.code)}>
                                        <img src={lang.image} alt={lang.name} className={styles.flagOption} />
                                        <span className={styles.optionText}>{lang.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <button className={styles.navButton} onClick={() => router.push('/MainPage')}>
                    Etusivu
                </button>

                {loading ? null : !user ? (
                    <>
                        <button className={styles.navButton} onClick={() => router.push('/Login')}>
                            Kirjaudu sisään
                        </button>
                        <button className={styles.navButton} onClick={() => router.push('/Registration')}>
                            Rekisteröidy
                        </button>
                    </>
                ) : (
                    <>
                        {user.userRole === 'admin' && (
                            <button className={styles.navButton} onClick={() => router.push('/Admin')}>
                                Admin
                            </button>
                        )}
                        <button className={styles.navButton} onClick={() => router.push('/LevelSelection')}>
                            Tehtävät
                        </button>
                        <button className={styles.navButton} id="signout" onClick={handleLogout}>
                            Kirjaudu ulos
                        </button>
                    </>
                )}
            </div>
            <div className={styles.avatarContainer}>
                {loading ? null : (
                    <button
                        onMouseEnter={() => setAvatarHovered(true)}
                        onMouseLeave={() => setAvatarHovered(false)}
                        onClick={() => router.push(avatarLinkUrl)}
                        className={styles.avatarButton}
                    >
                        <img
                            src={user ? `avatars/avatar${user.avatarId}.png` : 'avatars/default.png'}
                            alt={user ? `${user.username} Avatar` : 'Default Avatar'}
                            className={`${styles.avatar} ${avatarHovered ? styles.avatarHovered : ''}`}
                        />
                    </button>
                )}
            </div>
        </div>
    );
}

export default Navbar;
