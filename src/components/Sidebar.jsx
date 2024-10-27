// src/components/Sidebar.jsx
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <aside className="main-sidebar">
            <div className="sidebar">
                <ul className="nav nav-pills nav-sidebar flex-column">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/ecommerce" className="nav-link">E-commerce</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/invoice" className="nav-link">Invoice</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/profile" className="nav-link">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">Login</Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;
