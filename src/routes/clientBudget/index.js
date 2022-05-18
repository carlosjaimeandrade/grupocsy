const userAuth = require('../../middleware/userAuth')
const levelClientAuth = require('../../middleware/levelClientAuth')
const ClientBudgetController = require('../../controllers/ClientBudgetController.js')

const express = require('express');
const routes = express.Router();

routes.get('/cliente/orcamento', userAuth.auth, levelClientAuth.auth, ClientBudgetController.showBudget)


module.exports = routes;