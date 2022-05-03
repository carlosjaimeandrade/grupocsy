const showUsers = (req, res) => {
    res.render('pages/admin/users', {
        message: req.flash('message'),
        type: req.flash('type')
    })
}



module.exports = {
    showUsers
}