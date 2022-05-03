const userAuth = require('../../middleware/userAuth')
const levelAdminAuth = require('../../middleware/levelAdminAuth')
const AdminController = require('../../controllers/AdminController.js')
const multer = require('multer');
const express = require('express');
const routes = express.Router();
const uploadNewPublication = require('../../middleware/uploadNewPublication')
const storage = uploadNewPublication.storage

routes.get('/admin',  AdminController.admin)

routes.get('/admin/usuarios',  AdminController.ShowAdminUsersPage)

routes.post('/admin/nova/publicacao', userAuth.auth, levelAdminAuth.auth, multer({ storage }).single("file"), AdminController.newPublication)

module.exports = routes;