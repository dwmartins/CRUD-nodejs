const querys = require('../models/chamado');
const express = require('express');
const chamado = express.Router();

chamado.get('/todos-chamados', querys.todosChamados);
chamado.post('/novo-chamado', querys.novoChamado);
chamado.put('/executa-chamado', querys.executaChamado);
chamado.put('/finaliza-chamado', querys.finalizaChamado);
chamado.delete('/exclui-chamado/:id', querys.excluiChamado);
chamado.get('/filtra-chamados', querys.filtraChamados);

module.exports = chamado;