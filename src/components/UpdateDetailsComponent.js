import { useUser } from '@/utils/userContext';
import {styles} from "next/dist/client/components/react-dev-overlay/internal/components/Toast";

function UpdateDetailsComponent() {
    const { user, loading } = useUser();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>kirjaudu sisaan nahdaksesi profiili</div>;
    }


    return (
        <div className={styles['welcome-page']}>
                <div>
                    <h2 className={styles['page-title2']}>
                        Etunimesi on {user.firstName}
                    </h2>
                    <h2 className={styles['page-title2']}>
                        Sukunimesi on {user.lastName}
                    </h2>
                    {/*
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
            )}
            {/* ... */}
        </div>
        </div>
    );
}

export default UpdateDetailsComponent;
