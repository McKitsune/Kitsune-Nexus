const express = require('express');
const router = express.Router();
const MailController = require('../controllers/mailController');

// Endpoint para enviar correo de confirmación de compra
router.post('/send-confirmation', MailController.sendConfirmationEmail);

// Otros endpoints de correo
router.post('/mailMasive', MailController.sendMasiveMail);
router.post('/mailMasiveBatch', MailController.sendMasiveMailBatch);

module.exports = router;
