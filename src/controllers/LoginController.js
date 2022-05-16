const User = require("../models/User");
const bcrypt = require("bcryptjs")
const transporter = require("../help/transporter")


const login = async(req, res) => {
    res.render('pages/login', {
        message: req.flash('message'),
        type: req.flash('type')
    })
}

const loginCheck = async(req, res) => {
    const email = req.body.email
    const password = req.body.password

    user = await User.findOne({ where: { email: email } })

    if (user) {
        const check = bcrypt.compareSync(password, user.password)
        if (check) {

            if (user.status == 0) {
                req.flash('message', 'Você precisa confirmar o seu cadastro através do link que foi enviado  no seu e-mail');
                req.flash('type', 'danger');
                res.redirect('login')
                return
            }

            req.session.user = {
                id: user.id,
                name: user.name,
                email: user.email
            }
            res.cookie("user_cookie", {
                id: user.id,
                name: user.name,
                email: user.email
            },{maxAge: 360000});

            console.log(req.cookies.user_cookie)

            if (user.level == 0) {
                res.redirect('cliente')
            } else {
                res.redirect('admin')
            }

        } else {
            req.flash('message', 'Erro de autenticação, verifique os campos');
            req.flash('type', 'danger');
            res.redirect('login')
        }

    } else {
        req.flash('message', 'Esse e-mail não possui cadastro');
        req.flash('type', 'danger');
        res.redirect('login')
    }



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

        const mailOptions = {
            from: 'teste@fmsoficial.com.br',
            to: req.body.email,
            subject: 'CONFIRMAÇÃO DE CADASTRO',
            html: `Clique no link para confirmar o cadastro <br> http://localhost:3500/validate/${hash_email}`
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                req.flash('message', 'Ocorreu um erro no cadastro, verifique o e-mail ou entre em contato com o administrador do sistema');
                req.flash('type', 'danger');
                res.redirect('/login')
            } else {
                req.flash('message', 'Um link de confirmação foi enviado para o seu e-mail');
                req.flash('type', 'success');
                res.redirect('/login')
            }
        });

    }

}

const confirmRegister = async(req, res) => {
    const hash = req.params.hash
    let buff = new Buffer(hash, 'base64');
    let email = buff.toString('ascii');
    const user = await User.findAll({
        where: {
            email: email
        }
    })

    if ([...user].length > 0) {
        user_update = await User.update({
            status: 1
        }, {
            where: {
                id: user[0].id
            }
        })
        if (user_update) {
            req.flash('message', 'Seu e-mail foi verificado, agora você pode acessar o sistema');
            req.flash('type', 'success');
            res.redirect('/login')
        }
    } else {
        req.flash('message', 'Erro de validação, entre em contato com o administrador');
        req.flash('type', 'danger');
        res.redirect('/login')
    }

}

const logout = (req, res) => {
    req.session.destroy();
    res.clearCookie("user_cookie");
    res.redirect('/login')
}

module.exports = {
    login,
    loginCreate,
    loginRegister,
    confirmRegister,
    loginCheck,
    logout
}