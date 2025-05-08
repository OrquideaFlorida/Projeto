const Sequelize = require('sequelize');
const database = require('../db'); // caminho até db.js

const Pessoa = database.define('pessoa', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    idade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    uf: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Pessoa;