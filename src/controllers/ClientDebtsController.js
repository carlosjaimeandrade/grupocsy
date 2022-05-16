const Financial = require('../models/Financial')
const Checkout = require('../models/Checkout')
const moment = require('moment')
const MercadoPago = require('mercadopago');

const showDebts = async(req, res) => {
    const now = moment().format('DD/MM/YYYY')
    const { id } = req.session.user

    const debts = await Financial.findAll({
        raw: true,
        where: { userId: id },
        order: [
            ['status', 'DESC']
        ]
    })

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
        now
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

module.exports = {
    showDebts,
    checkout
}