const AdminUsersController = require('../../controllers/AdminUsersController.js')
const userAuth = require('../../middleware/userAuth')
const levelAdminAuth = require('../../middleware/levelAdminAuth')

const express = require('express');
const routes = express.Router();

routes.get('/admin/usuarios', userAuth.auth, levelAdminAuth.auth, AdminUsersController.showUsers)


module.exports = routes;