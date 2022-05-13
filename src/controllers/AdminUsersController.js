const User = require("../models/User");
const bcrypt = require("bcryptjs")
const transporter = require("../help/transporter")

const showUsers = async (req, res) => {

    const users = await User.findAll({ raw: true });

    res.render('pages/admin/users', {
        message: req.flash('message'),
        type: req.flash('type'),
        users: users
    })
}

const createUsers = async (req, res) => {

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
        res.redirect('/admin/usuarios')
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

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                req.flash('message', 'Ocorreu um erro no cadastro, verifique o e-mail ou entre em contato com o administrador do sistema');
                req.flash('type', 'danger');
                res.redirect('/admin/usuarios')
            } else {
                req.flash('message', `Um link de confirmação foi enviado para ${req.body.email}`);
                req.flash('type', 'success');
                res.redirect('/admin/usuarios')
            }
        });

    }

}

const deleteUser = async (req, res) => {

    const id = req.params.id;

    if (!id) {
        req.flash('message', 'Usuario não encontrado');
        req.flash('type', 'danger');
        res.redirect('/admin/usuarios')
        return;
    }

    const user = await User.findByPk(id);

    if (!user) {
        req.flash('message', 'Usuario não encontrado sssss.');
        req.flash('type', 'danger');
        res.redirect('/admin/usuarios')
        return;
    }

    const confirm = await User.destroy({ where: { id: id } });

    if (!confirm) {
        req.flash('message', 'Não foi possivel atualizar, entre em contato com o administrador');
        req.flash('type', 'danger');
        res.redirect('/admin/usuarios')
        return;
    }

    req.flash('message', 'Usuario deletado com sucesso');
    req.flash('type', 'success');
    res.redirect('/admin/usuarios')
}

module.exports = {
    showUsers,
    createUsers,
    deleteUser
}