const express = require('express');

const routes = express.Router();

const CompanyController = require('../../controllers/CompanyController');

routes.get('/empresas/grupocsy', CompanyController.ShowCompany)

module.exports = routes;