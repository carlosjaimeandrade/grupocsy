const express = require('express');

const routes = express.Router();

const FutureProjectsController = require('../../controllers/FutureProjectsController.js')

routes.get('/projetos-futuros', FutureProjectsController.futureProjects)

module.exports = routes;