const database = require('../config/db');
const Chamados = require('./chamado_table');
database.sync();

async function todosChamados() {
    const produtos = await Chamados.findAll();

    return produtos;
}

async function novoChamado(titulo, descricao, status, autor) {
    const novoProduto = await Chamados.create({
        titulo: titulo,
        descricao: descricao,
        status: status,
        autor: autor,
    })
}

async function executaChamado(id, status, responsavel, data_execucao) {
    try {
        const executaChamado = await Chamados.update(
            {
                status: status,
                responsavel: responsavel,
                data_execucao: new Date()
            },
            {where: {id: id}}
        )
        return {mensagem: "Chamado atualizado com sucesso!"}
    } catch (error) {
        return {erro: "Erro ao atualizar o status do chamado!"}
    }
}

module.exports = {
    todosChamados,
    novoChamado,
    executaChamado
}