const express = require('express');

const routes = express.Router();

const BlogController = require('../../controllers/BlogController.js')

routes.get('/blog', BlogController.blog)

module.exports = routes;