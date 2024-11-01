import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
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

    const handlePaymentClick = async () => {
        if (!user) {
            setShowModal(true);
            return;
        }
    
        const invoiceData = {
            email: user.email,
            nombre: user.name,
            items: cartItems.map(item => ({
                nombre: item.name,
                cantidad: item.quantity,
                precioUnitario: item.price,
                subtotal: item.price * item.quantity
            })),
            totalQuantity,
            totalAmount,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        };
    
        try {
            // Log para revisar los datos que se envían al backend
            console.log("Enviando factura con los siguientes datos:", invoiceData);
    
            // Enviar la factura al backend para enviar el correo de confirmación
            const response = await axios.post('/api/email/send-confirmation', invoiceData);
    
            // Log para revisar la respuesta del backend
            console.log("Respuesta del servidor:", response);
    
            // Guardar la factura en localStorage
            const updatedInvoices = [...previousPurchases, invoiceData];
            localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
            setPreviousPurchases(updatedInvoices);
    
            clearCart();
            alert("Pago realizado con éxito y correo de confirmación enviado.");
        } catch (error) {
            // Log detallado del error en caso de fallo
            console.error("Error al enviar la factura:", error);
    
            // Desglose del error para identificar el problema exacto
            if (error.response) {
                console.log("Error status:", error.response.status); // Código de estado HTTP
                console.log("Error data:", error.response.data); // Respuesta del servidor
                console.log("Error headers:", error.response.headers); // Headers de la respuesta
            } else if (error.request) {
                console.log("No hubo respuesta del servidor. Request:", error.request);
            } else {
                console.log("Error al configurar la solicitud:", error.message);
            }
    
            alert("Hubo un error al enviar el correo de confirmación.");
        }
    };
    
    const handleCloseModal = () => setShowModal(false);
    
    const handlePrintInvoice = (invoice) => {
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
