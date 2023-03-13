const database = require('../config/db');
const Chamados = require('./chamado_table');
database.sync();

async function todosChamados() {
    const produtos = await Chamados.findAll();

    return produtos;
}

async function novoChamado(titulo, descricao, autor) {
    
    const novoProduto = await Chamados.create({
        titulo: titulo,
        descricao: descricao,
        status: "pendente",
        autor: autor,
    });

    return
};

async function executaChamado(id, responsavel) {
    try {
        const executaChamado = await Chamados.update(
            {
                status: "execucao",
                responsavel: responsavel,
                data_execucao: new Date()
            },
            {where: {id: id}}
        )
        return {mensagem: "Chamado atualizado com sucesso!"}
    } catch (error) {
        return {erro: `Erro ao atualizar o status do chamado! ${error}`}
    }
}

async function finalizaChamado(id, solucao) {
    try {
        const finalizaChamado = await Chamados.update(
            {
                status: "finalizado",
                data_finalizado: new Date(),
                solucao: solucao
            },
            {where: {id: id}}
        )

        return {mensagem: "Chamado atualizado com sucesso!"}

    } catch (error) {
        return {erro: `Erro ao atualizar o status do chamado! ${error}`}
    }
}

module.exports = {
    todosChamados,
    novoChamado,
    executaChamado,
    finalizaChamado
}