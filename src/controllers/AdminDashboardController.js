const Sequelize = require('sequelize');
const Users = require('../Models/User');
const Publication = require('../Models/Publication');
const Financial = require('../Models/Financial');

module.exports = {
    showDashboard: async (req, res) => {

        const users = await Users.findAll({ limit: 3, order: [['id', 'DESC']], raw: true });
        const publications = await Publication.findAll();
        const financials = await Financial.findAll({ attributes: [ [Sequelize.fn('sum', Sequelize.col('value')), 'total']],where: { status: "approved" }, raw: true})
        const projetos = await Publication.findAll({ where: { category: "projetos-futuros" }});

        if (!users) {
            users = null;
            return;
        }

       console.log(financials)

        res.render('pages/admin/home', {
            message: req.flash('message'),
            type: req.flash('type'),
            users,
            publications: { data: publications.slice(0, 2), count: publications.length },
            financials,
            projetos
            
        })
    },
}