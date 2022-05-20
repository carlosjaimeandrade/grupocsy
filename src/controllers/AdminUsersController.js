const User = require("../models/User");
const bcrypt = require("bcryptjs")
const transporter = require("../help/transporter");
let Sequelize, { Op } = require("sequelize");

const showUsers = async (req, res) => {

    const searchAll = [];
    const { status, level, search } = req.query;

    let users = await User.findAll({ raw: true });    

    if (req.query) {
        users = await User.findAll(
            {
                where: {
                    [Op.and]: [

                        status && { status: status },
                        level && { level: level },
                        search &&
                        {
                            [Op.or]: [
                                {
                                    email: { [Op.substring]: search },
                                },
                                {
                                    name: { [Op.substring]: search },
                                },
                                {
                                    cpf: { [Op.substring]: search }
                                }
                            ]
                        },

                    ],
                }
            });
    }


    console.log(req.query);

    res.render('pages/admin/users', {
        message: req.flash('message'),
        type: req.flash('type'),
        users: users,
        query: req.query
    });
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

const updateUser = async (req, res) => {

    const id = req.params.id;
    const update = {};

    const { name, email, level, password, confirmation } = req.body;

    if (password != confirmation) {
        req.flash('message', 'As senhas não conferem');
        req.flash('type', 'danger');
        res.redirect('/admin/usuarios')
        return;
    }

    const user = await User.findByPk(id);

    if (!user) {
        req.flash('message', 'Usuario não encontrado.');
        req.flash('type', 'danger');
        res.redirect('/admin/usuarios')
        return;
    }

    if (password) {

        const isPasswordEquals = bcrypt.compare(password, user.password);

        if (!isPasswordEquals) {
            req.flash('message', 'As senhas não conferem');
            req.flash('type', 'danger');
            res.redirect('/admin/usuarios')
            return;
        }

        update.push(password);
    }

    if (name) update['name'] = name;
    if (email) update['email'] = email;
    if (level) update['level'] = level;

    const confirm = await User.update(update, { where: { id: id } });

    if (!confirm) {
        req.flash('message', 'Não foi possivel atualizar, entre em contato com o administrador');
        req.flash('type', 'danger');
        res.redirect('/admin/usuarios')
        return;
    }

    req.flash('message', 'Usuario atualizado com sucesso');
    req.flash('type', 'success');
    res.redirect('/admin/usuarios')

}

module.exports = {
    showUsers,
    createUsers,
    deleteUser,
    updateUser
}