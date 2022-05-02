const Publication = require('../models/Publication')
const Sequelize = require('sequelize')

const futureProjects = async(req, res) => {
    const publications = await Publication.findAll({
        attributes: {
            include: [
                [Sequelize.fn('date_format', Sequelize.col('createdAt'), "%d-%m-%Y"), 'd'],
                [Sequelize.fn('date_format', Sequelize.col('createdAt'), "%H-%i-%s"), 't'],
            ]
        },
        where: {
            category: 'projetos-futuros'
        },
        raw: true

    })

    res.render('pages/futureProjects', {
        publications: publications
    })
}

module.exports = {
    futureProjects
}