const express = require('express');
const querys = require('../models/tema');
const tema = express.Router();

tema.put('/altera-tema/:id', querys.tema);

module.exports = tema;