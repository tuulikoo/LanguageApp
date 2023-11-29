import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import styles from "../styles/Navbar.module.scss";

function LanguageDropdown({ user, setUser }) {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    const { i18n } = useTranslation();
    const availableLanguages = ["fi_FI", "sv_SE", "ja_JP"];

    const handleLanguageChange = async (languageCode) => {
        if (i18n.language !== languageCode) {
            i18n.changeLanguage(languageCode);

            if (!user) {
                Cookies.set("i18next", languageCode, { expires: 1 });
            } else {
                updateUserLanguage(languageCode);
            }
        }
        setDropdownVisible(false);
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
        if (!user) {
            const cookieLanguage = Cookies.get("i18next");
            if (cookieLanguage && i18n.language !== cookieLanguage) {
                i18n.changeLanguage(cookieLanguage);
            }
        }
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

    return (
        <div className={styles.languageDropdown}>
            <button
                onClick={() => setDropdownVisible(!dropdownVisible)}
                className={styles.langButton}
            >
                <img
                    src={`lang/${i18n.language}.png`}
                    alt={`${i18n.language} language`}
                    className={styles.langImage}
                />
            </button>
            {dropdownVisible && (
                <div ref={dropdownRef} className={styles.languageOptions}>
                    {availableLanguages.map((lang) => (
                        <div
                            key={lang}
                            onClick={() => handleLanguageChange(lang)}
                            className={styles.languageOption}
                        >
                            <img
                                src={`lang/${lang}.png`}
                                alt={lang}
                                className={styles.flagOption}
                            />
                            <span className={styles.optionText}>
                                {lang === "fi_FI"
                                    ? "Suomeksi"
                                    : lang === "sv_SE"
                                        ? "På svenska"
                                        : "日本語"}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LanguageDropdown;
