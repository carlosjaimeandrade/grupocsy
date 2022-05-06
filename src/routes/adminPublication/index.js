const userAuth = require('../../middleware/userAuth')
const levelAdminAuth = require('../../middleware/levelAdminAuth')
const multer = require('multer');
const express = require('express');
const routes = express.Router();
const AdminPublicationController = require('../../controllers/AdminPublicationController')
const uploadPublication = require('../../middleware/uploadPublication')
const updateUploadPublication = require('../../middleware/updateUploadPublication')
let storage =  uploadPublication
const uploadNew = multer({ storage })
storage = updateUploadPublication
const uploadUpdate = multer({ storage })

routes.get('/admin/publicacao', userAuth.auth, levelAdminAuth.auth, AdminPublicationController.showPagePublication)
routes.post('/admin/nova/publicacao', userAuth.auth, levelAdminAuth.auth, uploadNew.single("file"), AdminPublicationController.newPublication)

routes.get('/admin/publicacao/delete/:id', userAuth.auth, levelAdminAuth.auth, AdminPublicationController.destroy)

routes.post('/admin/editar/publicacao', userAuth.auth, levelAdminAuth.auth, uploadUpdate.single("file"), AdminPublicationController.update)
module.exports = routes;