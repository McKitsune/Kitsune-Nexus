// Header.jsx
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { CartContext } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faChevronDown } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const { cartItems } = useContext(CartContext);
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const navigate = useNavigate();

    // Estado para controlar la visibilidad del menú desplegable
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    // Alternar visibilidad del menú desplegable al hacer clic en la flecha
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    // Cerrar el menú si se hace clic fuera de él
    useEffect(() => {
        const closeDropdownOnClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', closeDropdownOnClickOutside);
        return () => {
            document.removeEventListener('mousedown', closeDropdownOnClickOutside);
        };
    }, []);

    // Redirigir a la página del carrito
    const handleCartClick = () => {
        navigate('/cart');
    };

    return (
        <header className="header">
            <div className="logo">
                <h1>K-NEXUS</h1>
            </div>
            <nav className="navbar">
                <ul>
                    <li><Link to="/ecommerce">Catalog</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/invoice">Invoice</Link></li>
                </ul>
            </nav>
            <div className="user-section">
                <button className="icon-button heart-button">
                    <FontAwesomeIcon icon={faHeart} />
                </button>

                {/* Icono del carrito con contador */}
                <button className="icon-button cart-button" onClick={handleCartClick}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                    {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
                </button>

                {/* Avatar de Usuario, Nombre y Flecha */}
                <div className="user-profile" onClick={toggleDropdown} ref={dropdownRef}>
                    <img src="https://via.placeholder.com/32" alt="User Avatar" className="user-avatar" />
                    <div className="user-info">
                        <span className="greeting">Hola, Kitsune!</span>
                    </div>
                    <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
                </div>

                {/* Menú desplegable que solo aparece al hacer clic en la flecha */}
                {dropdownVisible && (
                    <div className="dropdown-menu">
                        <Link to="/login" className="dropdown-item">Login</Link>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
