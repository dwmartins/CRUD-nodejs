const database = require('../config/db');
const Chamados = require('./chamado_table');
database.sync();

async function todosChamados(req, res) {
    try {
        const produtos = await Chamados.findAll();

        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({erro: `Erro ao buscar os chamados: ${error}`});
    }
}

async function novoChamado(req, res) {
    const { titulo, descricao, autor } = req.body;

    try {
        const novoProduto = await Chamados.create({
            titulo: titulo,
            descricao: descricao,
            status: "pendente",
            autor: autor,
        });

        return res.status(201).json({msg: `O chamado (${titulo}) foi aberto com sucesso!`});

    } catch (error) {
        return res.status(500).json({erro: `Erro ao abrir o chamado! ${error}`});
    }
}

async function executaChamado(req, res) {
    const { id, responsavel } = req.body;

    try {
        const executaChamado = await Chamados.update(
            {
                status: "execucao",
                responsavel: responsavel,
                data_execucao: new Date()
            },
            {where: {id: id}}
        )

        res.status(201).json({mensagem: `Chamado atualizado com sucesso!`});

    } catch (error) {
        res.status(500).json({erro: `Erro ao executar o chamado! ${error}`});
    }
}

async function finalizaChamado(req, res) {
    const { id, solucao} = req.body;
    
    try {
        const finalizaChamado = await Chamados.update(
            {
                status: "finalizado",
                data_finalizado: new Date(),
                solucao: solucao
            },
            {where: {id: id}}
        )
        res.status(201).json({mensagem: `Chamado finalizado com sucesso!`});
    } catch (error) {
        res.status(500).json({erro: `Erro ao finalizar o chamado! ${error}`});
    }
}

async function excluiChamado(req, res) {
    const { id } = req.params;

    try {
        const buscaID = await Chamados.findAll({
            where: {
                id: id
            }
        })
        
        if(buscaID == '') {
            res.status(500).json({msg: `Chamado não encontrado!`});

        } else {
           const excluiChamado = await Chamados.destroy({
            where: {
                id: id
            },
            force: true
        });
    
        res.status(200).json({msg: `Chamado excluído com sucesso!`});
        }
    } catch (error) {
        res.status(500).json({erro: `Erro ao excluir o chamado ${error}`});
    }
}

async function filtraChamados(req, res) {
    const { status } = req.query;

    try {
        const filtraChamados = await Chamados.findAll({
            where: {
                status: status
            }
        })

        if(filtraChamados == '') {
            res.status(200).json({msg: `Nenhum chamado ${status} encontrado!`});
        } else {
            res.status(200).json(filtraChamados);
        }
    } catch (error) {
        res.status(500).json({erro: `Erro ao filtrar os chamados: ${error}`})
    }
}

module.exports = {
    todosChamados,
    novoChamado,
    executaChamado,
    finalizaChamado,
    excluiChamado,
    filtraChamados
}