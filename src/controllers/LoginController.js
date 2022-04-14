const login = (req, res) => {
    res.render('pages/login')
}

const loginCreate = (req, res) => {
    res.render('pages/LoginCreate')
}

module.exports = {
    login,
    loginCreate
}