const multer = require('multer');
const slugify = require('slugify');
const fs = require('fs');
const connection = require('../database/database')

const storage = multer.diskStorage({
    destination: async function(req, file, cb) {

        let next_id = await connection.query("SHOW TABLE STATUS LIKE 'publications'");
        next_id = next_id[0][0]['Auto_increment']

        const dir = `public/upload/publication/${next_id}/`;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, `public/upload/publication/${next_id}/`)
    },
    filename: function(req, file, cb) {
        const extension = file.originalname.split('.')[1]
        const new_name = slugify(req.body.title)
        cb(null, `${new_name}.${extension}`);
    }

})


module.exports = { storage }