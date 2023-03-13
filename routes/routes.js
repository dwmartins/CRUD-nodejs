const querys = require('../models/querys');
const express = require('express');
const router = express.Router();

router.get('/todos-chamados', async (req, res) => {
    const result = await querys.todosChamados();
    res.json(result);
});

router.post('/novo-chamado', async (req, res) => {
    const { titulo, descricao, status, autor } = req.body;
    await querys.novoChamado(titulo, descricao, status, autor);
    res.status(201).json({mensagem: `O chamado (${titulo}) foi criado com sucessso!`})
});

router.put('/atualiza-chamado', async (req, res) => {
    const { id, status, responsavel, data_execucao } = req.body;
    const resul = await querys.executaChamado(id, status, responsavel, data_execucao);
    res.status(201).json(resul);
})

module.exports = router;