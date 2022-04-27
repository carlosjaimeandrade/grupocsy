const express = require('express');

const routes = express.Router();

const ClientController = require('../../controllers/ClientControllers.js')

routes.get('/cliente', ClientController.client)

module.exports = routes;