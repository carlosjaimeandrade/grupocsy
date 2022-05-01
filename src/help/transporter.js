const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: "smtp.titan.email",
    port: 465,
    secure: true,
    auth: {
        user: "teste@fmsoficial.com.br",
        pass: "teste123"
    },
    tls: { rejectUnauthorized: false }
});

module.exports = transporter