const express = require('express');

const routes = express.Router();

const LoginController = require('../../controllers/LoginController.js')

routes.get('/login', LoginController.login)

routes.post('/login', LoginController.loginCheck)

routes.get('/login/cadastrar', LoginController.loginRegister)

routes.post('/login/cadastrar', LoginController.loginCreate)

routes.get('/validate/:hash', LoginController.confirmRegister)

routes.get('/logout', LoginController.logout)

module.exports = routes;