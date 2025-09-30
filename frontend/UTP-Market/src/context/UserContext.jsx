import React, { createContext, useState, useCallback, useMemo } from 'react';

const UserContext = createContext(null);

const getStoredUser = () => {
    try {
        return JSON.parse(localStorage.getItem('user'));
    } catch {
        return null;
    }
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(getStoredUser);
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [loading] = useState(false);

    const login = useCallback((userData, authToken) => {
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setToken(authToken);
        setUser(userData);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    }, []);

    const value = useMemo(() => ({
        user,
        token,
        login,
        logout,
        loading
    }), [user, token, login, logout, loading]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
