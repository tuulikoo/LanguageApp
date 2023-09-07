import {UserProvider, useUser} from '@/utils/userContext';
import styles from "../styles/UpdateDetailsComponent.module.scss";
import React, {useEffect, useState} from "react";
import axios from 'axios';



function UpdateDetailsComponent({ setUser }) {
    const [isUpdateRowVisible, setUpdateRowVisible] = useState(false);
    const [isUsernameRowVisible, setUsernameRowVisible] = useState(false);
    const [isPasswordRowVisible, setPasswordRowVisible] = useState(false);
    const [isEmailRowVisible, setEmailRowVisible] = useState(false);
    const [isFirstNameRowVisible, setFirstNameRowVisible] = useState(false);
    const [isAvatarRowVisible, setAvatarRowVisible] = useState(false);

    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newFirstName, setNewFirstName] = useState('');
    const [newUserName, setNewUserName] = useState('');
    const [selectedAvatarId, setSelectedAvatarId] = useState( '');
    const [userAvatar, setUserAvatar] = useState(null);
    const { user, loading } = useUser();

    const avatars = [
        { id: 1, src: "avatars/avatar1.png" },
        { id: 2, src: "avatars/avatar2.png" },
        { id: 3, src: "avatars/avatar3.png" },
        { id: 4, src: "avatars/avatar4.png" },
    ];

    const updateUserDetails = async (endpoint, data) => {
        try {
            // Include the selectedAvatarId in the request data
            data.avatarId = selectedAvatarId;

            const response = await axios.post(endpoint, data);
            if (response.status === 200) {
                // Handle success:
                console.log("User details updated successfully.");

                // Refresh user data after successful update
                await fetchUserData();
            } else {
                // Handle other response statuses or errors
                console.error("Failed to update user details.");
            }
        } catch (error) {
            // Handle network errors or exceptions
            console.error("An error occurred while updating user details.", error);
        }
    };



    const fetchUserData = async () => {
        try {
            const response = await axios.get('/api/user'); // Replace with the correct API endpoint for fetching user data
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>kirjaudu sisaan nahdaksesi profiili</div>;
    }


    function toggleVisibility(setVisibilityState) {
        setVisibilityState((prev) => !prev);
    }


    return (
        <div>
            <div id = "currentDetails" className ={styles.currentDetails}>
                <h2>Etunimesi on {user.firstName}</h2>
                <h2>käyttiksesi on {user.username}</h2>
                <h2>emailisi on {user.email}</h2>
                <h2>salasanasi on {user.password}</h2>
                <h2>Avatarisi on numero {user.avatarId}</h2>

            </div>
            <div>
                <button className={styles.adjustButton} onClick={() => toggleVisibility(setUpdateRowVisible)}>
                    Adjust your settings here
                </button>
                {isUpdateRowVisible && (
                    <div id = "updateBox" className = {styles.updateBox}>
                        <div className="update-section">
                            <button className={styles.showButton}onClick={() => toggleVisibility(setUsernameRowVisible)}>
                                Update Username
                            </button>
                            {isUsernameRowVisible && (
                                <div>
                                    <input id = "text"
                                        type="text"
                                        placeholder="Enter new username"
                                        value={newUserName}
                                        onChange={(e) => setNewUserName(e.target.value)}
                                    />
                                    <button className={styles.saveButton} onClick={() => updateUserDetails("/api/updateUsername", { userId: user.id, newUserName })}>
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="update-section">
                            <button className={styles.showButton} onClick={() => toggleVisibility(setPasswordRowVisible)}>
                                Update Password
                            </button>
                            {isPasswordRowVisible && (
                                <div>
                                    <input id = "password"
                                        type="password"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <button className={styles.saveButton} onClick={() => updateUserDetails("/api/updatePassword", { userId: user.id, newPassword })}>
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="update-section">
                            <button className={styles.showButton}onClick={() => toggleVisibility(setEmailRowVisible)}>
                                Update Email
                            </button>
                            {isEmailRowVisible && (
                                <div>
                                    <input id = "email"
                                        type="email"
                                        placeholder="Enter new email"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                    />
                                    <button className={styles.saveButton} onClick={() => updateUserDetails("/api/updateEmail", { userId: user.id, newEmail })}>
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="update-section">
                            <button className={styles.showButton}onClick={() => toggleVisibility(setFirstNameRowVisible)}>
                                Update First Name
                            </button>
                            {isFirstNameRowVisible && (
                                <div>
                                    <input id = "text"
                                        type="text"
                                        placeholder="Enter new first name"
                                        value={newFirstName}
                                        onChange={(e) => setNewFirstName(e.target.value)}
                                    />
                                    <button className={styles.saveButton}onClick={() => updateUserDetails("/api/updateFirstName", { userId: user.id, newFirstName })}>
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function UpdateDetails() {
    const { setUser } = useUser();

    return (
        <UserProvider>
            <UpdateDetailsComponent setUser={setUser} /> {/* Pass setUser as a prop */}
        </UserProvider>
    );
}

