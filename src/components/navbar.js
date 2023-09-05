import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Navbar.module.scss';
import { useRouter } from 'next/router';

function Navbar() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get('/api/user', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response.data);
    
                if (response.data.isLoggedIn) {
                    setUser(response.data.user);
                }
    
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
    
        fetchUserData();
    }, []);
    

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common.Authorization;
    };

   return (
    <div className={styles.navbar}>
        <div className={styles.navItems}>
            <button className={styles.navButton}>Home</button>
            <button className={styles.navButton}>Lessons</button>
            <button className={styles.navButton}>Profile</button>
            <button className={styles.navButton} onClick={handleLogout}>Logout</button>
        </div>
        <div className={styles.avatarContainer}>
            {/* Placeholder for avatar until you have a user avatar URL */}
            <div className={styles.avatar}></div>
            {user ? <span>{user.username}</span> : null}
        </div>
    </div>
    );
}
export default Navbar;

   

