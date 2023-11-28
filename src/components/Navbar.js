import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Navbar.module.scss";
import { useRouter } from "next/router";
import { useUser } from "@/utils/userContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";
import { getSelectedLanguage } from "@/utils/selectedLanguage";

function Navbar() {
    const { i18n } = useTranslation();
    const { user, logout, loading, setUser } = useUser();
    const router = useRouter();
    const [avatarHovered, setAvatarHovered] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    const [selectedLanguage, setSelectedLanguage] = useState(
        18n.language || getSelectedLanguage()
    );
    const [navbarVisible, setNavbarVisible] = useState(true);
    const { t } = useTranslation();

    // Update the cookie and the i18n language setting
    const setLanguageCookie = async (languageCode) => {
        if (!user) {
            Cookies.set("i18next", languageCode, { expires: 1 });
        }
        setSelectedLanguage(languageCode);
    };

    // handler for navbar visibility
    const handleScroll = debounce(() => {
        const scrollThreshold = 100;
        if (window.scrollY > scrollThreshold && navbarVisible) {
            setNavbarVisible(false);
        } else if (window.scrollY < scrollThreshold && !navbarVisible) {
            setNavbarVisible(true);
        }
    }, 100);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [navbarVisible, handleScroll]);

    const handleLogout = async () => {
        await logout();
        router.push("/Login");
    };

    const avatarLinkUrl = user ? "/UserPage" : "/Login";

    const handleLanguageButtonClick = () => {
        setDropdownVisible(!dropdownVisible);
    };
    const handleLanguageChange = async (languageCode) => {
        setLanguageCookie(languageCode);
        i18n.changeLanguage(languageCode);
        router.reload();

        if (user) {
            try {
                const response = await axios.post(
                    `/api/updateUserLanguage?userId=${user.id}&language=${languageCode}`
                );
                if (response.status === 200) {
                    // Update the user context with the updated language
                    const updatedUser = { ...user, language: languageCode };
                    setUser(updatedUser);
                    // FetchUserData if needed or handle the update
                }
            } catch (error) {
                console.error(
                    "An error occurred while updating language:",
                    error
                );
            }
        }
        setDropdownVisible(false);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleClickOutside = (event) => {
                if (
                    dropdownRef.current &&
                    !dropdownRef.current.contains(event.target)
                ) {
                    setDropdownVisible(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, []);

    const navbarClasses = `${styles.navbar} ${navbarVisible ? "" : styles.navbarHidden
        }`;

    const getRemainingLanguages = (selectedLanguage) => {
        const allLanguages = ["fi_FI", "sv_SE", "ja_JP"];
        const selectedLangIndex = allLanguages.indexOf(selectedLanguage);
        return allLanguages
            .filter((_, index) => index !== selectedLangIndex)
            .map((lang) => ({
                code: lang,
                name:
                    lang === "fi_FI"
                        ? "Suomeksi"
                        : lang === "sv_SE"
                            ? "På svenska"
                            : "Japaniksi",
                image: `lang/${lang}.png`,
            }));
    };

    const remainingLanguages =
        !user || loading
            ? [
                {
                    code: "fi_FI",
                    name: "Suomeksi",
                    image: "lang/fi_FI.png",
                },
                {
                    code: "sv_SE",
                    name: "På svenska",
                    image: "lang/sv_SE.png",
                },
                {
                    code: "ja_JP",
                    name: "Japaniksi",
                    image: "lang/ja_JP.png",
                },
            ]
            : getRemainingLanguages(user.language);

    return (
        <div className={navbarClasses}>
            <div className={styles.navItems}>
                <div className={styles.langContainer}>
                    <div className={styles.languageDropdown}>
                        <button
                            onClick={handleLanguageButtonClick}
                            className={styles.langButton}
                        >
                            <img
                                src={
                                    user
                                        ? `lang/${user.language}.png`
                                        : selectedLanguage
                                            ? `lang/${selectedLanguage}.png`
                                            : "lang/fi_FI.png"
                                }
                                alt={
                                    user
                                        ? `${user.language} language`
                                        : selectedLanguage
                                            ? `${selectedLanguage} language`
                                            : "Default language"
                                }
                                className={styles.langImage}
                            />
                            <span className={styles.langText}>Language</span>
                        </button>
                        {dropdownVisible && (
                            <div
                                ref={dropdownRef}
                                className={styles.languageOptions}
                            >
                                {remainingLanguages.map((lang) => (
                                    <div
                                        key={lang.code}
                                        onClick={() =>
                                            handleLanguageChange(lang.code)
                                        }
                                    >
                                        <img
                                            src={lang.image}
                                            alt={lang.name}
                                            className={styles.flagOption}
                                        />
                                        <span
                                            className={styles.optionText}
                                        ></span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <button
                    className={styles.navButton}
                    onClick={() => router.push("/MainPage")}
                >
                    {t("NavbarFrontpage")}
                </button>

                {loading ? null : !user ? (
                    <>
                        <button
                            className={styles.navButton}
                            onClick={() => router.push("/Login")}
                        >
                            {t("SignIn")}
                        </button>
                        <button
                            className={styles.navButton}
                            onClick={() => router.push("/Registration")}
                        >
                            {t("NavbarRegister")}
                        </button>
                    </>
                ) : (
                    <>
                        {user.userRole === "admin" && (
                            <button
                                className={styles.navButton}
                                onClick={() => router.push("/Admin")}
                            >
                                {t("NavbarAdmin")}
                            </button>
                        )}
                        <button
                            className={styles.navButton}
                            onClick={() => router.push("/LevelSelection")}
                        >
                            {t("NavbarLevels")}
                        </button>
                        <button
                            className={styles.navButton}
                            id="signout"
                            onClick={handleLogout}
                        >
                            {t("NavbarSignOut")}
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
                            src={
                                user
                                    ? `avatars/avatar${user.avatarId}.png`
                                    : "avatars/default.png"
                            }
                            alt={
                                user
                                    ? `${user.username} Avatar`
                                    : "Default Avatar"
                            }
                            className={`${styles.avatar} ${avatarHovered ? styles.avatarHovered : ""
                                }`}
                        />
                    </button>
                )}
            </div>
        </div>
    );
}

export default Navbar;
