import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Table } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [product, setProduct] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        imageFile: null
    });
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://s6q9fdqw8l.execute-api.us-east-1.amazonaws.com/dev/products');
            const responseData = JSON.parse(response.data.body);
            setProducts(responseData.data || []);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
            setMessage('Error al cargar los productos');
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: name === 'imageFile' ? files[0] : value
        }));
    };

    const uploadImageToS3 = async (file) => {
        try {
            const response = await axios.get('http://localhost:5002/get-s3-url', {
                params: { filename: file.name, filetype: file.type }
            });
            const uploadURL = response.data.uploadURL;
            await axios.put(uploadURL, file, { headers: { 'Content-Type': file.type } });
            return uploadURL.split('?')[0];
        } catch (error) {
            console.error("Error al subir la imagen a S3:", error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const imageUrl = product.imageFile ? await uploadImageToS3(product.imageFile) : product.image;
        if (product.imageFile && !imageUrl) {
            setMessage('Error al subir la imagen');
            return;
        }
    
        const productData = {
            id: product.id,
            name: product.name,
            description: product.description,
            price: parseFloat(product.price),
            image: imageUrl
        };
    
        try {
            if (selectedProduct) {
                await axios.put(`https://s6q9fdqw8l.execute-api.us-east-1.amazonaws.com/dev/products/${product.id}`, productData, {
                    headers: { 'Content-Type': 'application/json' }
                });
                setMessage('Producto actualizado exitosamente');
            } else {
                await axios.post('https://s6q9fdqw8l.execute-api.us-east-1.amazonaws.com/dev/products', productData, {
                    headers: { 'Content-Type': 'application/json' }
                });
                setMessage('Producto creado exitosamente');
            }
            
            setProduct({ id: '', name: '', description: '', price: '', imageFile: null });
            setSelectedProduct(null);
            fetchProducts(); // Recargar productos después de crear/editar
            setShowModal(false);
        } catch (error) {
            setMessage(error.response ? `Error: ${error.response.data.message}` : 'Error de red o servidor');
            console.error("Error al enviar el producto:", error);
        }
    };
    
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null); // Resetear el producto seleccionado al cerrar el modal
        setProduct({ id: '', name: '', description: '', price: '', imageFile: null });
    };

    const handleEdit = (prod) => {
        setProduct({
            id: prod.id,
            name: prod.name,
            description: prod.description,
            price: prod.price,
            imageFile: null 
        });
        setSelectedProduct(prod.id);
        setShowModal(true);
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`https://s6q9fdqw8l.execute-api.us-east-1.amazonaws.com/dev/products/${productId}`);
            setMessage('Producto eliminado exitosamente');
            
            // Eliminar el producto del estado local para actualizar la lista
            setProducts(products.filter(prod => prod.id !== productId));
            
        } catch (error) {
            setMessage('Error al eliminar el producto');
            console.error("Error al eliminar el producto:", error);
        }
    };

    const handleSelectProduct = (productId) => {
        setSelectedProduct(productId);
    };

    return (
        <div className="dashboard-container">
            <h2>Inventario de Productos</h2>
            {message && <p className="message">{message}</p>}
            <Button variant="primary" onClick={handleShowModal}>Crear Producto</Button>

            {/* Modal para crear/editar producto */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedProduct ? 'Editar Producto' : 'Crear Nuevo Producto'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>ID:</label>
                            <input type="text" name="id" value={product.id} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input type="text" name="name" value={product.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Descripción:</label>
                            <input type="text" name="description" value={product.description} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Precio:</label>
                            <input type="number" name="price" value={product.price} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Imagen:</label>
                            <input type="file" name="imageFile" onChange={handleChange} accept="image/*" required={!selectedProduct} />
                        </div>
                        <Button type="submit" variant="success">Guardar Producto</Button>
                    </form>
                </Modal.Body>
            </Modal>

            <h2>Lista de Productos</h2>
            <Table striped bordered hover className="product-table">
                <thead>
                    <tr>
                        <th>Seleccionar</th>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((prod) => (
                        <tr key={prod.id}>
                            <td>
                                <input
                                    type="radio"
                                    name="selectedProduct"
                                    checked={selectedProduct === prod.id}
                                    onChange={() => handleSelectProduct(prod.id)}
                                />
                            </td>
                            <td>{prod.id}</td>
                            <td>{prod.name}</td>
                            <td>{prod.description}</td>
                            <td>${prod.price}</td>
                            <td>{prod.image && <img src={prod.image} alt={prod.name} width="50" />}</td>
                            <td>
                                <FaEdit
                                    style={{ cursor: 'pointer', color: 'blue', marginRight: '10px' }}
                                    onClick={() => handleEdit(prod)}
                                />
                                <FaTrashAlt
                                    style={{ cursor: 'pointer', color: 'red' }}
                                    onClick={() => handleDelete(prod.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Dashboard;
