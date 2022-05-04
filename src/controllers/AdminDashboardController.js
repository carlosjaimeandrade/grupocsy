const Users = require('../Models/User');

module.exports = {
    showDashboard: async (req, res) => {

        const users = await Users.findAll({ limit: 3, order: [['id', 'DESC']], raw: true });

        if (!users) {
            users = null;
            return;
        }
    
        res.render('pages/admin/home', {
            message: req.flash('message'),
            type: req.flash('type'),
            users,
        })
    },
}