const userAuth = require('../../middleware/userAuth')
const levelClientAuth = require('../../middleware/levelClientAuth')

const express = require('express');

const routes = express.Router();

const ClientController = require('../../controllers/ClientControllers.js')

routes.get('/cliente', userAuth.auth, levelClientAuth.auth, ClientController.client)

module.exports = routes;