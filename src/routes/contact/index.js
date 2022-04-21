const express = require('express');

const routes = express.Router();

const ContactController = require('../../controllers/ContactController.js')

routes.get('/contato', ContactController.contact)

module.exports = routes;