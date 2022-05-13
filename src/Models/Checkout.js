const Sequelize = require('sequelize')
const connection = require('../database/database')
const Financial = require('./Financial')

const Checkout = connection.define('checkout', {
    identification: {
        type: Sequelize.STRING,
        allowNull: false
    },
    value: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    init_point: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Financial.hasMany(Checkout)

Checkout.sync({ force: false })

module.exports = Checkout;