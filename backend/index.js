const express = require('express');
const app = express();
const cors = require('cors');
const RoutesCustomer = require('./routes/routesCustomer');
const RoutesEmail = require('./routes/routesEmail');
require('dotenv').config();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/customers', RoutesCustomer);
app.use('/api/email', RoutesEmail); // Rutas de email

// Configuración del puerto
const PORT = process.env.PORT || 5002;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
