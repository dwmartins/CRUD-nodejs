const { excluirChamadoInexistente } = require('../middlewares/chamados/middleware');
const querys = require('../models/chamado');
const express = require('express');
const chamado = express.Router();
require('../middlewares/chamados/middleware');

chamado.get('/todos-chamados', querys.todosChamados);
chamado.post('/novo-chamado', querys.novoChamado);
chamado.put('/executa-chamado', querys.executaChamado);
chamado.put('/finaliza-chamado', querys.finalizaChamado);
chamado.delete('/exclui-chamado/:id', excluirChamadoInexistente ,querys.excluiChamado);
chamado.get('/filtra-chamados', querys.filtraChamados);
chamado.get('/quantidade-chamados', querys.quantidadeRegistros);

module.exports = chamado;