const User = require('../models/User')

const auth = async(req, res, next) => {

    const id = req.session.user.id
    const user = await User.findByPk(id)

    if (user.level == 0) {
        next()
    } else {
        res.redirect('/login')
    }


}

module.exports = { auth }