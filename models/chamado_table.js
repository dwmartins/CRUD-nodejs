const Sequelize = require('sequelize');
const database = require('../config/db');

const Chamados = database.define('chamados', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{ 
        type: Sequelize.STRING,
        allowNull: true
    },
    status:{
        type: Sequelize.STRING,
        allowNull: false
    },
    autor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    responsavel:{
        type: Sequelize.STRING, 
        allowNull: true
    },
    data_execucao:{
        type: Sequelize.DATE,
        allowNull: true
    },
    data_finalizado:{
        type: Sequelize.DATE,
        allowNull: true
    },
    solucao: {
        type: Sequelize.STRING,
        allowNull: true
    }

});

module.exports = Chamados;