const Publication = require('../models/Publication')
const User = require('../models/User');
const Sequelize = require('sequelize')

const publications = async (req, res) => {
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
    res.send(publications);
}

const publication = async (req, res) => {
    const id = req.params.id

    const publication = await Publication.findByPk(id)

    if (publication) {
        res.json(publication)
    } else {
        res.json({ error: 'No publication found' })
    }
}

const user = async (req, res) => {
    const id = req.params.id;

    const user = await User.findByPk(id);

    if (user) {
        res.json(user);
    } else {
        res.json({ error: 'users not found' })
    }

}

module.exports = {
    publications,
    publication,
    user
}