(async () => {
    const database = require('../config/db');
    const Produto = require('./produto_table');
    await database.sync();

    // const novoProduto = await Produto.create({
    //     nome: 'Tela 32 polegadas',
    //     preco: '1200',
    //     descricao: 'Tela de 32 polegadas full HD'
    // });

    const produtos = await Produto.findAll();
    console.log(produtos);

})();