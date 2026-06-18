const express = require('express');

const router = express.Router();

const {
    obterLivros,
    incluir,
    excluir
} = require('../modelo/livro-dao');

router.get('/', async (req, res) => {
    const livros = await obterLivros();
    res.json(livros);
});

router.post('/', async (req, res) => {

    try {

        await incluir(req.body);

        res.json({
            sucesso: true
        });

    } catch {

        res.json({
            sucesso: false
        });
    }
});

router.delete('/:codigo', async (req, res) => {

    try {

        await excluir(req.params.codigo);

        res.json({
            sucesso: true
        });

    } catch {

        res.json({
            sucesso: false
        });
    }
});

module.exports = router;