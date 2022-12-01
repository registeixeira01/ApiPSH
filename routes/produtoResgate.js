const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const loginVoluntario = require('../middleware/loginVoluntario');
// req = request, res = response, next= chamar outro metodo


// RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "SELECT * FROM ProdutoResgate;",
            (error, resultado, fields) => {
                if (error) {
                    return res.status(500).send(
                        console.log(":(, Erro ao inserir produto de resgate"),
                        {
                            error: error,
                            response: null
                        });
                } else {
                    console.log("Exibido com sucesso");


                    res.status(201).send({
                        response: resultado
                    })
                };
            }
        )
    })
});

// INSERI UM PRODUTO
router.post('/', loginVoluntario, (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO produtoResgate (nomeProduto, quantidadePontos, quantidadeProduto, validadeCupom) VALUES (?,?,?,?)',
            [req.body.nomeProduto, req.body.quantidadePontos, req.body.quantidadeProduto, req.body.validadeCupom],
            (error, resultado, field) => {
                conn.release(); //liberar a conexao

                if (error) {
                    return res.status(500).send(
                        console.log(":(, Erro ao inserir produto de resgate"),
                        {
                            error: error,
                            response: null
                        });
                } else {
                    console.log("Inserido com sucesso");


                    res.status(201).send({
                        mensagem: 'Produto inserido com sucesso',
                        idProdutoResgate: resultado.insetId
                    })
                };
            }
        )
    });

});

// RETORNA OS DADOS DE UM PRODUTOS
router.get('/:idProdutoResgate', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "SELECT * FROM ProdutoResgate WHERE idProdutoResgate = ?;",
            [req.params.idProdutoResgate],
            (error, resultado, field) => {
                conn.release(); //liberar a conexao

                if (error) {
                    return res.status(500).send(
                        console.log(":(, Erro ao exibir produto de resgate"),
                        {
                            error: error,
                            response: null
                        });
                } else {
                    console.log("Exibido com sucesso");


                    res.status(201).send({
                        mensagem: 'Produto exibido com sucesso',
                        idProdutoResgate: resultado.insetId
                    })
                };
            }
        )
    });

});

// ALTERA UM PRODUTO
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "UPDATE ProdutoResgate SET nomeProduto = ?, quantidadePontos = ?, quantidadeProduto = ? WHERE idProdutoResgate = ?",
            [req.body.nomeProduto, req.body.quantidadePontos, req.body.quantidadeProduto, req.body.idProdutoResgate],
            (error, resultado, fields) => {
                conn.release();
                if (error) {
                    return res.status(500).send(
                        console.log(":(, Erro ao alterar produto de resgate"),
                        {
                            error: error,
                            response: null
                        });
                } else {
                    console.log("Alterado com sucesso");


                    res.status(202).send({
                        response: resultado
                    })
                };
            }
        )
    })
});

// metodo DELETE
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "DELETE FROM ProdutoResgate WHERE idProdutoResgate = ?",
            [req.body.idProdutoResgate],
            (error, resultado, fields) => {
                conn.release();
                if (error) {
                    return res.status(500).send(
                        console.log(":(, Erro ao remover produto de resgate"),
                        {
                            error: error,
                            response: null
                        });
                } else {
                    console.log("Removido com sucesso");


                    res.status(202).send({
                        response: resultado
                    })
                };
            }
        )
    })
});

module.exports = router;