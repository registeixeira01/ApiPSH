const mysql = require('../mysql').pool;
const { response } = require('express');


exports.postCadastroDoacao = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }


        conn.query(
            "INSERT INTO Doacoes (idDoador, idtipoDoacao, dtDoacao, qtdDoacao, dcDoacao) VALUES (?,?,?,?,?)",
            [req.Doador.idDoador,req.params.idtipoDoacao, req.body.dtDoacao, req.body.qtdDoacao, req.body.dcDoacao],
            (error, resultado) => {
                conn.release();
                if (error) {
                    return res.status(500).send(
                        console.log(error),
                        {
                            error: error
                        })
                }

                const response = {
                    mensagem: "Doacao solicitada com Sucesso",
                    DoacaoCriado: {
                        idDoacao: resultado.insertId,
                        dtDoacao: req.body.dtDoacao
                        
                    }
                }
                return res.status(201).send(response);
            })
    });
};