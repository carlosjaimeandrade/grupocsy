const express = require('express');

const routes = express.Router();

const LoginController = require('../../controllers/LoginController.js')

routes.get('/login', LoginController.login)

routes.get('/login/create', LoginController.loginCreate)

module.exports = routes;