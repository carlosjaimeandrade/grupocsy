const Sequelize = require('sequelize')
const connection = require('../database/database')
const User = require('./User')

const Financial = connection.define('financial', {
    charge: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dueDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    value: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pendente'
    }

})

User.hasMany(Financial)

Financial.sync({ force: false })

module.exports = Financial;