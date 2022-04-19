const express = require('express');

const routes = express.Router();

const EnterprisesController = require('../../controllers/EnterprisesController.js')

routes.get('/empreendimentos', EnterprisesController.enterprises)

module.exports = routes;