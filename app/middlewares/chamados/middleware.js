const database = require('../../config/db');
const Chamados = require('../../models/tables/chamado_table');
const { Op } = require('sequelize');
database.sync();

async function novoChamadoExistente(req, res, next) {
    const { titulo } = req.body;

    try {
        const result = await Chamados.findAll({
            attributes: ['titulo'],
            where: {
                [Op.or]: [
                    {status: "pendente"},
                    {status: "execucao"}
                ],
                [Op.and]: [
                    {titulo: titulo}
                ]
            }
        });

        if (result != '') {
            res.status(200).json({msg: `Já existe um chamado com o mesmo titulo, pendente ou em execução!`});
        } else {
            next();
        };

    } catch (error) {
        res.status(500).json({erro: `Erro ao verificar se já existe o chamado! ${error}`})
    };
};

// Vai verificar se o chamado com id existe
async function chamadoInexistente(req, res, next) {
    const { id } = req.body

    try {
        const buscaID = await Chamados.findByPk(id);

        if(buscaID == null) {
            res.status(200).json({msg: `Chamado inexistente!`});
        } else {
            next()
        }
    } catch (error) {
        res.status(500).json({erro: `Erro ao buscar o chamado para exclusão ${error}`})
    };
};

// Verificar se existe o chamados com o id especifico
async function excluirChamadoInexistente(req, res, next) {
    const { id } = req.params;

    try {
        const buscaID = await Chamados.findAll({
            where: {
                id: id
            }
        });

        if(buscaID == '') {
            res.status(200).json({msg: `Chamado inexistente!`});
        } else {
            next();
        };
    } catch (error) {
        res.status(500).json({erro: `Erro ao buscar o chamado para exclusão ${error}`})
    };
};

module.exports = {
    excluirChamadoInexistente,
    novoChamadoExistente,
    chamadoInexistente};