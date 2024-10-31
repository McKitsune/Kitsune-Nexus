// src/pages/Profile.jsx
import React, { useContext } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { UserContext } from "../context/UserContext"; // Asegúrate de que la ruta sea correcta

function Profile() {
    const { user } = useContext(UserContext); // Obtener datos del contexto

    // Verificar si el usuario existe
    if (!user) {
        return <p>No estás conectado. Por favor, inicia sesión.</p>; // Mensaje si no hay usuario
    }

    return (
        <Container className="my-5">
            <Card className="p-4">
                <Row>
                    <Col md={4} className="text-center">
                        <img
                            src={user.profilePicture || "https://via.placeholder.com/150"}
                            alt="Profile"
                            className="rounded-circle"
                            style={{ width: '150px', height: '150px' }}
                        />
                    </Col>
                    <Col md={8}>
                        <h3>{user.name}</h3>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phone}</p>
                        <Button variant="primary" className="mt-3">Edit Profile</Button>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}

export default Profile;
