// OUTPUT
const express = require('express');
const dotenv = require('dotenv');
const ejs = require('ejs');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');

const app = express();

app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.use(routes);

module.exports = app;