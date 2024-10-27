import "./../styles/Login.css"
import React from 'react';
import { Button, Form, Container, Card } from 'react-bootstrap';

function Login() {
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: '20rem' }} className="p-4">
                <h3 className="text-center mb-4">Login</h3>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mt-4">
                        Login
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}

export default Login;

