const express = require('express');

const routes = express.Router();

const ApiController = require('../../controllers/ApiController.js')

routes.get('/api/publications/:category/:offset/', ApiController.publications)

module.exports = routes;