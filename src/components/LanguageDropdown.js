import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import styles from "../styles/Navbar.module.scss";
import LanguageIcon from '@mui/icons-material/Language';
/**
* LanguageDropdown is a component that allows users to switch the application's language. 
* It supports changing languages on the fly and updating user preferences accordingly.
* The component provides a dropdown menu with available language options, updating the 
* application's internationalization settings upon selection.
*
* @component
* @example
* const user = { id: '123', language: 'en_US' };
* const setUser = (user) => { /* user state update logic *\/ };
* return (
*   <LanguageDropdown user={user} setUser={setUser} />
* )
*
* @param {Object} props - The props for the LanguageDropdown component.
* @param {Object} props.user - The current user object.
* @param {Function} props.setUser - Function to update the current user object.
*
* @returns {React.ReactElement} A React component that renders a language selection dropdown menu.
* Users can select a language from the dropdown to change the application's language setting.
*/


function LanguageDropdown({ user, setUser }) {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    const { i18n } = useTranslation();
    const availableLanguages = [
        { code: "fi_FI", label: "Suomeksi" },
        { code: "sv_SE", label: "På svenska" },
        { code: "ja_JP", label: "日本語" },
    ];

    const handleLanguageChange = async (languageCode) => {
        if (i18n.language !== languageCode) {
            i18n.changeLanguage(languageCode);
            setDropdownVisible(false);
            if (user) {
                await updateUserLanguage(languageCode);
            } else {
                Cookies.set("i18next", languageCode, { expires: 1 });
            }
        }
    };

    const updateUserLanguage = async (languageCode) => {
        try {
            const response = await fetch("/api/updateUserLanguage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user.id,
                    language: languageCode,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                setUser({ ...user, language: languageCode });
                console.log(result.message);
            } else {
                console.error(
                    "Error updating language:",
                    await response.text()
                );
            }
        } catch (error) {
            console.error("An error occurred while updating language:", error);
        }
    };

    useEffect(() => {
        const initializeLanguage = () => {
            const language = user?.language || Cookies.get("i18next");
            if (language) {
                i18n.changeLanguage(language);
            }
        };

        initializeLanguage();
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [user, i18n]);

    const buttonLabel = i18n.language
        ? i18n.t("NavChangeLanguage")
        : i18n.t("NavSelectLanguage");

    return (
        <div className={styles.languageDropdown}>
            <button
                onClick={() => setDropdownVisible(!dropdownVisible)}
                className={styles.langButton}
            >
                {buttonLabel}
                <LanguageIcon className={styles.langIcon} />
            </button>
            {dropdownVisible && (
                <div ref={dropdownRef} className={styles.languageOptions}>
                    {availableLanguages.map((lang) => (
                        <div
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className={styles.languageOption}
                        >
                            <img
                                src={`lang/${lang.code}.png`}
                                alt={`${lang.label} flag`}
                                className={styles.flagOption}
                            />
                            <span className={styles.optionText}>
                                {lang.label}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LanguageDropdown;
