const Sequelize = require('sequelize');
const database = require('../config/db');

const Chamados = database.define('chamados', {
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
    descricao:{ 
        type: Sequelize.STRING,
        allowNull: false
    },
    historico:{
        type: Sequelize.STRING,
        allowNull: false
    },
    responsavel: {
        type: Sequelize.STRING,
    },
});

module.exports = Chamados;