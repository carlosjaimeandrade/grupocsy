const express = require('express');

const routes = express.Router();

const ContactController = require('../../controllers/ContactController.js')

routes.get('/contato', ContactController.contact)
routes.post('/contato', ContactController.sendEmail)

module.exports = routes;