const admin = (req, res) => {
    res.render('pages/admin')
}

const newPublication = (req, res) => {
    const name = req.body.name

    res.send("new publication")
}

module.exports = {
    admin,
    newPublication
}