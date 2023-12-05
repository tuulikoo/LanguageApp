import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../styles/Navbar.module.scss";
import { useUser } from "@/utils/userContext";
/**
 * UserMenu is a navigation component that displays different menu options based on user authentication status.
 * For unauthenticated users, it shows options to navigate to the main page, login, and registration pages.
 * Authenticated users get additional options like accessing user-specific pages or an admin panel if they have admin privileges,
 * as well as the ability to log out. The component also displays the user's avatar if they are logged in.
 *
 * @component
 * @example
 * const router = useRouter();
 * return (
 *   <UserMenu router={router} />
 * )
 *
 * @param {Object} props - The props for the UserMenu component.
 * @param {Object} props.router - The Next.js router object for navigation.
 *
 * @returns {React.ReactElement} A React component that renders a dynamic user navigation menu,
 * adjusting its content based on the user's authentication status and role.
 */

function UserMenu({ router }) {
    const { t } = useTranslation();
    const { user, loading, logout } = useUser();

    const handleLogout = async () => {
        logout();
        router.push("/Login");
    };

    const avatarLinkUrl = user ? "/UserPage" : "/Login";

    return (
        <div className={styles.userMenu}>
            {!loading && !user ? (
                <>
                    <button
                        className={styles.navButton}
                        onClick={() => router.push("/MainPage")}
                    >
                        {t("NavbarFrontpage")}
                    </button>

                    <button
                        className={styles.navButton}
                        onClick={() => router.push("/Login")}
                    >
                        {t("SignIn")}
                    </button>
                    <button
                        className={styles.navButton}
                        onClick={() => router.push("/Registration")}
                    >
                        {t("NavbarRegister")}
                    </button>
                </>
            ) : (
                <>
                    <button
                        className={styles.navButton}
                        onClick={() => router.push("/MainPage")}
                    >
                        {t("NavbarFrontpage")}
                    </button>
                    {user && user.userRole === "admin" && (
                        <button
                            className={styles.navButton}
                            onClick={() => router.push("/Admin")}
                        >
                            {t("NavbarAdmin")}
                        </button>
                    )}
                    <button
                        className={styles.navButton}
                        onClick={() => router.push("/LevelSelection")}
                    >
                        {t("NavbarLevels")}
                    </button>
                    <button
                        className={styles.navButton}
                        id="signout"
                        onClick={handleLogout}
                    >
                        {t("NavbarSignOut")}
                    </button>
                    <button
                        onClick={() => router.push(avatarLinkUrl)}
                        className={styles.avatarButton}
                    >
                        <img
                            src={
                                user
                                    ? `avatars/avatar${user.avatarId}.png`
                                    : "avatars/default.png"
                            }
                            alt={
                                user
                                    ? `${user.username} Avatar`
                                    : "Default Avatar"
                            }
                            className={styles.avatar}
                        />
                    </button>
                </>
            )}
        </div>
    );
}

export default UserMenu;
