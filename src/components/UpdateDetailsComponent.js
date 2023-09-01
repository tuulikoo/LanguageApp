import Head from 'next/head';
import { useState } from 'react';
import styles from '@/styles/UserPage.module.css';

function UpdateDetailsComponent() {
    const [isUsernameRowVisible, setUsernameRowVisible] = useState(false);
    const [isPasswordRowVisible, setPasswordRowVisible] = useState(false);
    const [isEmailRowVisible, setEmailRowVisible] = useState(false);
    const [isFirstNameRowVisible, setFirstNameRowVisible] = useState(false);
    const [isLastNameRowVisible, setLastNameRowVisible] = useState(false);

    const toggleVisibility = (setter) => {
        setter((prevState) => !prevState);
    };

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
            <div className={styles['centered-text']}>
                <button className={styles['action-button']} onClick={() => toggleVisibility(setUsernameRowVisible)}>
                    Adjust your settings here
                </button>
            </div>
            <div style={{ display: isUsernameRowVisible ? 'block' : 'none' }}>
                <div className={styles['update-section']}> {/* Use a container for each update section */}
                    <button className={styles['action-button']} onClick={() => toggleVisibility(setPasswordRowVisible)}>
                        Update Password
                    </button>
                    <div style={{ display: isPasswordRowVisible ? 'block' : 'none' }}>
                        <input type="password" placeholder="Enter new password" />
                        <button className={styles['save-button']}>Save</button>
                    </div>
                </div>
                <div className={styles['update-section']}>
                    <button className={styles['action-button']} onClick={() => toggleVisibility(setEmailRowVisible)}>
                        Update Email
                    </button>
                    <div style={{ display: isEmailRowVisible ? 'block' : 'none' }}>
                        <input type="email" placeholder="Enter new email" />
                        <button className={styles['save-button']}>Save</button>
                    </div>
                </div>
                <div className={styles['update-section']}>
                    <button className={styles['action-button']} onClick={() => toggleVisibility(setFirstNameRowVisible)}>
                        Update First Name
                    </button>
                    <div style={{ display: isFirstNameRowVisible ? 'block' : 'none' }}>
                        <input type="text" placeholder="Enter new first name" />
                        <button className={styles['save-button']}>Save</button>
                    </div>
                </div>
                <div className={styles['update-section']}>
                    <button className={styles['action-button']} onClick={() => toggleVisibility(setLastNameRowVisible)}>
                        Update Last Name
                    </button>
                    <div style={{ display: isLastNameRowVisible ? 'block' : 'none' }}>
                        <input type="text" placeholder="Enter new last name" />
                        <button className={styles['save-button']}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateDetailsComponent;
