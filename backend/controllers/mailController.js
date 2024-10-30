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

const batchSize = 3;
const batchDelay = 10000;

const htmlFile = path.join(__dirname,'index.html');
const html = fs.readFileSync(htmlFile, "utf8");

const sendMasiveMail = async (req, res) => {
  const { recipients, subject, text } = req.body;

  if (!recipients) {
    return res.status(400).json({ message: "Recipients are required" });
  }

  if (!subject) {
    return res.status(400).json({ message: "Subject is required" });
  }

  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: Array.isArray(recipients) ? recipients : [recipients],
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendMasiveMailBatch = async (req, res) => {
  const { recipients, subject, text } = req.body;

  if (!recipients) {
    return res.status(400).json({ message: "Recipients are required" });
  }

  if (!subject) {
    return res.status(400).json({ message: "Subject is required" });
  }

  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }

  const errors = [];
  const responsesTransporter = [];

  try {
    const batches = [];

    for (let i = 0; i < recipients.length; i += batchSize) {
      batches.push(recipients.slice(i, i + batchSize));
    }

    for (const batch of batches) {
      await Promise.all(
        batch.map(async (recipient) => {
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: recipient,
            subject,
            html,
          };

          try {
            let response = await transporter.sendMail(mailOptions);
            responsesTransporter.push(response);
            console.log(`enviado el correo a ${recipient}`);
          } catch (error) {
            errors.push({ recipient, error: error.message });
            console.log(
              `error al enviar el correo a ${recipient}: ${error.message}`
            );
          }
        })
      );

      await new Promise(resolve => setTimeout(resolve, batchDelay));
    }


    if(errors.length > 0) {
        res.status(200).json({message: "Mensajes enviados con errores", errors});
    }else{
        res.status(200).json({message: "Mensajes enviados", responsesTransporter});
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendMasiveMail, sendMasiveMailBatch };
