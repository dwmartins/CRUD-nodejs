const  {Sequelize} = require('sequelize');

const sequelize = new Sequelize('crud_nodejs', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados com sucesso!');
} catch (error) {
    console.erro('Erro: Erro ao conectar com o banco de dados: ', error);
};

module.exports = sequelize;