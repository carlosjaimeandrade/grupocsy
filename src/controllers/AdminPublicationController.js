const slugify = require('slugify');
const Publication = require('../models/Publication');
const fs = require('fs');
const connection = require('../database/database')
const innertext = require('innertext');
const search = require('../help/search')

const showPagePublication = async(req, res) => {

    let publications = await Publication.findAll({
        order: [
            ['id', 'DESC'],
        ]
    })

    const query = search.query(req.query)
    if (query) {
        try {
            publications = await Publication.findAll({
                order: [
                    ['id', 'DESC'],
                ],
                where: query
            })
        } catch (err) {
            res.redirect('/admin/publicacao')
        }
    }

    res.render('pages/admin/publication', {
        message: req.flash('message'),
        type: req.flash('type'),
        publications: publications,
        query: req.query
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

const destroy = async(req, res) => {
    
    const id = req.params.id;

    const publication = await Publication.findAll({ raw: true, where: { id: id } })

    if (publication.length == 0) {
        res.redirect('/admin/publicacao')
        return
    }

    const del = await Publication.destroy({ where: { id: id } })

    if (del) {
        fs.unlink(`public/upload/publication/${publication[0].id}/${publication[0].nameImage}`, function(err) {
            if (err) {
                req.flash('message', 'Houve um erro em deletar a imagem desta postagem, entre em contato com o adm');
                req.flash('type', 'danger');
                res.redirect('/admin/publicacao')
                return
            }
        })
        req.flash('message', 'Excluido com sucesso');
        req.flash('type', 'success');
        res.redirect('/admin/publicacao')
    }else{
        req.flash('message', 'Houve um erro em deletar a imagem desta postagem, entre em contato com o adm');
        req.flash('type', 'danger');
        res.redirect('/admin/publicacao')
    }

}

const update = async(req, res) => { 
    const id = req.body.id
    const title = req.body.title
    const category = req.body.category
    const text = req.body.text
    const slug = slugify(req.body.title)
    const previewText = innertext(text).substr(0, 350)

    let update = {
        title: title,
        category: category,
        previewText: previewText,
        slug: slug
    }

    if(req.file != undefined){
        const new_name = slugify(req.body.title)
        const extension = req.file.filename.split('.')[1]
        const nameImage = `${new_name}.${extension}`
        update['nameImage'] = nameImage
    }

    const confirm = await Publication.update(update,{ where:{ id: id }})

    if(confirm){
        req.flash('message', 'Atualizado com sucesso');
        req.flash('type', 'success');
        res.redirect('/admin/publicacao')
        return
    }else{
        req.flash('message', 'Não foi possivel atualizar, entre em contato com o administrador');
        req.flash('type', 'danger');
        res.redirect('/admin/publicacao')
    }
}

module.exports = {
    newPublication,
    showPagePublication,
    destroy,
    update
}