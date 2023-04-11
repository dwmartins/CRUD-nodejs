const middleware = require('../middlewares/chamados/middleware');
const express = require('express');
const controlers = require('../models/chamado');
const chamado = express.Router();
require('../middlewares/chamados/middleware');

chamado.get('/todos-chamados', controlers.todosChamados);
chamado.post('/novo-chamado', middleware.novoChamadoExistente, controlers.novoChamado);
chamado.put('/executa-chamado', middleware.chamadoInexistente, controlers.executaChamado);
chamado.put('/finaliza-chamado', middleware.chamadoInexistente, controlers.finalizaChamado);
chamado.delete('/exclui-chamado/:id', middleware.excluirChamadoInexistente, controlers.excluiChamado);
chamado.get('/filtra-chamados', controlers.filtraChamados);
chamado.get('/quantidade-chamados', controlers.quantidadeRegistros);
chamado.get('/visualizar-chamado/:id', controlers.visualizarChamadoId);

module.exports = chamado;