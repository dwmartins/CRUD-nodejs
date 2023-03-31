const database = require('../../config/db');
const Chamados = require('../../models/tables/chamado_table');
database.sync();

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
        res.status(500).json({msg: `Erro ao buscar o chamado para exclusão ${error}`})
    };
};

module.exports = {excluirChamadoInexistente};