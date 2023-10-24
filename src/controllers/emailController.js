const nodemailer = require('nodemailer')
const config = require('../config/nodemailer');

const transporter = nodemailer.createTransport(config);

exports.sendEmail = async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    await transporter.sendMail({
      from: 'jenshygym@gmail.com',
      to,
      subject,
      text
    });

    res.status(200).json({ message: 'Correo enviado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al enviar el correo' });
  }
};


