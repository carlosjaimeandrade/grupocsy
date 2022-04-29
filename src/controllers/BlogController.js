const Publication = require('../models/Publication')

const blog = async(req, res) => {
    const publications = await Publication.findAll({
        where: {
            category: "blog"
        }
    })


    res.render('pages/blog', {
        publications: publications
    })
}

module.exports = {
    blog
}