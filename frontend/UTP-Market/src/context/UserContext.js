
import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

// Helper function to get user from localStorage
const getStoredUser = () => {
    try {
        return JSON.parse(localStorage.getItem('user'));
    } catch (error) {
        return null;
    }
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(getStoredUser);
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState(false); // No longer loading on initial mount

    const login = (userData, authToken) => {
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setToken(authToken);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
