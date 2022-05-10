const User = require("../models/User");
const Financial = require("../models/Financial");
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const search = require('../help/search')

const showFinancial = async(req, res) => {

    let debts = await User.findAll({ include: [{ model: Financial, where: { id: {[Op.ne]: null } } }], raw: true })

    const query = search.query(req.query)
    if (query) {
        try {
            debts = await User.findAll({ include: [{ model: Financial, where: query }], raw: true })
        } catch (err) {
            res.redirect('/admin/publicacao')
        }
    }

    const users = await User.findAll({ raw: true, where: { level: {[Op.ne]: 1 } } })

    res.render('pages/admin/financial', {
        message: req.flash('message'),
        type: req.flash('type'),
        users: users,
        debts
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



module.exports = {
    showFinancial,
    createDebit
}