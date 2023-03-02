const express = require('express');
const app = express();
const port = 3000;

require('./config/db');
require('./models/querys');

app.get('/', (req, res) => {
    res.send('Hello user!');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
})
