const express = require('express');

const routes = express.Router();

const HomeController = require('../../controllers/HomeController.js')

routes.get('/', HomeController.home)

module.exports = routes;