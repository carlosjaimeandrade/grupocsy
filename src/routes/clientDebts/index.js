const userAuth = require('../../middleware/userAuth')
const levelClientAuth = require('../../middleware/levelClientAuth')
const ClientDebtsController = require('../../controllers/ClientDebtsController.js')

const express = require('express');
const routes = express.Router();

routes.get('/cliente/debitos', userAuth.auth, levelClientAuth.auth, ClientDebtsController.showDebts)

routes.get('/cliente/debitos/checkout/:id', userAuth.auth, levelClientAuth.auth, ClientDebtsController.checkout)

module.exports = routes;