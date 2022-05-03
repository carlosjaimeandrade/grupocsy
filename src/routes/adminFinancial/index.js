const AdminFinancialController = require('../../controllers/AdminFinancialController.js')
const userAuth = require('../../middleware/userAuth')
const levelAdminAuth = require('../../middleware/levelAdminAuth')

const express = require('express');
const routes = express.Router();

routes.get('/admin/financeiro', userAuth.auth, levelAdminAuth.auth, AdminFinancialController.showFinancial)


module.exports = routes;