// src/pages/Ecommerce.jsx
import React, { useEffect, useState } from 'react';
import '../styles/Ecommerce.css';

function Ecommerce() {
    const [products, setProducts] = useState([]);

    // Simulación de llamada a la API para obtener productos
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://your-api-url/products'); // Cambia esto a tu URL real
                if (!response.ok) throw new Error('Error al obtener productos');
                
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="ecommerce">
            <h1 className="ecommerce-title">Productos</h1>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} className="product-image" />
                        {product.label && <span className="product-label">{product.label}</span>}
                        <h2 className="product-name">{product.name}</h2>
                        <p className="product-description">{product.description}</p>
                        {product.colors && <p className="product-colors">{product.colors} colores</p>}
                        <p className="product-price">{product.price.toFixed(2)} €</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Ecommerce;
