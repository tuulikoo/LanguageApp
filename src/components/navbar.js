import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Navbar.module.scss';
import { useRouter } from 'next/router';
import { useUser } from '../utils/userContext';

function Navbar() {
    const { user, setUser, setToken } = useUser();
    const router = useRouter();

    const [avatarHovered, setAvatarHovered] = useState(false);

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common.Authorization;
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.navItems}>
                <button className={styles.navButton}>Etusivu</button>
                {user ? null : (
                    <>
                        <button className={styles.navButton} onClick={() => router.push('/Login')}>Kirjaudu sisään</button>
                        <button className={styles.navButton} onClick={() => router.push('/Registration')}>Rekisteröidy</button>
                    </>
                )}
            </div>

            <div className={styles.avatarContainer}>
                {user ? (
                    <>
                        <button className={styles.navButton} onClick={() => router.push('/Levels')}>Tehtävät</button>
                        <button className={styles.navButton} onClick={handleLogout}>Kirjaudu ulos</button>
                        <button 
                            onMouseEnter={() => setAvatarHovered(true)}
                            onMouseLeave={() => setAvatarHovered(false)}
                            onClick={() => router.push('/Dashboard')}
                            className={styles.avatarButton}
                        >
                            <img
                                src={`avatars/avatar${user.avatarId}.png`}
                                alt={`${user.username} Avatar`}
                                className={`${styles.avatar} ${avatarHovered ? styles.avatarHovered : ''}`}
                            />
                        </button>
                    </>
                ) : (
                    <img src="avatars/default.png" alt="Default Avatar" className={styles.avatar} />
                )}
            </div>
        </div>
    );
}

export default Navbar;

