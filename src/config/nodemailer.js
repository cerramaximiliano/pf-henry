const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const transport = nodemailer.createTransport(
nodemailerSendgrid({
     apiKey: process.env.SENDGRID_KEY
  })
);

module.exports = transport;