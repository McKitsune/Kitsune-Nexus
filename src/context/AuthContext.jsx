// src/context/AuthContext.jsx
import React, { createContext, useState } from 'react';

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Componente proveedor de autenticación
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Función para iniciar sesión (ejemplo básico)
    const loginUser = (userData) => {
        setUser(userData);
    };

    // Función para cerrar sesión
    const logoutUser = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
