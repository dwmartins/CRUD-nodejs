const querys = require('../models/querys');
const express = require('express');
const { query } = require('express');
const router = express.Router();

router.get('/todos-chamados', async (req, res) => {
    const result = await querys.todosChamados();
    res.json(result);
});

router.post('/novo-chamado', async (req, res) => {
    const { titulo, descricao, autor } = req.body;
    const result =  await querys.novoChamado(titulo, descricao, autor);
    res.json(result);
});

router.put('/executa-chamado', async (req, res) => {
    const { id, status, responsavel } = req.body;
    const resul = await querys.executaChamado(id, responsavel);
    res.status(201).json(resul);
})

router.put('/finaliza-chamado', async (req, res) => {
    const { id, solucao} = req.body;
    const resul = await querys.finalizaChamado(id, solucao);
    res.status(201).json(resul);
})

module.exports = router;