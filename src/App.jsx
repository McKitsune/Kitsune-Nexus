// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Ecommerce from './pages/Ecommerce';
import Dashboard from './pages/Dashboard';
import Invoice from './pages/Invoice';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AuthProvider from './context/AuthContext'; 
import CartProvider from './context/CartContext';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './components/Cart';
import Register from './pages/Register';
import UserProvider from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ecommerce" element={<Ecommerce />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </UserProvider>
  );
}

// Exportación por defecto
export default App; 
