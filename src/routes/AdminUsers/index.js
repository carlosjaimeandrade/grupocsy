const AdminUsersController = require('../../controllers/AdminUsersController.js')
const userAuth = require('../../middleware/userAuth')
const levelAdminAuth = require('../../middleware/levelAdminAuth')

const express = require('express');
const routes = express.Router();

routes.get('/admin/usuarios', userAuth.auth, levelAdminAuth.auth, AdminUsersController.showUsers);
routes.post('/admin/usuarios', userAuth.auth, levelAdminAuth.auth, AdminUsersController.createUsers);
routes.post('/admin/usuarios/delete/:id', userAuth.auth, levelAdminAuth.auth, AdminUsersController.deleteUser);
routes.post('/admin/usuarios/update/:id', userAuth.auth, levelAdminAuth.auth, AdminUsersController.updateUser);

module.exports = routes;