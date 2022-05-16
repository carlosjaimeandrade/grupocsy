const User = require('../models/User')

const auth = async(req, res, next) => {

    if(req.cookies.user_cookie){
        req.session.user = req.cookies.user_cookie
        next()
        return
    }


    if (!req.session.user) {
        res.redirect('/login')
        return
    }

    const id = req.session.user.id
    const user = await User.findByPk(id)

    if (!user) {
        res.redirect('/login')
        return
    }

    next()
}

module.exports = { auth }