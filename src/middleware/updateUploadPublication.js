const multer = require('multer');
const slugify = require('slugify');
const fs = require('fs');
const Publication = require('../models/Publication');

const storage = multer.diskStorage({
    destination: async function(req, file, cb) {
        const id = req.body.id
        const publication = await Publication.findByPk(id)
        const nameImage = publication.nameImage

        fs.unlink(`public/upload/publication/${id}/${nameImage}`, function(err) {
            console.log(err)
        })

        const dir = `public/upload/publication/${id}/`;


        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, `public/upload/publication/${id}/`)

    },
    filename: function(req, file, cb) {
            const extension = file.originalname.split('.')[1]
            const new_name = slugify(req.body.title)
       
            cb(null, `${new_name}.${extension}`);
    
    }

})


module.exports = storage