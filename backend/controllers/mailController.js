const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendConfirmationEmail = async (req, res) => {
  const { email, nombre, items, totalAmount, date, time } = req.body;

  const itemsHtml = items.map(item => `<li>${item.nombre} - ${item.cantidad} x ${item.precioUnitario}</li>`).join('');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Confirmación de Compra",
    html: `<h1>Gracias por tu compra, ${nombre}</h1>
           <p>Resumen de tu compra:</p>
           <ul>${itemsHtml}</ul>
           <p>Total: ${totalAmount}</p>
           <p>Fecha de compra: ${date} a las ${time}</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Correo de confirmación enviado" });
  } catch (error) {
    res.status(500).json({ message: "Error al enviar el correo", details: error.message });
  }
};

module.exports = { sendConfirmationEmail };
