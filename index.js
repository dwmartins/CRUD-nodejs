const express = require('express');
const querys = require('./models/querys');
const app = express();
const port = 3000;

app.use(express.json());

require('./config/db');

app.get('/todos-produtos', async (req, res) => {
    const result = await querys.todosProdutos();
    res.json(result)
    console.log(result)
});

app.post('/novo-produto', async (req, res) => {
    const result = await querys.novoProduto();
    res.json([{msg: 'Produto criado com sucesso!'}])
})
 
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
})
