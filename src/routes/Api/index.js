const express = require('express');
const routes = express.Router();
const ApiController = require('../../controllers/ApiController.js')
const userAuth = require('../../middleware/userAuth')
const levelAdminAuth = require('../../middleware/levelAdminAuth')

routes.get('/api/publications/:category/:offset/',userAuth.auth, levelAdminAuth.auth, ApiController.publications)

routes.get('/api/publication/:id', userAuth.auth, levelAdminAuth.auth, ApiController.publication)

module.exports = routes;