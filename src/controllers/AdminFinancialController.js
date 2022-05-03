const showFinancial = (req, res) => {
    res.render('pages/admin/financial', {
        message: req.flash('message'),
        type: req.flash('type')
    })
}



module.exports = {
    showFinancial
}