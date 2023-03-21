const querys = require('../models/querys');
const express = require('express');
const router = express.Router();

router.get('/todos-chamados', querys.todosChamados);

router.post('/novo-chamado', querys.novoChamado);

router.put('/executa-chamado', querys.executaChamado);

router.put('/finaliza-chamado', querys.finalizaChamado);

router.delete('/exclui-chamado/:id', querys.excluiChamado);

router.get('/filtra-chamados', querys.filtraChamados);

module.exports = router;