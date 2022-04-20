const viewPublication = (req, res) => {
    const slug = req.params.slug
    res.render('pages/postView')
}


module.exports = {
    viewPublication
}