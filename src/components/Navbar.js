import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from "@/utils/userContext";
import LanguageDropdown from './LanguageDropdown';
import UserMenu from './UserMenu';
import styles from "../styles/Navbar.module.scss";

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

    const navbarClasses = `${styles.navbar} ${navbarVisible ? "" : styles.navbarHidden}`;

    return (
        <div className={navbarClasses}>
            <LanguageDropdown user={user} setUser={setUser} />
            <UserMenu user={user} loading={loading} router={router} />
        </div>
    );
}

export default Navbar;

