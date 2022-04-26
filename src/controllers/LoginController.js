const User = require("../models/User");
const bcrypt = require("bcryptjs")
const nodemailer = require('nodemailer');

const login = async(req, res) => {

    res.render('pages/login', {
        message: req.flash('message'),
        type: req.flash('type')
    })
}

const loginRegister = (req, res) => {
    res.render('pages/LoginCreate', {
        message: req.flash('message'),
        type: req.flash('type')
    })
}

const loginCreate = async(req, res) => {

    let register = req.body

    const saltPass = bcrypt.genSaltSync(10, req.body.password)
    const hash_pass = bcrypt.hashSync(req.body.password, saltPass)
    register.password = hash_pass

    const duplicate = await User.findAndCountAll({
        where: {
            email: req.body.email
        }
    })

    if (parseInt(duplicate.count) > 0) {
        req.flash('message', 'Esse e-mail ja possui cadastro');
        req.flash('type', 'success');
        res.redirect('/login/cadastrar')
        return
    }

    const sucessCreate = await User.create(req.body)
    if (sucessCreate) {

        let buff = new Buffer(req.body.email);
        let hash_email = buff.toString('base64');

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
            to: req.body.email,
            subject: 'CONFIRMAÇÃO DE CADASTRO',
            html: hash_email
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                req.flash('message', 'Ocorreu um erro no envio, por favor entre em contato com o administrador do sistema');
                req.flash('type', 'danger');
                res.redirect('/contato')
            } else {
                req.flash('message', 'Um link de confirmação foi enviado para o seu e-mail');
                req.flash('type', 'success');
                res.redirect('/login')
            }
        });

    }


}



module.exports = {
    login,
    loginCreate,
    loginRegister
}