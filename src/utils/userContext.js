import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sessionTime, setSessionTime] = useState(0);


    // logout function to call logout api endpoint
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

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
