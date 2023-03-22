const database = require('../config/db');
const Tema = require('../models/tables/teme_table');
database.sync()

async function criaTema() {
   
    await Tema.create({
        tema: 'light'
    });
}

async function tema(req, res) {
    const { id } = req.params;

    try {
        const tema = await Tema.findAll({
            where: {id: id}
        })

        if(tema == '') {
            criaTema();
        }

        let novoTema = tema[0].tema;

        switch (novoTema) {
            case 'dark':
                novoTema = "light"
                break
            case 'light':
                novoTema = "dark"
        }

        await Tema.update({tema: novoTema}, {
            where: {
                id: id
            }
        })

        res.status(200).json({msg: `Tema alterado para ${novoTema}`});
        

    } catch (error) {
        res.status(500).json({erro: `Erro ao alterar o tema: ${error}`});
    }
}

module.exports = {tema, criaTema}