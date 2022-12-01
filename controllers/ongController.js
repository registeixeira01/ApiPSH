const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const { response } = require('express');
const jwt = require('jsonwebtoken');

exports.postCadastrarOngs = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        // criptorafia de senha 
        bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
            if (errBcrypt) {
                return res.status(500).send({ error: errBcrypt })
            }

            conn.query(
                "INSERT INTO Ongs (nomeOng, emailOng, password,  razaoSocial, cnpjOng, cepOng, enderecoOng, numeroOng, bairroOng, cidadeOng, ufOng) VALUES (?,?,?,?,?,?,?,?,?,?,?)", //longitude e latitude ainda n foram incrementadas
                [req.body.nomeOng, req.body.emailOng, hash, req.body.razaoSocial, req.body.cnpjOng, req.body.cepOng, req.body.enderecoOng, req.body.numeroOng, req.body.bairroOng, req.body.cidadeOng, req.body.ufOng],
                (error, resultado) => {
                    conn.release();
                    if (error) {
                        return res.status(500).send(
                            {
                                error: error
                            }
                        )
                    }

                    const response = {
                        mensagem: "Ong  criada com Sucesso",
                        doadorCriado: {
                            idOng: resultado.insertId,
                            nomeOng: req.body.nomeDoador,
                            emailOng: req.body.emailOng,
                            CNPJ: req.body.cnpjOng,


                        }
                    }
                    return res.status(201).send(response);
                })
        });
    });
};

exports.postLoginOngs = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            "SELECT * FROM Ongs WHERE emailOng = ? or nomeOng = ?",
            [req.body.emailOng, req.body.nomeOng],
            (error, resultado) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error
                    })
                }
                if (resultado.length < 1) {
                    return res.status(401).send({ mensagem: "E-mail ou senha Invalidos" })
                }
                bcrypt.compare(req.body.password, resultado[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).send({ mensagem: "E-mail ou senha não encontrado" })
                    }
                    if (result) {
                        var tokenOng = jwt.sign({
                            idOng: resultado[0].idOng,
                            nomeOng: resultado[0].nomeOng,
                            emailOng: resultado[0].emailOng
                        },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "1h"
                            });
                        return res.status(200).send({
                            mensagem: 'Autenticado com sucesso',
                            token: tokenOng
                        });

                    }
                    return res.status(401).send({ mensagem: 'Email e senha incorretos' })
                });
            });
    });
};