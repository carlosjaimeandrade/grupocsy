const Sequelize = require('sequelize')
const connection = require('../database/database')

const User = connection.define('user', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING(15),
        allowNull: false
    },
    uf: {
        type: Sequelize.STRING(2),
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
    }

})


User.sync({ force: false })

module.exports = User;