const nodemailer = require('nodemailer')
const config = require('../config/nodemailer');

const transporter = nodemailer.createTransport(config);

const sendEmail = async (email, subject ,text) => {
  try {
    const sendEmail  =
    await transporter.sendMail({
      from: 'jenshygym@gmail.com',
      to:email,
      subject,
      text
    });
    return sendEmail;
  } catch (error) {
    throw new Error(error)
  }
};


module.exports = {sendEmail};