const database = require('../config/db');
const Chamados = require('./tables/chamado_table');
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
    const { titulo, descricao, autor, setor } = req.body;

    try {
        await Chamados.create({
            titulo: titulo,
            descricao: descricao,
            status: "pendente",
            autor: autor,
            setor: setor
        });

        return res.status(201).json({msg: `O chamado (${titulo}) foi aberto com sucesso!`});

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
        await Chamados.update({
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
        await Chamados.destroy({
            where: {
                id: id
            },
            force: true
        });
    
        res.status(200).json({msg: `Chamado excluído com sucesso!`});
        
    } catch (error) {
        res.status(500).json({erro: `Erro ao excluir o chamado ${error}`});
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

        res.status(200).json({
            pendente: pendente,
            execucao: execucao,
            finalizado: finalizado
        })
    } catch (error) {
        res.status(500).json({Erro: `Erro ao buscar as quantidades de chamados: ${error}`});
    }
};

module.exports = {
    todosChamados,
    novoChamado,
    executaChamado,
    finalizaChamado,
    excluiChamado,
    filtraChamados,
    quantidadeRegistros
}