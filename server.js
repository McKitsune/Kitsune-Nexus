// server.js - Backend para generar URLs pre-firmadas de S3

const express = require('express');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de AWS S3 con credenciales desde el archivo .env
AWS.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();
const S3_BUCKET = 'knexusproductimg';

app.use(cors());

app.get('/get-s3-url', async (req, res) => {
    const { filename, filetype } = req.query;

    const params = {
        Bucket: S3_BUCKET,
        Key: `${Date.now()}_${filename}`,
        Expires: 60, // La URL será válida por 60 segundos
        ContentType: filetype,
    };

    try {
        // Generar la URL pre-firmada para la subida del archivo
        const uploadURL = await s3.getSignedUrlPromise('putObject', params);
        res.json({ uploadURL });
    } catch (error) {
        console.error('Error generando URL pre-firmada:', error);
        res.status(500).json({ error: 'Error generando URL pre-firmada' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
