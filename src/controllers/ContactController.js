const nodemailer = require('nodemailer');

const contact = (req, res) => {
    res.render('pages/contact', {
        message: req.flash('message'),
        type: req.flash('type')
    })
}

const sendEmail = (req, res) => {
    if (Object.keys(req.body).length != 4) {
        req.flash('message', 'Ocorreu um erro no envio, por favor preencha todos os campos');
        req.flash('type', 'danger');
        res.redirect('/contato')
    }

    let contato_info = "";
    for (var key in req.body) {
        contato_info += `${key} : ${req.body[key]} <br><br>`
    }

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

    const mailOptions = {
        from: 'teste@fmsoficial.com.br',
        to: 'jaime_andrek@hotmail.com',
        subject: 'NOVO CONTATO - FALE CONOSCO',
        html: contato_info
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            req.flash('message', 'Ocorreu um erro no envio, por favor entre em contato com o administrador do sistema' + error);
            req.flash('type', 'danger');
            res.redirect('/contato')
        } else {
            req.flash('message', 'Sua solicitação foi enviada com sucesso, logo entraremos em contato');
            req.flash('type', 'success');
            res.redirect('/contato')
        }
    });

}

module.exports = {
    contact,
    sendEmail
}