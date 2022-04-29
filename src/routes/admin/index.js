const userAuth = require('../../middleware/userAuth')
const levelAdminAuth = require('../../middleware/levelAdminAuth')
const AdminController = require('../../controllers/AdminController.js')

const express = require('express');
const routes = express.Router();

routes.get('/admin', userAuth.auth, levelAdminAuth.auth, AdminController.admin)

routes.post('/admin/nova/publicacao', userAuth.auth, levelAdminAuth.auth, AdminController.newPublication)

module.exports = routes;