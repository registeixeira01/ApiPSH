const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const { response } = require('express');
const jwt = require('jsonwebtoken');


exports.postCadastroTipoDoacao = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }


        conn.query(
            "INSERT INTO tipoDoacoes (idOng,nomeDoacao, tipoDoacao) VALUES (?,?,?)",
            [req.Ong.idOng, req.body.nomeDoacao, req.body.tipoDoacao],
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
                    mensagem: "Voce cadastrou oque voce Precisa!",
                    doadorCriado: {
                        idtipoDoacao: resultado.insertId,
                        nomeDoacao: req.body.nomeDoador,
                        tipoDoacao: req.body.tipoDoacao
                    }
                }
                return res.status(201).send(response);
            })
    });
};