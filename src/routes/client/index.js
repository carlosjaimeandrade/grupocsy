const userAuth = require('../../middleware/userAuth')
const levelClientAuth = require('../../middleware/levelClientAuth')
const ClientController = require('../../controllers/ClientControllers.js')

const express = require('express');
const routes = express.Router();

routes.get('/cliente', userAuth.auth, levelClientAuth.auth, ClientController.client)

module.exports = routes;