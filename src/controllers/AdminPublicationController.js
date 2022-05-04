const slugify = require('slugify');
const Publication = require('../models/Publication');
const fs = require('fs');
const connection = require('../database/database')
const innertext = require('innertext');

const showPagePublication = async(req, res) => {

    const publications = await Publication.findAll({
        order: [
            ['id', 'DESC'],
        ]
    })


    res.render('pages/admin/publication', {
        message: req.flash('message'),
        type: req.flash('type'),
        publications: publications
    })
}

const newPublication = async(req, res) => {
    const title = req.body.title
    const category = req.body.category
    const text = req.body.text
    const slug = slugify(title)
    const extension = req.file.filename.split('.')[1]
    const new_name = slugify(req.body.title)
    const nameImage = `${new_name}.${extension}`
    const previewText = innertext(text).substr(0, 350)

    if (text == "") {

        let next_id = await connection.query("SHOW TABLE STATUS LIKE 'publications'");
        next_id = next_id[0][0]['Auto_increment']

        fs.unlink(`public/upload/publication/${next_id}/${nameImage}`, function(err) {
            if (err) {
                req.flash('message', 'Houve um erro na criação, verifique os campos e tente novamente');
                req.flash('type', 'danger');
                res.redirect('/admin/publicacao')
            }
        })

        req.flash('message', 'Houve um erro na criação, verifique os campos e tente novamente');
        req.flash('type', 'danger');
        res.redirect('/admin/publicacao')
        return
    }

    const new_post = await Publication.create({
        title: title,
        slug: slug,
        category: category,
        text: text,
        nameImage: nameImage,
        previewText: previewText
    })

    if (new_post) {
        req.flash('message', 'Nova postagem criada com sucesso');
        req.flash('type', 'success');
        res.redirect('/admin/publicacao')
        return
    } else {
        req.flash('message', 'Houve um erro na criação, verifique os campos e tente novamente');
        req.flash('type', 'danger');
        res.redirect('/admin/publicacao')
    }

    res.send("new publication")
}


module.exports = {
    newPublication,
    showPagePublication
}