const database = require('../config/db');
const Chamados = require('./chamado_table');
database.sync();

async function todosChamados() {
    const produtos = await Chamados.findAll();

    return produtos;
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

async function executaChamado(id, responsavel) {
  
    const executaChamado = await Chamados.update(
        {
            status: "execucao",
            responsavel: responsavel,
            data_execucao: new Date()
        },
        {where: {id: id}}
    )
    return;
}

async function finalizaChamado(id, solucao) {
    
    const finalizaChamado = await Chamados.update(
        {
            status: "finalizado",
            data_finalizado: new Date(),
            solucao: solucao
        },
        {where: {id: id}}
    )

    return;
}

async function excluiChamado(id) {

    const buscaID = await Chamados.findAll({
        where: {
            id: id
        }
    })
    
    if(buscaID == '') {
        return {msg: `Chamado não encontrado!`};
    } else {
       const excluiChamado = await Chamados.destroy({
        where: {
            id: id
        },
        force: true
    });

    return {msg: `Chamado excluído com sucesso!`};
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