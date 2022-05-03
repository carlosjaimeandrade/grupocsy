const Publication = require('../models/Publication')
const Sequelize = require('sequelize')

const enterprises = async(req, res) => {
    const publications = await Publication.findAll({
        attributes: {
            include: [
                [Sequelize.fn('date_format', Sequelize.col('createdAt'), "%d-%m-%Y"), 'd'],
                [Sequelize.fn('date_format', Sequelize.col('createdAt'), "%H-%i-%s"), 't'],
            ]
        },
        limit: 10,
        order: [
            ['id', 'DESC'],
        ],
        where: {
            category: 'empreendimentos'
        },
        raw: true

    })


    res.render('pages/enterprises', {
        publications: publications
    })
}

module.exports = {
    enterprises
}