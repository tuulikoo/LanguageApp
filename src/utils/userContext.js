import {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setTokens] = useState(null);
    const [loading, setLoading] = useState(true);

    // check if token is valid and set user get token from utils/jwt.js
    const setToken = (newToken) => {
        if (newToken) {
            localStorage.setItem('token', newToken);
            axios.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        }
        setTokens(newToken);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
                try {
                    const response = await axios.get('/api/user', {
                        headers: {
                            Authorization: `Bearer ${storedToken}`,
                        },
                    });

                    if (response.data.user) {
                        setUser(response.data.user);
                    }
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
            setLoading(false);
        };

        fetchUser();
    }, []);
    return (
        <UserContext.Provider value={{user, setUser, token, setToken, isLoading: loading}}>
            {children}
        </UserContext.Provider>
    );
};