// src/context/CartContext.js

import React, { createContext, useState } from 'react';

// Crear el contexto de carrito
export const CartContext = createContext();

const CartProvider = ({ children }) => {
    // Estado para almacenar los artículos en el carrito
    const [cartItems, setCartItems] = useState([]);

    // Función para agregar un artículo al carrito
    const addToCart = (item) => {
        setCartItems((prevItems) => {
            // Si el artículo ya está en el carrito, incrementa la cantidad
            const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                return prevItems.map((cartItem) =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            }
            // Si no está, agrega el artículo al carrito
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    // Función para remover un artículo del carrito
    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    // Función para vaciar el carrito
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
