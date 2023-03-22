const express = require('express');
const cors = require('cors');
const chamados = require('./routes/chamados');
const tema = require('./routes/teme')
const app = express();
const port = 3000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send(`<h2>Servidor em execução!</h2>`)
})

app.use('/', chamados)
app.use('/', tema);
 
app.listen(port, () => {
    console.log(`Servidor em execução na porta: ${port}`);
})
