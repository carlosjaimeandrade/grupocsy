// OUTPUT
const express = require('express');
const dotenv = require('dotenv');
const ejs = require('ejs');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session')
const flash = require('connect-flash');


require('dotenv').config();

//importando os Model para criação das tabelas no MYSQL caso não tenha criado
const User = require('./models/User.js')


const HomeRoutes = require('./routes/home')
const LoginRoutes = require('./routes/login')
const AboutRoutes = require('./routes/about')
const FutureProjectsRoutes = require('./routes/futureProjects')
const EnterprisesRoutes = require('./routes/enterprises')
const BlogRoutes = require('./routes/blog')
const PostViewRoutes = require('./routes/postView')
const ContactRoutes = require('./routes/contact')
const CompaniesRoutes = require('./routes/company');
const ClientRoutes = require('./routes/client');

const app = express();

app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(session({ secret: '6594637210271734-032312-aa00cfef0f5', resave: true, saveUninitialized: true }))
app.use(flash());

//rotas
app.use(HomeRoutes)
app.use(LoginRoutes)
app.use(AboutRoutes)
app.use(FutureProjectsRoutes)
app.use(EnterprisesRoutes)
app.use(BlogRoutes)
app.use(CompaniesRoutes);
app.use(PostViewRoutes)
app.use(ContactRoutes)
app.use(ClientRoutes)

module.exports = app;