const database = require('../config/db');
const Chamados = require('./tables/chamado_table');
const moment = require('moment/moment');
database.sync();

async function todosChamados(req, res) {
    try {
        results = await Chamados.findAll({
            order: [
                ['data_abertura', 'ASC']
            ]
        });

        results.forEach(el => {
            el['data_abertura'] = el['data_abertura'] = moment(el['data_abertura']).format("DD/MM/YY, HH:MM");
            el['data_execucao'] = el['data_execucao'] = moment(el['data_execucao']).format("DD/MM/YY, HH:MM");
        });

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({erro: `Erro ao buscar os chamados: ${error}`});
    }
}

async function novoChamado(req, res) {
    const { titulo, descricao, autor } = req.body;
    console.log(titulo)
    try {
        await Chamados.create({
            titulo: titulo,
            descricao: descricao,
            status: "pendente",
            autor: autor,
            data_abertura: new Date().toJSON()
        });

        return res.status(201).json({sucesso: `O chamado (${titulo}) foi aberto com sucesso!`});

    } catch (error) {
        return res.status(500).json({erro: `Erro ao abrir o chamado! ${error}`});
    }
}

async function executaChamado(req, res) {
    const { id, responsavel } = req.body;

    try {
        await Chamados.update({
                status: "execucao",
                responsavel: responsavel,
                data_execucao: new Date().toJSON()

            },
            {where: {id: id}}
        )

        res.status(201).json({sucesso: `Chamado em execução!`});

    } catch (error) {
        res.status(500).json({erro: `Erro ao executar o chamado! ${error}`});
    }
}

async function finalizaChamado(req, res) {
    const { id, solucao} = req.body;
    
    try {
        await Chamados.update({
                status: "finalizado",
                data_finalizado: new Date().toJSON(),
                solucao: solucao
            },
            {where: {id: id}}
        )
        res.status(201).json({sucesso: `Chamado finalizado com sucesso!`});
    } catch (error) {
        res.status(500).json({erro: `Erro ao finalizar o chamado! ${error}`});
    }
}

async function excluiChamado(req, res) {
    const { id } = req.params;

    try {
        await Chamados.destroy({
            where: {
                id: id
            },
            force: true
        });
    
        res.status(200).json({sucesso: `Chamado excluído com sucesso!`});
        
    } catch (error) {
        res.status(500).json({erro: `Erro ao excluir o chamado! ${error}`});
    }
}

async function visualizarChamadoId(req, res) {
    const { id } = req.params;

    try {
        results = await Chamados.findAll({
            where: {
                id:id
            }
        })

        results.forEach(el => {
            el['data_abertura'] = el['data_abertura'] = moment(el['data_abertura']).format("DD/MM/YY, HH:MM");
            el['data_execucao'] = el['data_execucao'] = moment(el['data_execucao']).format("DD/MM/YY, HH:MM");
        });
        
        res.status(200).json(results)
    } catch (error) {
        res.status(500).json({erro: `Erro ao buscar o chamado! ${error}`});
    }
}

async function filtraChamados(req, res) {
    const { titulo, status, autor, responsavel, data_execucao, data_finalizado, } = req.query;

    const where = {};
    if(titulo) where.titulo = titulo;
    if(status) where.status = status;
    if(autor) where.autor = autor;
    if(responsavel) where.responsavel = responsavel;
    if(data_execucao) where.data_execucao = data_execucao;
    if(data_finalizado) where.data_finalizado = data_finalizado;

    try {
        const filtraChamados = await Chamados.findAll({
            where,
        })

        if(filtraChamados == '') {
            res.status(200).json({msg: `Nenhum chamado encontrado!`});
        } else {
            res.status(200).json(filtraChamados);
        }
    } catch (error) {
        res.status(500).json({erro: `Erro ao filtrar os chamados: ${error}`})
    }
}

async function quantidadeRegistros(req, res) {
    try {
        const pendente = await Chamados.count({
            where: {status: "pendente"}
        });
    
        const execucao = await Chamados.count({
            where: {status: "execucao"}
        });
    
        const finalizado = await Chamados.count({
            where: {status: "finalizado"}
        })

        res.status(200).json([{
            pendente: pendente,
            execucao: execucao,
            finalizado: finalizado
        }])
    } catch (error) {
        res.status(500).json({erro: `Erro ao buscar as quantidades de chamados: ${error}`});
    }
};

module.exports = {
    todosChamados,
    novoChamado,
    executaChamado,
    finalizaChamado,
    excluiChamado,
    filtraChamados,
    quantidadeRegistros,
    visualizarChamadoId
}