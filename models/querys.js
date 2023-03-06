const database = require('../config/db');
const Chamados = require('./chamado_table');
database.sync();

async function todosChamados() {
    const produtos = await Chamados.findAll();

    return produtos;
}

async function novoChamado() {
    const novoProduto = await Chamados.create({
        nome: 'Pc não liga',
        assunto: 'PC fica carregando mas não liga',
        descricao: 'PC da marca dell não liga',
        historico: 'pendente',
        responsavel: '',
        
    })
}

module.exports = {
    todosChamados,
    novoChamado
}