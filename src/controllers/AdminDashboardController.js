const Users = require('../Models/User');
const Publication = require('../Models/Publication');

module.exports = {
    showDashboard: async (req, res) => {

        const users = await Users.findAll({ limit: 3, order: [['id', 'DESC']], raw: true });
        const publications = await Publication.findAll();

        if (!users) {
            users = null;
            return;
        }

        res.render('pages/admin/home', {
            message: req.flash('message'),
            type: req.flash('type'),
            users,
            publications: { publications: publications.slice(0, 2), count: publications.length },
        })
    },
}