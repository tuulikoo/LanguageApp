import {UserProvider, useUser} from '@/utils/userContext';
import {styles} from "next/dist/client/components/react-dev-overlay/internal/components/Toast";
import React, { useState } from "react";
import axios from 'axios';
import {generateToken} from "@/utils/jwt";
function UpdateDetailsComponent({ setUser }) {
    const [isUpdateRowVisible, setUpdateRowVisible] = useState(false);
    const [isUsernameRowVisible, setUsernameRowVisible] = useState(false);
    const [isPasswordRowVisible, setPasswordRowVisible] = useState(false);
    const [isEmailRowVisible, setEmailRowVisible] = useState(false);
    const [isFirstNameRowVisible, setFirstNameRowVisible] = useState(false);

    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newFirstName, setNewFirstName] = useState('');
    const [newUserName, setNewUserName] = useState('');
    const { user, loading } = useUser();

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
            <h2>Etunimesi on {user.firstName}</h2>
            <h2>käyttiksesi on {user.username}</h2>
            <h2>emailisi on {user.email}</h2>
            <h2>salasanasi on {user.password}</h2>
            <div>
                <button onClick={() => toggleVisibility(setUpdateRowVisible)}>
                    Adjust your settings here
                </button>
                {isUpdateRowVisible && (
                    <div>
                        <div className="update-section">
                            <button onClick={() => toggleVisibility(setUsernameRowVisible)}>
                                Update Username
                            </button>
                            {isUsernameRowVisible && (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Enter new username"
                                        value={newUserName}
                                        onChange={(e) => setNewUserName(e.target.value)}
                                    />
                                    <button onClick={() => updateUserDetails("/api/updateUsername", { userId: user.id, newUserName })}>
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="update-section">
                            <button onClick={() => toggleVisibility(setPasswordRowVisible)}>
                                Update Password
                            </button>
                            {isPasswordRowVisible && (
                                <div>
                                    <input
                                        type="password"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <button onClick={() => updateUserDetails("/api/updatePassword", { userId: user.id, newPassword })}>
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="update-section">
                            <button onClick={() => toggleVisibility(setEmailRowVisible)}>
                                Update Email
                            </button>
                            {isEmailRowVisible && (
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Enter new email"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                    />
                                    <button onClick={() => updateUserDetails("/api/updateEmail", { userId: user.id, newEmail })}>
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="update-section">
                            <button onClick={() => toggleVisibility(setFirstNameRowVisible)}>
                                Update First Name
                            </button>
                            {isFirstNameRowVisible && (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Enter new first name"
                                        value={newFirstName}
                                        onChange={(e) => setNewFirstName(e.target.value)}
                                    />
                                    <button onClick={() => updateUserDetails("/api/updateFirstName", { userId: user.id, newFirstName })}>
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

