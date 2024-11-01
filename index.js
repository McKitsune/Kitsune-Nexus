const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const RoutesCustomer = require('./routes/routesCustomer');
const RoutesEmail = require('./routes/routesEmail');

require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Registrar rutas bajo el prefijo /api
app.use('/api', RoutesCustomer);
app.use('/api', RoutesEmail); // Esto hace que la ruta completa sea /api/email/send-confirmation

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
