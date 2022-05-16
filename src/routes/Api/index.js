const express = require('express');
const routes = express.Router();
const ApiController = require('../../controllers/ApiController.js')
const userAuth = require('../../middleware/userAuth')
const levelAdminAuth = require('../../middleware/levelAdminAuth')

routes.get('/api/publications/:category/:offset/', userAuth.auth, levelAdminAuth.auth, ApiController.publications)

routes.get('/api/publication/:id', userAuth.auth, levelAdminAuth.auth, ApiController.publication);

routes.get('/api/user/:id', userAuth.auth, levelAdminAuth.auth, ApiController.user);

routes.get('/api/debts/:id', userAuth.auth, levelAdminAuth.auth, ApiController.debts);

routes.get('/api/checkout/:id', userAuth.auth, levelAdminAuth.auth, ApiController.checkout);

routes.get('/api/not/', ApiController.not);

module.exports = routes;