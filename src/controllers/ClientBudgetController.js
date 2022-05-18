const showBudget = (req, res)=>{
    res.render('pages/client/budget',{
        message: req.flash('message'),
        type: req.flash('type'),
    })
}


module.exports = {
    showBudget
}