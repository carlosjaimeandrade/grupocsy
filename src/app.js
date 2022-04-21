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
const FutureProjectsRoutes = require('./routes/futureProjects')
const EnterprisesRoutes = require('./routes/enterprises')
const BlogRoutes = require('./routes/blog')
const PostViewRoutes = require('./routes/postView')
const ContactRoutes = require('./routes/contact')

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
app.use(FutureProjectsRoutes)
app.use(EnterprisesRoutes)
app.use(BlogRoutes)
app.use(PostViewRoutes)
app.use(ContactRoutes)

module.exports = app;