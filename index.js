const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/', routes, (req, res) => {
    res.status(200);
    res.send(`<h2>Servidor em execução!</h2>`);
})
 
app.listen(port, () => {
    console.log(`Servidor em execução na porta: ${port}`);
})
