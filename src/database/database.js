const Sequelize = require('sequelize')

//configurando o timesoze
const connection = new Sequelize('grupocsy', 'root', '', {
    host: 'localhost',
    dialectOptions: {
        useUTC: false // para considerar a hora da consulta como a hora 
            // local, logo nao soma +02:00 horas
    },
    dialect: 'mysql',
    timezone: '-03:00', // para salvar a data baseado no fuso horario
})

module.exports = connection;