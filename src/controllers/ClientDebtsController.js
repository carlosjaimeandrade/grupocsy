const Financial = require('../models/Financial')
const Checkout = require('../models/Checkout')
const moment = require('moment')
const MercadoPago = require('mercadopago');
const search = require('../help/search')
const transporter = require("../help/transporter");


const showDebts = async(req, res) => {
    const now = moment().format('DD/MM/YYYY')
    const { id } = req.session.user

    let debts = await Financial.findAll({
        raw: true,
        where: { userId: id },
        order: [
            ['status', 'DESC']
        ]
    })


    const query = search.query(req.query)
    if (query) {
        try {
            debts = await Financial.findAll({
                raw: true,
                where: query,
                order: [
                    ['status', 'DESC']
                ]
            })
        } catch (err) {
            res.redirect('/admin/publicacao')
        }
    }

    debts.forEach(debt => {
        let dueDate = moment(debt.dueDate).format('DD/MM/YYYY')
        let diff = moment(now, "DD/MM/YYYY").diff(moment(dueDate, "DD/MM/YYYY"));
        let days = moment.duration(diff).asDays();

        if (days > 0) {
            let juros = (((0.02 * debt.value) / 100) * days).toFixed(2)
            let multa = ((2.00 * debt.value) / 100).toFixed(2)
            debt['juros'] = parseFloat(juros)
            debt['multa'] = parseFloat(multa)
            debt['valueCheckout'] = parseFloat(debt.value) + parseFloat(juros) + parseFloat(multa)
        } else {
            debt['juros'] = 0
            debt['multa'] = 0
            debt['valueCheckout'] = debt.value
        }
    })

    res.render('pages/client/debits', {
        message: req.flash('message'),
        type: req.flash('type'),
        debts: debts,
        now,
        query: req.query
    })
}

const checkout = async(req, res) => {
    const id = req.params.id
    const financial = await Financial.findByPk(id)

    if (financial.status == "approved") {
        req.flash('message', 'Esse debito já foi pago');
        req.flash('type', 'success');
        res.redirect('/cliente/debitos')
        return
    }

    const now = moment().format('DD/MM/YYYY')
    const dueDate = moment(financial.dueDate).format('DD/MM/YYYY')
    const diff = moment(now, "DD/MM/YYYY").diff(moment(dueDate, "DD/MM/YYYY"));
    const days = moment.duration(diff).asDays();

    let value = financial.value

    if (days > 0) {
        let juros = (((0.02 * financial.value) / 100) * days).toFixed(2)
        let multa = ((2.00 * financial.value) / 100).toFixed(2)
        value = parseFloat(financial.value) + parseFloat(juros) + parseFloat(multa)
    }

    const identification = "" + Date.now()

    const dados = {
        items: [
            item = {
                id: identification,
                title: `${financial.charge}`,
                quantity: 1,
                currency_id: "BRL",
                unit_price: parseFloat(value)
            }
        ],
        external_reference: identification
    }

    try {

        const pagamento = await MercadoPago.preferences.create(dados);

        await Checkout.create({
            identification,
            value,
            status: "pendente",
            financialId: id,
            init_point: pagamento.body.init_point
        })

        return res.redirect(pagamento.body.init_point);

    } catch (err) {
        return res.send("Erro no pagamento");
    }

}

const solicitation = async(req, res) => {
    let contato_info = "";
    let body = req.body
    const { email } = req.session.user

    console.log( email)
    body['Usuario'] = email
    for (var key in body) {
        contato_info += `${key} : ${body[key]} <br><br>`
    }

    const mailOptions = {
        from: 'teste@fmsoficial.com.br',
        to: 'jaime_andrek@hotmail.com',
        subject: 'NOVA SOLICITAÇÃO DE DÉBITO',
        html: contato_info
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            req.flash('message', 'Ocorreu um erro no envio, por favor entre em contato com o administrador do sistema');
            req.flash('type', 'danger');
            res.redirect('/cliente/debitos')
        } else {
            req.flash('message', 'Sua solicitação foi enviada com sucesso, logo entraremos em contato');
            req.flash('type', 'success');
            res.redirect('/cliente/debitos')
        }
    });
}


module.exports = {
    showDebts,
    checkout,
    solicitation
}