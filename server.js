import express from 'express';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const S3_BUCKET = 'knexusproductimg';

app.use(cors());

app.get('/get-s3-url', async (req, res) => {
    const { filename, filetype } = req.query;

    const params = {
        Bucket: S3_BUCKET,
        Key: `${Date.now()}_${filename}`,
        ContentType: filetype,
    };

    try {
        const command = new PutObjectCommand(params);
        const uploadURL = await getSignedUrl(s3, command, { expiresIn: 60 });
        res.json({ uploadURL });
    } catch (error) {
        console.error('Error generando URL pre-firmada:', error);
        res.status(500).json({ error: 'Error generando URL pre-firmada' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
