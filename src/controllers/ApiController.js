const Publication = require('../models/Publication')
const User = require('../models/User');
const Checkout = require('../models/Checkout');
const Sequelize = require('sequelize')
const Financial = require("../models/Financial");
const MercadoPago = require('mercadopago');
const transporter = require('../help/transporter');

const publications = async(req, res) => {
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
        res.json({ error: 'not found' })
    }

}

const publication = async(req, res) => {
    const id = req.params.id

    const publication = await Publication.findByPk(id)

    if (publication) {
        res.json(publication)
    } else {
        res.json({ error: 'No publication found' })
    }
}

const user = async(req, res) => {
    const id = req.params.id;

    const user = await User.findByPk(id);

    if (user) {
        res.json(user);
    } else {
        res.json({ error: 'users not found' })
    }

}

const debts = async(req, res) => {
    const id = req.params.id;

    let debts = await User.findAll({ include: [{ model: Financial, where: { id: id } }], raw: true })

    if (debts) {
        res.json(debts);
    } else {
        res.json({ error: 'not found' })
    }

}

const checkout = async(req, res) => {
    const id = req.params.id;

    const checkout = await Checkout.findAll({
        where: {
            financialId: id
        }
    })

    res.json(checkout)

}

const not = async(req, res) => { //em produção deve ser POST
    const id = req.query.id;

    const filtro = {
        "order.id": id
    }

    const data = await MercadoPago.payment.search({
        qs: filtro
    })

    const status = data.body.results[0].status
    const external_reference = data.body.results[0].external_reference
    const transaction_amount = data.body.results[0].transaction_amount

    try {
        const checkout = await Checkout.findOne({ where: { identification: external_reference } })
        if (checkout.status == "approved") {
            res.send("ok")
            return
        }
        await Checkout.update({ status }, { where: { identification: external_reference } })
        await Financial.update({ status, value: transaction_amount }, { where: { id: checkout.financialId } })
    } catch (err) {
        res.send("erro")
    }

    res.send("ok")
}

const sendEmail = async(req, res) => {
    const { email } = req.session.user
    let text = req.params.text
    text = text.replace(/[*]/g,"<br>")
    const mailOptions = {
        from: process.env.FROM,
        to: `${process.env.TO};${email}`,
        subject: 'NOVA SIMULAÇÃO',
        html: text
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            res.json({ send : false})
        } else {
            res.json({ send : true})
        }
    });
}


module.exports = {
    publications,
    publication,
    user,
    debts,
    checkout,
    not,
    sendEmail
}