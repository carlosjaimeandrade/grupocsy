const Sequelize = require('sequelize')
const connection = require('../database/database')

const Publication = connection.define('publication', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    previewText: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    nameImage: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


Publication.sync({ force: false })

module.exports = Publication;