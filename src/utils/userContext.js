import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
/**
 * Context for user data and authentication status.
 * It provides the user object, loading status, and utility functions like logout.
 */
const UserContext = createContext();
/**
 * Custom hook for consuming the UserContext.
 * It allows components to access and manipulate the user's authentication state and data.
 *
 * @returns {Object} The context value containing user data and related functions.
 */
export const useUser = () => {
    return useContext(UserContext);
};
/**
 * Provider component for UserContext.
 * It fetches the user's data on mount and provides it along with utility functions to the children.
 *
 * @param {React.ReactNode} children - The child components that will consume the context.
 * @returns {React.Component} The UserContext Provider with children components.
 */
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sessionTime, setSessionTime] = useState(0);

    /**
     * Asynchronously logs out the user.
     * Calls the logout API endpoint and clears the user state and related cookies.
     */

    const logout = async () => {
        try {
            await axios.post("/api/logout");
            setUser(null);
            Cookies.remove("i18next");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    useEffect(() => {
        axios
            .get("/api/user")
            .then((response) => {
                setUser(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error fetching user:", error);
            });
    }, []);

    const value = {
        user,
        setUser,
        loading,
        logout,
        sessionTime,
        setSessionTime,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
