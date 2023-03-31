const { excluirChamadoInexistente } = require('../middlewares/chamados/middleware');
const express = require('express');
const { todosChamados, novoChamado, executaChamado, finalizaChamado, excluiChamado, filtraChamados, quantidadeRegistros } = require('../models/chamado');
const chamado = express.Router();
require('../middlewares/chamados/middleware');

chamado.get('/todos-chamados', todosChamados);
chamado.post('/novo-chamado', novoChamado);
chamado.put('/executa-chamado', executaChamado);
chamado.put('/finaliza-chamado', finalizaChamado);
chamado.delete('/exclui-chamado/:id', excluirChamadoInexistente ,excluiChamado);
chamado.get('/filtra-chamados', filtraChamados);
chamado.get('/quantidade-chamados', quantidadeRegistros);

module.exports = chamado;