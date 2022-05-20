const User = require("../models/User");
const Financial = require("../models/Financial");
const Checkout = require("../models/Checkout");
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const search = require('../help/search')

const showFinancial = async(req, res) => {

    let debts = await User.findAll({
        include: [{
            model: Financial,
            where: {id: { [Op.ne]: null } },
        }],
        raw: true,
        order: [
            ['id', 'DESC'],
        ]
    })

    const query = search.query(req.query)
    if (query) {
        try {
            debts = await User.findAll({ include: [{ model: Financial, where: query }], raw: true })
        } catch (err) {
            res.redirect('/admin/publicacao')
        }
    }

    const users = await User.findAll({
        raw: true,
        where: {
            level: {
                [Op.ne]: 1
            }
        }
    })

    res.render('pages/admin/financial', {
        message: req.flash('message'),
        type: req.flash('type'),
        users: users,
        debts: debts,
        query: req.query
    })
}

const createDebit = async(req, res) => {

    const body = {
        charge: req.body.charge,
        description: req.body.description,
        dueDate: req.body.dueDate,
        value: req.body.value.replace(/[.]/g, "").replace(/[,]/g, "."),
        userId: req.body.user
    }

    const create = await Financial.create(body)

    if (!create) {
        req.flash('message', 'Houve um erro na criação, verifique os campos e tente novamente');
        req.flash('type', 'danger');
        res.redirect('/admin/financeiro')

    }

    req.flash('message', 'Cadastrado com sucesso');
    req.flash('type', 'success');
    res.redirect('/admin/financeiro')
}

const destroy = async(req, res) => {
    const id = req.params.id
    const finacial = await Financial.findOne({ where: { id: id } })

    if(finacial.status == "approved"){
        req.flash('message', 'Esse registro já foi pago e não é possivel deletar');
        req.flash('type', 'danger');
        res.redirect('/admin/financeiro')
        return
    }


    const destroy = await Financial.destroy({ where: { id: id } })
    if (!destroy) {
        req.flash('message', 'Não foi possivel deletar, verifique com o administrador');
        req.flash('type', 'danger');
        res.redirect('/admin/financeiro')
        return
    }

    req.flash('message', 'Deletado com sucesso');
    req.flash('type', 'success');
    res.redirect('/admin/financeiro')
}

const update = async(req, res) => {
    const id = req.body.id
    const finacial = await Financial.findOne({ where: { id: id } })

    if(finacial.status == "approved"){
        req.flash('message', 'Esse registro já foi pago e não é possivel atualizar');
        req.flash('type', 'danger');
        res.redirect('/admin/financeiro')
        return
    }

    const update = await Financial.update({
        charge: req.body.charge,
        description: req.body.description,
        dueDate: req.body.dueDate,
        value: req.body.value.replace(/[.]/g, "").replace(/[,]/g, "."),
    }, {
        where: {
            id: id
        }
    })

    if (!update) {
        req.flash('message', 'Não foi possivel atualizar, verifique com o administrador');
        req.flash('type', 'danger');
        res.redirect('/admin/financeiro')
        return
    }

    req.flash('message', 'Atualizado com sucesso');
    req.flash('type', 'success');
    res.redirect('/admin/financeiro')
}



module.exports = {
    showFinancial,
    createDebit,
    destroy,
    update
}