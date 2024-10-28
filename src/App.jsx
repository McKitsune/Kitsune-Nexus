// App.jsx
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

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header /> {/* Asegúrate de que Header esté aquí, fuera de Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ecommerce" element={<Ecommerce />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
