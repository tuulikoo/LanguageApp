import {UserProvider, useUser} from '@/utils/userContext';
import styles from '../styles/UpdateDetailsComponent.module.scss';
import React, {useState} from 'react';
import axios from 'axios';
import UserPointsComponent from '@/components/UserPointsComponent';


function UpdateDetailsComponent({setUser}) {
    const [isUpdateRowVisible, setUpdateRowVisible] = useState(false);
    const [isUsernameRowVisible, setUsernameRowVisible] = useState(false);
    const [isPasswordRowVisible, setPasswordRowVisible] = useState(false);
    const [isEmailRowVisible, setEmailRowVisible] = useState(false);
    const [isFirstNameRowVisible, setFirstNameRowVisible] = useState(false);
    const [isAvatarRowVisible, setAvatarRowVisible] = useState(false);
    const [selectedAvatarId, setSelectedAvatarId] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newFirstName, setNewFirstName] = useState('');
    const [newUserName, setNewUserName] = useState('');
    const [newAvatar, setNewAvatar] = useState('');
    const {user, loading} = useUser();
    const [avatarHovered, setAvatarHovered] = useState(false);

    const avatars = [
        {id: 1, src: 'avatars/avatar1.png'},
        {id: 2, src: 'avatars/avatar2.png'},
        {id: 3, src: 'avatars/avatar3.png'},
        {id: 4, src: 'avatars/avatar4.png'},
    ];

    const updateUserDetails = async (data) => {
        try {
            data.avatarId = selectedAvatarId;

            const response = await axios.post('/api/updateUser', data);
            if (response.status === 200) {
                console.log('User details updated successfully.');

                await fetchUserData();
            } else {
                console.error('Failed to update user details.');
            }
        } catch (error) {
            console.error('An error occurred while updating user details.', error);
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await axios.get('/api/user');
            setUser(response.data);

            setNewAvatar(response.data.avatarId);
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

    const handleSaveClick = async () => {
        const dataToUpdate = {};
        if (newUserName !== '') {
            dataToUpdate.newUserName = newUserName;
        }
        if (newPassword !== '') {
            dataToUpdate.newPassword = newPassword;
        }
        if (newEmail !== '') {
            dataToUpdate.newEmail = newEmail;
        }
        if (newFirstName !== '') {
            dataToUpdate.newFirstName = newFirstName;
        }

        if (selectedAvatarId !== null) {
            dataToUpdate.newAvatarId = selectedAvatarId;
        }

        // Update details if there's something to update
        if (Object.keys(dataToUpdate).length > 0) {
            try {
                await updateUserDetails({userId: user.id, ...dataToUpdate});

                // Reload the page after successful update
                window.location.reload();
            } catch (error) {
                console.error('Failed to update user details.', error);
            }
        }
    };


    return (
        <div id="section-container" className={styles.container}>
            <div id="currentDetails" className={styles.currentDetails}>
                <h1 className={styles.welcome}>Tervetuloa omalle sivullesi {user.username}</h1>
                <br/>
                <h2 className={styles.welcome}>Pisteesi on {user.userPoints}</h2>
                <h2 className={styles.welcome}>Olet tasolla {user.lastLevel}</h2>
                <br/>
                <p>Tästä voit tarkistaa omat tietosi ja tehdä niihin muutoksia:</p>
                <h3>Etunimesi on {user.firstName}</h3>
                <h3>käyttiksesi on {user.username}</h3>
                <h3>emailisi on {user.email}</h3>
                <h3>
                    Avatarisi on{' '}
                    <img
                        src={`avatars/avatar${user.avatarId}.png`}
                        alt={`${user.username} Avatar`}
                        className={`${styles.avatar} ${avatarHovered ? styles.avatarHovered : ''}`}
                    />
                </h3>
            </div>
            <button
                id="adjust"
                className={styles.adjustButton}
                onClick={() => toggleVisibility(setUpdateRowVisible)}
            >
                Tee tietoihisi muutoksia
            </button>
            {isUpdateRowVisible && (
                <div id="updateBox" className={styles.updateBox}>
                    <div className="update-section">
                        <button
                            id="username"
                            className={styles.showButton}
                            onClick={() => toggleVisibility(setUsernameRowVisible)}
                        >
                            Päivitä käyttäjänimesi
                        </button>
                        {isUsernameRowVisible && (
                            <div>
                                <input
                                    className={styles.inputField}
                                    id="text"
                                    type="text"
                                    placeholder="Enter new username"
                                    value={newUserName}
                                    onChange={(e) => setNewUserName(e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                    <div className="update-section">
                        <button
                            id="password"
                            className={styles.showButton}
                            onClick={() => toggleVisibility(setPasswordRowVisible)}
                        >
                            Muuta salasanaa
                        </button>
                        {isPasswordRowVisible && (
                            <div>
                                <input
                                    className={styles.inputField}
                                    id="newpassword"
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                    <div className="update-section">
                        <button
                            id="email"
                            className={styles.showButton}
                            onClick={() => toggleVisibility(setEmailRowVisible)}
                        >
                            Päivitä sähköpostiosoitteesi
                        </button>
                        {isEmailRowVisible && (
                            <div>
                                <input
                                    className={styles.inputField}
                                    id="emailinput"
                                    type="email"
                                    placeholder="Enter new email"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                    <div className="update-section">
                        <button
                            id="firstname"
                            className={styles.showButton}
                            onClick={() => toggleVisibility(setFirstNameRowVisible)}
                        >
                            Muuta etunimesi
                        </button>
                        {isFirstNameRowVisible && (
                            <div>
                                <input
                                    className={styles.inputField}
                                    id="text"
                                    type="text"
                                    placeholder="Enter new first name"
                                    value={newFirstName}
                                    onChange={(e) => setNewFirstName(e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                    <div className={styles['update-section']}>
                        <button
                            id="avatarupdate"
                            className={styles.showButton}
                            onClick={() => toggleVisibility(setAvatarRowVisible)}
                        >
                            Valitse uusi kaveri
                        </button>
                        {isAvatarRowVisible && (
                            <div className={styles.avatarContainer}>
                                {avatars.map((avatar) => (
                                    <div key={avatar.id}>
                                        <img
                                            src={avatar.src}
                                            alt="Avatar"
                                            className={`${styles.avatarImage} ${selectedAvatarId === avatar.id ? styles.selectedAvatar : ''
                                            }`}
                                            onClick={() => setSelectedAvatarId(avatar.id)}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button className={styles.saveButton} id="saveButton" onClick={handleSaveClick}>
                        Tallenna
                    </button>
                </div>

            )}
            <div className={styles.points}>
            <UserPointsComponent/>
            </div>

        </div>
    );
}

export default function UpdateDetails() {
    const {setUser} = useUser();

    return (
        <UserProvider>
            <UpdateDetailsComponent setUser={setUser}/> {/* Pass setUser as a prop */}
        </UserProvider>
    );
}
