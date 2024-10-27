import "./../styles/Profile.css"
import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';


function Profile() {
    return (
        <Container className="my-5">
            <Card className="p-4">
                <Row>
                    <Col md={4} className="text-center">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Profile"
                            className="rounded-circle"
                            style={{ width: '150px', height: '150px' }}
                        />
                    </Col>
                    <Col md={8}>
                        <h3>John Doe</h3>
                        <p>Email: johndoe@example.com</p>
                        <p>Phone: +123 456 7890</p>
                        <Button variant="primary" className="mt-3">Edit Profile</Button>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}

export default Profile;
