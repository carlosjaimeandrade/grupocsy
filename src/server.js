const app = require('./app');

app.listen(process.env.PORT || 8080, () => {
    console.log("RODANDO PORT: " + process.env.PORT);
    console.log("BASE URL: " + process.env.BASE_URL);
})
