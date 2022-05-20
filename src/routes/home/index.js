const express = require('express');

const routes = express.Router();

const HomeController = require('../../controllers/HomeController.js')

routes.get('/', HomeController.home)

routes.post('/', HomeController.info)

module.exports = routes;