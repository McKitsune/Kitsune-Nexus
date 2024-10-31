// src/context/UserContext.jsx
import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Recuperar datos del usuario desde localStorage al montar el componente
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            const currentTime = new Date().getTime();
            // Verificar si la sesión ha expirado
            if (currentTime < userData.expiry) {
                setUser(userData); // Cargar usuario si la sesión es válida
            } else {
                localStorage.removeItem('user'); // Limpiar si ha expirado
            }
        }
    }, []);

    const registerUser = (newUser) => {
        const expiry = new Date().getTime() + 3600000; // 1 hora en milisegundos
        const userWithExpiry = { ...newUser, expiry }; // Añadir tiempo de expiración
        setUser(userWithExpiry);
        localStorage.setItem('user', JSON.stringify(userWithExpiry));
    };

    const loginUser = (userData) => {
        const expiry = new Date().getTime() + 3600000; // 1 hora en milisegundos
        const userWithExpiry = { ...userData, expiry }; // Añadir tiempo de expiración
        setUser(userWithExpiry);
        localStorage.setItem('user', JSON.stringify(userWithExpiry));
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, registerUser, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
