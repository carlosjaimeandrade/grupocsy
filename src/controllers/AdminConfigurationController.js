const User = require("../models/User");
const bcrypt = require("bcryptjs")
const transporter = require("../help/transporter")

const showConfigurations = async (req, res) => {

    const { id } = req.session.user;

    const user = await User.findByPk(id, { raw: true });

    res.render('pages/admin/configurations', {
        message: req.flash('message'),
        type: req.flash('type'),
        users: user
    })
}

module.exports = {
    showConfigurations
}