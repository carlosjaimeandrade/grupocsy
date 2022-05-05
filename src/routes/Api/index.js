const express = require('express');

const routes = express.Router();

const ApiController = require('../../controllers/ApiController.js')

routes.get('/api/publications/:category/:offset/', ApiController.publications)

routes.get('/api/publication/:id', ApiController.publication)

module.exports = routes;