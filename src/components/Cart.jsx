// src/components/Cart.jsx
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

    return (
        <div>
            <h2>Tu Carrito</h2>
            {cartItems.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            {item.name} - ${item.price}
                            <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={clearCart}>Vaciar Carrito</button>
        </div>
    );
};

export default Cart;
