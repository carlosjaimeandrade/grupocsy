const express = require('express');

const routes = express.Router();

const PostView = require('../../controllers/PostView.js')


routes.get('/post/:date/:slug', PostView.viewPublication)

module.exports = routes;