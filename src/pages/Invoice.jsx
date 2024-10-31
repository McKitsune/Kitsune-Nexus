// src/components/Invoice.jsx
import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import { Container, Table, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Invoice = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);
    const [previousPurchases, setPreviousPurchases] = useState([]);
    const [showInvoice, setShowInvoice] = useState(false);
    const [currentInvoice, setCurrentInvoice] = useState(null);

    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const formatCOP = (amount) => {
        return amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
    };

    useEffect(() => {
        // Cargar compras anteriores desde localStorage
        const storedInvoices = JSON.parse(localStorage.getItem('invoices')) || [];
        setPreviousPurchases(storedInvoices);
    }, []);

    const handlePaymentClick = () => {
        if (!user) {
            setShowModal(true);
            return;
        }

        const invoiceData = {
            items: cartItems,
            totalQuantity,
            totalAmount,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
        };

        // Guardar la factura en localStorage
        const updatedInvoices = [...previousPurchases, invoiceData];
        localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
        setPreviousPurchases(updatedInvoices);
        clearCart();
        alert("Pago realizado con éxito.");
    };

    const handleCloseModal = () => setShowModal(false);
    
    const handlePrintInvoice = (invoice) => {
        // Lógica para imprimir la factura
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`<pre>${JSON.stringify(invoice, null, 2)}</pre>`);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <Container className="my-5">
            <h2 className="mb-4">Factura</h2>

            {cartItems.length === 0 ? (
                <p className="text-muted">No hay artículos en el carrito</p>
            ) : (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{formatCOP(item.price)}</td>
                                    <td>{formatCOP(item.price * item.quantity)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Row className="mt-4">
                        <Col md={{ span: 4, offset: 8 }}>
                            <Card className="p-3">
                                <h5>Resumen de Pago</h5>
                                <p>Cantidad de artículos: <strong>{totalQuantity}</strong></p>
                                <p>Total a Pagar: <strong>{formatCOP(totalAmount)}</strong></p>
                                <Button variant="success" onClick={handlePaymentClick} className="mt-3">
                                    <FontAwesomeIcon icon={faDollarSign} /> Realizar Pago
                                </Button>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Inicia Sesión o Regístrate</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Para continuar con el pago, por favor inicia sesión o regístrate.</p>
                    <div className="d-flex justify-content-around mt-4">
                        <Button variant="primary" onClick={() => window.location.href = '/login'}>
                            Iniciar Sesión
                        </Button>
                        <Button variant="secondary" onClick={() => window.location.href = '/register'}>
                            Registrarse
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            <h3 className="mt-5">Compras Anteriores</h3>
            {previousPurchases.length === 0 ? (
                <p>No tienes compras anteriores.</p>
            ) : (
                <Table striped bordered hover className="mt-3">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Total a Pagar</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {previousPurchases.map((invoice, index) => (
                            <tr key={index}>
                                <td>{invoice.date}</td>
                                <td>{formatCOP(invoice.totalAmount)}</td>
                                <td>
                                    <Button variant="info" onClick={() => handlePrintInvoice(invoice)}>
                                        Imprimir
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default Invoice;
