import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: name === 'imageFile' ? files[0] : value
        }));
    };

    const uploadImageToS3 = async (file) => {
        try {
            // Solicita la URL pre-firmada al backend
            const response = await axios.get('http://localhost:5000/get-s3-url', {
                params: {
                    filename: file.name,
                    filetype: file.type
                }
            });
            const uploadURL = response.data.uploadURL;

            // Sube el archivo a S3 usando la URL pre-firmada
            await axios.put(uploadURL, file, {
                headers: {
                    'Content-Type': file.type
                }
            });

            // Retorna la URL de la imagen en S3 (sin la firma)
            return uploadURL.split('?')[0];
        } catch (error) {
            console.error("Error al subir la imagen a S3:", error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const imageUrl = await uploadImageToS3(product.imageFile);
            if (!imageUrl) {
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

            await axios.post('https://s6q9fdqw8l.execute-api.us-east-1.amazonaws.com/dev/products', productData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setMessage('Producto creado exitosamente');
            setProduct({ id: '', name: '', description: '', price: '', imageFile: null });
            fetchProducts();
        } catch (error) {
            setMessage(error.response ? `Error: ${error.response.data.message}` : 'Error de red o servidor');
            console.error("Error al enviar el producto:", error);
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Crear Nuevo Producto</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className="product-form">
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
                    <input type="file" name="imageFile" onChange={handleChange} accept="image/*" required />
                </div>
                <button type="submit" className="submit-button">Crear Producto</button>
            </form>

            <h2>Lista de Productos</h2>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((prod) => (
                        <tr key={prod.id}>
                            <td>{prod.id}</td>
                            <td>{prod.name}</td>
                            <td>{prod.description}</td>
                            <td>${prod.price}</td>
                            <td>{prod.image && <img src={prod.image} alt={prod.name} width="50" />}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
