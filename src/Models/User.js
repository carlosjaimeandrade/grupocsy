const Sequelize = require('sequelize')
const connection = require('../database/database')

const User = connection.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telephone: {
        type: Sequelize.STRING(15),
        allowNull: false
    },
    uf: {
        type: Sequelize.STRING(2),
        allowNull: false
    },
    city: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING(12),
        allowNull: false
    },
    rg: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 0
    },
    level: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 0
    }
})


User.sync({ force: true })

module.exports = User;