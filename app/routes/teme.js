const express = require('express');
const { tema, criaTema } = require('../models/tema');
require('../models/tema');
const teme = express.Router();

teme.put('/altera-tema/:id', tema);
teme.post('/inicia-tema/:id', criaTema);

module.exports = teme;