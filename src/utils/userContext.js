import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            axios.get('/api/user')
                .then(response => {
                    if (response.data.user) {
                        setUser(response.data.user);
                        setToken(storedToken); // We know the token is valid
                    }
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                    localStorage.removeItem('token'); // Invalid token, remove it
                    console.error('Error fetching user:', error);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const value = {
        user,
        setUser,
        token,
        setToken,
        loading
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};