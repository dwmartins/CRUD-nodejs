const database = require('../config/db');
const Produto = require('./produto_table');
database.sync();

async function todosProdutos() {
    const produtos = await Produto.findAll();
    console.log(produtos[0]);

    return produtos;
}

async function novoProduto() {
    const novoProduto = await Produto.create({
        nome: 'Caixa de som',
        preco: 80,
        descricao: 'Caixa de som muito forte'
    })
}

module.exports = {
    todosProdutos,
    novoProduto
}