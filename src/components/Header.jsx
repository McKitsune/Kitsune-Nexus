// Header.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import { CartContext } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faChevronDown } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const { cartItems } = useContext(CartContext);
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Estado para controlar la visibilidad del menú desplegable
    const [dropdownVisible, setDropdownVisible] = useState(false);

    // Alternar la visibilidad del menú desplegable
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    // Cerrar el menú si se hace clic fuera de él
    const closeDropdown = (e) => {
        if (!e.target.closest('.user-profile')) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', closeDropdown);
        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    }, []);

    return (
        <header className="header">
            <div className="logo">
                <h1>K-NEXUS</h1>
            </div>
            <nav className="navbar">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/ecommerce">Catalog</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/invoice">Invoice</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                </ul>
            </nav>
            <div className="user-section">
                <button className="icon-button heart-button">
                    <FontAwesomeIcon icon={faHeart} />
                </button>

                <button className="icon-button cart-button">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
                </button>

                {/* Avatar de Usuario y Nombre */}
                <div className="user-profile" onClick={toggleDropdown}>
                    <img src="https://via.placeholder.com/32" alt="User Avatar" className="user-avatar" />
                    <div className="user-info">
                        <span className="greeting">Hola, Kitsune!</span>
                    </div>
                    <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
                </div>

                {/* Menú desplegable */}
                {dropdownVisible && (
                    <div className="dropdown-menu">
                        <Link to="/login" className="dropdown-item">Login</Link>
                        <Link to="/profile" className="dropdown-item">Profile</Link>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
