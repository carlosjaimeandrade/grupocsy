const userAuth = require('../../middleware/userAuth')

const levelAdminAuth = require('../../middleware/levelAdminAuth')

const express = require('express');

const routes = express.Router();

const AdminController = require('../../controllers/AdminController.js')

routes.get('/admin', userAuth.auth, levelAdminAuth.auth, AdminController.admin)

module.exports = routes;