// src/components/Cart.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Container, ListGroup, ListGroupItem, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    // Función para manejar la redirección a la página de factura
    const handleCheckout = () => {
        navigate('/invoice');
    };

    return (
        <Container className="my-4">
            <h2 className="mb-4">Tu Carrito</h2>
            {cartItems.length === 0 ? (
                <p className="text-muted">El carrito está vacío</p>
            ) : (
                <>
                    <ListGroup>
                        {cartItems.map((item) => (
                            <ListGroupItem key={item.id}>
                                <Row className="align-items-center">
                                    <Col xs={2}>
                                        <img src={item.image} alt={item.name} style={{ width: '100%' }} />
                                    </Col>
                                    <Col xs={4}>
                                        <h5>{item.name}</h5>
                                        <p className="text-muted">${item.price.toFixed(2)}</p>
                                    </Col>
                                    <Col xs={2} className="text-center">
                                        <span className="badge bg-primary">
                                            Cantidad: {item.quantity}
                                        </span>
                                    </Col>
                                    <Col xs={4} className="text-end">
                                        <Button 
                                            variant="outline-danger" 
                                            size="sm" 
                                            onClick={() => removeFromCart(item.id)}>
                                            Eliminar
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                    <div className="text-end mt-4">
                        <Button variant="danger" onClick={clearCart} className="me-2">
                            Vaciar Carrito
                        </Button>
                        <Button variant="success" onClick={handleCheckout}>
                            Pagar
                        </Button>
                    </div>
                </>
            )}
        </Container>
    );
};

export default Cart;
