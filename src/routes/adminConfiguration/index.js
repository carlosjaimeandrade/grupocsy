const AdminConfigurationController = require('../../controllers/AdminConfigurationController')
const userAuth = require('../../middleware/userAuth')
const levelAdminAuth = require('../../middleware/levelAdminAuth')

const express = require('express');
const routes = express.Router();

routes.get('/admin/configuracoes', userAuth.auth, levelAdminAuth.auth, AdminConfigurationController.showConfigurations);
routes.get('/admin/configuracoes', userAuth.auth, levelAdminAuth.auth, AdminConfigurationController.showConfigurations)

module.exports = routes;