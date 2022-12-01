const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const { response } = require('express');
const jwt = require('jsonwebtoken');

exports.postCadastroDoador = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        // criptorafia de senha 
        bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
            if (errBcrypt) {
                return res.status(500).send({ error: errBcrypt })
            }

            conn.query(
                "INSERT INTO Doadores (nomeDoador, emailDoador, password, cepDoador) VALUES (?,?,?,?)",
                [req.body.nomeDoador, req.body.emailDoador, hash, req.body.cepDoador],
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
                        mensagem: "Doador Criado com Sucesso",
                        doadorCriado: {
                            idDoador: resultado.insertId,
                            nomeDoador: req.body.nomeDoador,
                            emailDoador: req.body.email,
                            cepDoador: req.body.ddd
                        }
                    }
                    return res.status(201).send(response);
                })
        });
    });
};

exports.postLoginDoador =  (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        const query = "SELECT * FROM Doadores WHERE emailDoador = ?  or nomeDoador = ?";
        conn.query(query, [req.body.emailDoador, req.body.nomeDoador], (error, resultado, field) => {

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
                    const tokenDoador = jwt.sign({
                            idDoador: resultado[0].idDoador,
                            nomeDoador: resultado[0].nomeDoador,
                            emailDoador: resultado[0].emailDoador

                    },
                     process.env.JWT_KEY,
                     {
                        expiresIn : "1h"
                     });
                    return res.status(200).send({
                        mensagem: 'Autenticado com sucesso',
                        token: tokenDoador
                    });

                }
                return res.status(401).send({ mensagem: 'Email e senha incorretos'})
            });
        });
    });
}