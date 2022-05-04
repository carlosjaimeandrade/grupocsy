const userAuth = require('../../middleware/userAuth')
const levelAdminAuth = require('../../middleware/levelAdminAuth')
const multer = require('multer');
const express = require('express');
const routes = express.Router();
const uploadNewPublication = require('../../middleware/uploadNewPublication')
const storage = uploadNewPublication.storage

const AdminPublicationController = require('../../controllers/AdminPublicationController.js')

routes.get('/admin/publicacao', userAuth.auth, levelAdminAuth.auth, AdminPublicationController.showPagePublication)
routes.post('/admin/nova/publicacao', userAuth.auth, levelAdminAuth.auth, multer({ storage }).single("file"), AdminPublicationController.newPublication)

routes.get('/admin/publicacao/delete/:id', userAuth.auth, levelAdminAuth.auth, AdminPublicationController.destroy)
module.exports = routes;