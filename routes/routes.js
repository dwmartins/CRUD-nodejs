const querys = require('../models/querys');
const express = require('express');
const router = express.Router();

router.get('/todos-chamados', async (req, res) => {
    const result = await querys.todosChamados();
    res.json(result);
});

router.post('/novo-chamado', async (req, res) => {
    const result = await querys.novoChamado();
    res.json([{msg: 'Produto criado com sucesso!'}])
})

module.exports = router;