const express = require('express');

const routes = express.Router();

const AboutController = require('../../controllers/AboutController.js')

routes.get('/about', AboutController.about)

module.exports = routes;