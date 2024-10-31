import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    const [name, setName] = useState(''); // Cambiado de `username` a `name`
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validación de contraseñas
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        setError('');

        // URL de la API Gateway
        const API_URL = 'https://s6q9fdqw8l.execute-api.us-east-1.amazonaws.com/dev/users';

        // Generar un `userId` simple (puedes cambiar esto en producción)
        const userId = Date.now().toString();

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId, // Agregar `userId`
                    email,
                    name,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error('Error en el registro. Inténtalo nuevamente.');
            }

            const data = await response.json();
            setSuccess('Registro exitoso. ¡Bienvenido!');
            setName(''); // Restablecer `name`
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card style={{ width: '100%', maxWidth: '500px' }} className="p-4 shadow">
                <Card.Body>
                    <h2 className="text-center mb-4">Crear Cuenta</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleRegister}>
                        <Form.Group controlId="name" className="mb-3">
                            <Form.Label>Nombre de usuario</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingresa tu nombre de usuario"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ingresa tu correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Crea una contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="confirmPassword" className="mb-3">
                            <Form.Label>Confirmar contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirma tu contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="captcha" className="mb-3">
                            <Form.Check type="checkbox" label="No soy un robot" required />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Crear cuenta
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer className="text-center">
                    <small className="text-muted">¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a></small>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default Register;
