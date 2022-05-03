const AdminDashboardController = require('../../controllers/AdminDashboardController.js')
const userAuth = require('../../middleware/userAuth')
const levelAdminAuth = require('../../middleware/levelAdminAuth')

const express = require('express');
const routes = express.Router();

routes.get('/admin', userAuth.auth, levelAdminAuth.auth, AdminDashboardController.showDashboard)


module.exports = routes;