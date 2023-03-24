const express = require('express');
const querys = require('../models/tema');
const tema = express.Router();

tema.put('/altera-tema/:id', querys.tema);
tema.post('/inicia-tema/:id', querys.criaTema);

module.exports = tema;