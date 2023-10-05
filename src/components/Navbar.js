import React, { useState } from 'react';
import styles from '../styles/Navbar.module.scss';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/userContext';

function Navbar() {
    const { user, logout, loading } = useUser();
    const router = useRouter();
    const [avatarHovered, setAvatarHovered] = useState(false);

    const handleLogout = async () => {
        await logout();
        router.push('/Login');
    };


    const avatarLinkUrl = user ? '/UserPage' : '/Login';

    return (
        <div className={styles.navbar}>
            <div className={styles.navItems}>
                <button className={styles.navButton} onClick={() => router.push('/MainPage')}>Etusivu</button>

                {loading ? null : !user ? (
                    <>
                        <button className={styles.navButton} onClick={() => router.push('/Login')}>Kirjaudu sisään
                        </button>
                        <button className={styles.navButton} onClick={() => router.push('/Registration')}>Rekisteröidy
                        </button>
                    </>
                ) : (
                    <>
                        {user.userRole === 'admin' && (
                            <button className={styles.navButton} onClick={() => router.push('/Admin')}>Admin</button>
                        )}
                        <button className={styles.navButton} onClick={() => router.push('/LevelSelection')}>Tehtävät</button>
                        <button className={styles.navButton} id="signout" onClick={handleLogout}>Kirjaudu ulos</button>
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

