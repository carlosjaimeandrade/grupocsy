// OUTPUT
const express = require('express');
const dotenv = require('dotenv');
const ejs = require('ejs');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session')
const flash = require('connect-flash');
const MercadoPago = require('mercadopago');

MercadoPago.configure({
    sandbox: true, //modo de s desenvolvimento
    access_token: 'TEST-3070807880521704-050923-ba8d0e5193b516cba5ea51dd35e461e2-839874758'
});

require('dotenv').config();

//model
const User = require('./models/User.js')
const Publication = require('./models/Publication.js')
const Financial = require('./models/Financial.js')
const Checkout = require('./models/Checkout.js')

const HomeRoutes = require('./routes/home')
const LoginRoutes = require('./routes/login')
const AboutRoutes = require('./routes/about')
const FutureProjectsRoutes = require('./routes/futureProjects')
const EnterprisesRoutes = require('./routes/enterprises')
const BlogRoutes = require('./routes/blog')
const PostViewRoutes = require('./routes/postView')
const ContactRoutes = require('./routes/contact')
const CompaniesRoutes = require('./routes/company');
const ClientRoutes = require('./routes/clientDebts');
const AdminDashboardRoutes = require('./routes/adminDashboard');
const AdminPublicationRoutes = require('./routes/adminPublication');
const AdminUsersRoutes = require('./routes/adminUsers');
const AdminFinancialRoutes = require('./routes/adminFinancial');
const ApiRoutes = require('./routes/api');
const ClientDebtsRoutes = require('./routes/clientDebts');

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
app.use(AdminDashboardRoutes)
app.use(AdminPublicationRoutes)
app.use(AdminUsersRoutes)
app.use(AdminFinancialRoutes)
app.use(ApiRoutes)
app.use(ClientDebtsRoutes)

module.exports = app;