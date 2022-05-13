const Publication = require('../models/Publication')
const User = require('../models/User');
const Sequelize = require('sequelize')
const bcrypt = require("bcryptjs");

const publications = async (req, res) => {
    const offset = req.params.offset
    const category = req.params.category

    const publications = await Publication.findAll({
        attributes: {
            include: [
                [Sequelize.fn('date_format', Sequelize.col('createdAt'), "%d-%m-%Y"), 'd'],
                [Sequelize.fn('date_format', Sequelize.col('createdAt'), "%H-%i-%s"), 't'],
            ]
        },
        limit: 10,
        offset: parseInt(offset),
        order: [
            ['id', 'DESC'],
        ],
        where: {
            category: category
        },
        raw: true

    })
    if (publications) {
        res.json(publications);
    } else {
        res.json({ error: 'users not found' })
    }

}

const publication = async (req, res) => {
    const id = req.params.id

    const publication = await Publication.findByPk(id)

    if (publication) {
        res.json(publication)
    } else {
        res.json({ error: 'No publication found' })
    }
}

const user = async (req, res) => {
    const id = req.params.id;

    const user = await User.findByPk(id);

    if (user) {
        res.json(user);
    } else {
        res.json({ error: 'users not found' })
    }

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
    publications,
    publication,
    user,
    updateUser,    
}