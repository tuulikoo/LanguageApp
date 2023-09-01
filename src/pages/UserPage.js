// src/pages/UserPage.js or src/pages/UserPage.tsx
import Head from 'next/head';
import { useState } from 'react';
import styles from '@/styles/UserPage.module.css';

function UserPage() {
    //const [username, setUsername] = useState('');

    // Simulate authentication logic (replace this with your actual logic)
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   router.push('/login'); // Redirect to login if not authenticated
    // } else {
    //   const decoded = verifyToken(token);
    //   if (decoded) {
    //     setUsername(decoded.username);
    //   } else {
    //     router.push('/login'); // Redirect to login if token is invalid
    //   }
    // }

    // For testing purposes, set a username without authentication


    return (
        <div className={styles['welcome-page']}>
            <Head>
                <title>Welcome Page</title>
            </Head>
            <div className={styles['centered-heading']}>
                <h1 className={styles['page-title']}>
                    Welcome to your own page Tester
                </h1>
            </div>
        </div>
    );
}

export default UserPage;
