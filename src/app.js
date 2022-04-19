// OUTPUT
const express = require('express');
const dotenv = require('dotenv');
const ejs = require('ejs');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const HomeRoutes = require('./routes/home')
const LoginRoutes = require('./routes/login')
const AboutRoutes = require('./routes/about')

const app = express();

app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

//rotas
app.use(HomeRoutes)
app.use(LoginRoutes)
app.use(AboutRoutes)

module.exports = app;