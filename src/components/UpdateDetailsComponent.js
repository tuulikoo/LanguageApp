import Head from 'next/head';
import {useEffect, useState} from 'react';
import axios from 'axios'; // Import Axios
import { useUser, updateUser } from '../utils/userContext';

import styles from '@/styles/UserPage.module.css';

function UpdateDetailsComponent() {
    const [isUsernameRowVisible, setUsernameRowVisible] = useState(false);
    const [isPasswordRowVisible, setPasswordRowVisible] = useState(false);
    const [isEmailRowVisible, setEmailRowVisible] = useState(false);
    const [isFirstNameRowVisible, setFirstNameRowVisible] = useState(false);
    const [isLastNameRowVisible, setLastNameRowVisible] = useState(false);

    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');

    const toggleVisibility = (setter) => {
        setter((prevState) => !prevState);
    };

    // Function to handle updating user details via Axios
    const updateUserDetails = async (endpoint, data) => {
        try {
            const response = await axios.post(endpoint, data);
            if (response.status === 200) {
                // Handle success:
                console.log('User details updated successfully.');

                // Refresh user data after successful update
                await fetchUserData();
            } else {
                // Handle other response statuses or errors
                console.error('Failed to update user details.');
            }
        } catch (error) {
            // Handle network errors or exceptions
            console.error('An error occurred while updating user details.', error);
        }
    };
    const fetchUserData = async () => {
        try {
            const response = await axios.get('/api/user');
            if (response.status === 200) {
                // Update user context state with the refreshed user data
                updateUser(response.data.user); // Assuming you have an updateUser function in your user context
            } else {
                console.error('Failed to fetch user data.');
            }
        } catch (error) {
            console.error('An error occurred while fetching user data.', error);
        }
    };

    // useEffect to fetch user data when the component mounts
    useEffect(() => {
        fetchUserData().then((response) => {
            // Handle the response or perform an action if needed
            console.log('User data fetched:', response);
        });
    }, []);


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
                <div className={styles['update-section']}>
                    <button className={styles['action-button']} onClick={() => toggleVisibility(setPasswordRowVisible)}>
                        Update Password
                    </button>
                    <div style={{ display: isPasswordRowVisible ? 'block' : 'none' }}>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button
                            className={styles['save-button']}
                            onClick={() => updateUserDetails("/api/updatePassword", { newPassword })}
                        >
                            Save
                        </button>
                    </div>
                </div>
                <div className={styles['update-section']}>
                    <button className={styles['action-button']} onClick={() => toggleVisibility(setEmailRowVisible)}>
                        Update Email
                    </button>
                    <div style={{ display: isEmailRowVisible ? 'block' : 'none' }}>
                        <input
                            type="email"
                            placeholder="Enter new email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                        <button
                            className={styles['save-button']}
                            onClick={() => updateUserDetails("/api/updateEmail", { newEmail })}
                        >
                            Save
                        </button>
                    </div>
                </div>
                <div className={styles['update-section']}>
                    <button className={styles['action-button']} onClick={() => toggleVisibility(setFirstNameRowVisible)}>
                        Update First Name
                    </button>
                    <div style={{ display: isFirstNameRowVisible ? 'block' : 'none' }}>
                        <input
                            type="text"
                            placeholder="Enter new first name"
                            value={newFirstName}
                            onChange={(e) => setNewFirstName(e.target.value)}
                        />
                        <button
                            className={styles['save-button']}
                            onClick={() => updateUserDetails("/api/updateFirstname", { newFirstName })}
                        >
                            Save
                        </button>
                    </div>
                </div>
                <div className={styles['update-section']}>
                    <button className={styles['action-button']} onClick={() => toggleVisibility(setLastNameRowVisible)}>
                        Update Last Name
                    </button>
                    <div style={{ display: isLastNameRowVisible ? 'block' : 'none' }}>
                        <input
                            type="text"
                            placeholder="Enter new last name"
                            value={newLastName}
                            onChange={(e) => setNewLastName(e.target.value)}
                        />
                        <button
                            className={styles['save-button']}
                            onClick={() => updateUserDetails("/api/updateLastname", { newLastName })}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateDetailsComponent;
