// src/pages/Login.jsx
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext'; // Asegúrate de que el contexto esté configurado correctamente
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const { loginUser } = useContext(UserContext); // Cambia AuthContext a UserContext
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault(); // Prevenir el envío del formulario

        // Simulación de la autenticación (puedes reemplazarlo con la lógica real de autenticación)
        const userData = {
            name: 'John Doe', // Reemplaza esto con los datos reales del usuario
            email: usernameOrEmail, // Usar el email ingresado
            phone: '+123 456 7890', // Reemplaza con el número real
            profilePicture: 'https://via.placeholder.com/150',
        };

        // Llama a loginUser del UserContext
        loginUser(userData);
        navigate('/invoice'); // Redirige a la página de factura después de iniciar sesión
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="mb-4 text-center">Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="usernameOrEmail" className="form-label">Usuario o Correo Electrónico</label>
                    <input
                        type="text"
                        id="usernameOrEmail"
                        className="form-control"
                        placeholder="Ingresa tu usuario o correo"
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="btn btn-primary w-100" type="submit">Ingresar</button>
            </form>
            <div className="text-center mt-3">
                <p>¿No tienes una cuenta? <Link to="/register">Registrarse</Link></p>
            </div>
        </div>
    );
};

export default Login;
