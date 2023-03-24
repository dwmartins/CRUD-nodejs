const express = require('express');
const cors = require('cors');
const chamados = require('./app/routes/chamados');
const tema = require('./app/routes/teme')
const app = express();
const port = 3000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send(`<h2>Servidor em execução!</h2>`)
});

app.use('/', chamados)
app.use('/', tema);

app.use((req, res, next) => {
    const erro = new Error('Rota não encontrada');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        erro: {
            erro: error.message
        }
    });
});
 
app.listen(port, () => {
    console.log(`Servidor em execução na porta: ${port}`);
});
