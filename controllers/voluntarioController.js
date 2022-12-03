const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const { response } = require('express');
const jwt = require('jsonwebtoken');

exports.postCadastrarVoluntario = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        // criptorafia de senha 
        bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
            if (errBcrypt) {
                return res.status(500).send({ error: errBcrypt })
            }

            conn.query(
                "INSERT INTO Voluntarios (nomeVoluntario, emailVoluntario, password, celularVoluntario, cepVoluntario) VALUES (?,?,?,?,?)",
                [req.body.nomeVoluntario, req.body.emailVoluntario, hash, req.body.celularVoluntario, req.body.cepVoluntario],
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
                        mensagem: "Voluntario Criado com Sucesso",
                        voluntarioCriado: {
                            idVoluntario: resultado.insertId,
                            nomeVoluntario: req.body.nomeVoluntario,
                            emailVoluntario: req.body.emailVoluntario,
                            celularVoluntario: req.body.celularVoluntario,
                            cepVoluntario: req.body.cepVoluntario

                        }
                    }
                    return res.status(201).send(response);
                })
        });
    });
};


exports.postLoginVoluntario = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        const query = "SELECT * FROM Voluntarios WHERE emailVoluntario = ?";
        conn.query(query, [req.body.emailVoluntario], (error, resultado, field) => {

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
                    const tokenVoluntario = jwt.sign({
                        idVoluntario: resultado[0].idVoluntario,
                        nomeVoluntario: resultado[0].nomeVoluntario,
                        email: resultado[0].email

                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        });
                    return res.status(200).send({
                        mensagem: 'Autenticado com sucesso',
                        token: tokenVoluntario
                    });

                }
                return res.status(401).send({ mensagem: 'Email e senha incorretos' })
            });
        });
    });
};

exports.postCadastrarVoluntarioEvento = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        // // criptorafia de senha 
        // bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
        //     if (errBcrypt) {
        //         return res.status(500).send({ error: errBcrypt })
        //     }
            conn.query(
                "INSERT INTO Eventos_Voluntarios(idEvento, idVoluntario) VALUES (?,?)",
                [
                    req.params.idEvento, 
                    req.Voluntario.idVoluntario,  
                ],
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
                        mensagem: "Evento Criado com Sucesso",
                        eventoCriado: {
                            Eventos_idEvento: resultado.Eventos_idEvento,
                            Voluntario_idVoluntario: resultado.Voluntario_idVoluntario,
                        }
                        
                    }
                    return res.status(201).send(response);
                })
        });
};