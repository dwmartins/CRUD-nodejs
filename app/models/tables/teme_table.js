const Sequelize = require('sequelize');
const database = require('../../config/db');

const Tema = database.define('tema', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tema: {
        type: Sequelize.STRING,
        allowNull: false
    }

});

module.exports = Tema;