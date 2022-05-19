const express = require('express');

const routes = express.Router();

const CompanyController = require('../../controllers/CompanyController');

routes.get('/empresas/grupocsy', CompanyController.ShowCompany)

routes.post('/empresas/grupocsy', CompanyController.info)

module.exports = routes;