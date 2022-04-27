const express = require('express');

const routes = express.Router();

const LoginController = require('../../controllers/LoginController.js')

routes.get('/login', LoginController.login)

routes.get('/login/cadastrar', LoginController.loginRegister)

routes.post('/login/cadastrar', LoginController.loginCreate)

routes.get('/validate/:hash', LoginController.confirmRegister)

module.exports = routes;