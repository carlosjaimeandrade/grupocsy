const showDashboard = (req, res) => {
    res.render('pages/admin/home', {
        message: req.flash('message'),
        type: req.flash('type')
    })
}



module.exports = {
    showDashboard
}