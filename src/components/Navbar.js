import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/utils/userContext";
import LanguageDropdown from "./LanguageDropdown";
import UserMenu from "./UserMenu";
import styles from "../styles/Navbar.module.scss";

/**
 * Navbar is a component that provides navigation and language selection features for the application.
 * It includes a LanguageDropdown for language switching and a UserMenu for user-related actions.
 * The Navbar visibility is controlled based on the scroll position of the window, hiding when a certain scroll threshold is exceeded.
 *
 * @component
 * @example
 * return (
 *   <Navbar />
 * )
 *
 * @returns {React.ReactElement} A React component that renders the navigation bar of the application.
 * It contains components for language selection and user actions. The navbar automatically hides on
 * scrolling down past a specified threshold, enhancing the user interface experience.
 */

function Navbar() {
    const { user, loading, setUser } = useUser();
    const router = useRouter();
    const [navbarVisible, setNavbarVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 100;
            setNavbarVisible(window.scrollY < scrollThreshold);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navbarClasses = `${styles.navbar} ${
        navbarVisible ? "" : styles.navbarHidden
    }`;

    return (
        <div className={navbarClasses}>
            <LanguageDropdown user={user} setUser={setUser} />
            <UserMenu user={user} loading={loading} router={router} />
        </div>
    );
}

export default Navbar;
