import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContext } from '../context/CartContext'; // Importa el contexto del carrito

const Ecommerce = () => {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');
    const { addToCart } = useContext(CartContext); // Usa el contexto para acceder a la función addToCart

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://s6q9fdqw8l.execute-api.us-east-1.amazonaws.com/dev/products');
            const responseData = JSON.parse(response.data.body);
            setProducts(responseData.data || []);
        } catch (error) {
            setMessage('Error al cargar los productos');
            console.error("Error al obtener los productos:", error);
        }
    };

    return (
        <Container className="ecommerce-container">
            <h2>Productos Disponibles</h2>
            {message && <p className="message">{message}</p>}
            <Row>
                {products.map((product) => (
                    <Col key={product.id} xs={12} md={4} lg={3} className="mb-4">
                        <Card>
                            {product.image && (
                                <Card.Img variant="top" src={product.image} alt={product.name} />
                            )}
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text>Precio: ${product.price}</Card.Text>
                                {/* Botón de agregar al carrito */}
                                <Button variant="primary" onClick={() => addToCart(product)}>
                                    Agregar al Carrito
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Ecommerce;
