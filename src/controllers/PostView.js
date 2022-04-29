const Publication = require("../models/Publication")
const Sequelize = require('sequelize')

const viewPublication = async(req, res) => {
    const slug = req.params.slug
    let date = req.params.date.split('-')
    date = `${date[2]}-${date[1]}-${date[0]}`
    const time = req.params.time.replace(/-/g, ":")
    const dateTime = `${date} ${time}`

    const publication = await Publication.findOne({
        where: {
            createdAt: dateTime,
            slug: slug
        }
    })

    if (!publication) {
        res.redirect('/blog')
        return
    }

    const toPublication = await Publication.findAll({
        limit: 3,
        order: [
            ['id', 'DESC'],
        ],
        attributes: {
            include: [
                [Sequelize.fn('date_format', Sequelize.col('createdAt'), "%d-%m-%Y"), 'd'],
                [Sequelize.fn('date_format', Sequelize.col('createdAt'), "%H-%i-%s"), 't'],
            ]
        },
        raw: true
    })

    res.render('pages/postView', {
        publication: publication,
        toPublication: toPublication
    })
}


module.exports = {
    viewPublication
}