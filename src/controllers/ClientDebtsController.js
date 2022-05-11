const showDebts = (req, res) => {
    res.render('pages/client/debits',{
        message: req.flash('message'),
        type: req.flash('type'),
    })
}

module.exports = {
    showDebts
}