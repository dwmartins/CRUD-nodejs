const querys = require('../models/querys');
const express = require('express');
const router = express.Router();

router.get('/todos-chamados', async (req, res) => {
    const result = await querys.todosChamados();
    res.json(result);
});

router.post('/novo-chamado', querys.novoChamado);

router.put('/executa-chamado', async (req, res) => {
    const { id, responsavel } = req.body;

    try {
        const resul = await querys.executaChamado(id, responsavel);
        res.status(201).json({mensagem: `O chamado atualizado com sucesso!`});
    } catch (error) {
        res.status(500).json({erro: `Erro ao executar o chamado! ${error}`});
    }
});

router.put('/finaliza-chamado', async (req, res) => {
    const { id, solucao} = req.body;
    
    try {
        const resul = await querys.finalizaChamado(id, solucao);
        res.status(201).json({mensagem: `Chamado finalizado com sucesso!`});
    } catch (error) {
        res.status(500).json({erro: `Erro ao finalizar o chamado! ${error}`});
    }
});

router.delete('/exclui-chamado/:id', async (req, res) => {
    const { id } = req.params;

    const resul = await querys.excluiChamado(id);
    res.status(200).json(resul);
   
})

module.exports = router;