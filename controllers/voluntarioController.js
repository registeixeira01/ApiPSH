const mysql = require('../mysql');
const bcrypt = require('bcrypt');
const { response } = require('express');
const jwt = require('jsonwebtoken');

exports.postCadastrarVoluntario = async (req, res, next) => {
    try {
        var query = `SELECT * FROM voluntarios WHERE emailVoluntario = ?`;
        var result = await mysql.execute(query, [req.body.emailVoluntario]);

        if (result.length > 0) {
            return res.status(409).send({ message: 'Usuario já cadastrado' })
        }

        const hash = await bcrypt.hashSync(req.body.password, 10);

        query = 'INSERT INTO voluntarios (nomeVoluntario, emailVoluntario, password, celularVoluntario, cepVoluntario) VALUES (?,?,?,?,?)';
        const resultado = await mysql.execute(query, [
            req.body.nomeVoluntario,
            req.body.emailVoluntario,
            hash,
            req.body.celularVoluntario,
            req.body.cepVoluntario
        ]);

        const response = {
            message: 'Usuário criado com sucesso',
            Detalhes: {
                idVoluntario: resultado.insertId,
                nomeVoluntario: req.body.nomeVoluntario,
                emailVoluntario: req.body.emailVoluntario,
                celularVoluntario: req.body.celularVoluntario,
                cepVoluntario: req.body.cepVoluntario
            }
        }
        return res.status(201).send(response);

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            Mensagem: "Falha ao processar sua requisição, verifique os dados e tente novamente",
            Erro: error
        });
    }
};

exports.postLoginVoluntario = async (req, res, next) => {
    try {
        const query = `SELECT * FROM Voluntarios WHERE emailVoluntario = ?`;
        var resultado = await mysql.execute(query, [req.body.emailVoluntario]);

        if (resultado.length < 1) {
            return res.status(401).send({ message: 'E-mail ou senha inválidos' })
        }

        if (await bcrypt.compareSync(req.body.password, resultado[0].password)) {
            const tokenVoluntario = jwt.sign({
                idVoluntario: resultado[0].idVoluntario,
                nomeVoluntario: resultado[0].nomeVoluntario,
                email: resultado[0].emailVoluntario
            },
                process.env.JWT_KEY,
                {
                    expiresIn: "30m"
                });
            return res.status(200).send({
                message: 'Autenticado com sucesso',
                token: tokenVoluntario
            });
        }
        return res.status(401).send({ message: 'E-mail ou senha inválidos' })
    } catch (error) {
        return res.status(500).send({ message: 'Falha na autenticação' });
    }

};

exports.postCadastrarVoluntarioEvento = async (req, res, next) => {
    try {
        const query = `INSERT INTO Eventos_Voluntarios(idEvento, idVoluntario) 
                            VALUES (?,?)`

        const resultado = await mysql.execute(query, [
            req.params.idEvento,
            req.Voluntario.idVoluntario,
        ])

        const response = {
            mensagem: "Inscrito no evento com sucesso",
        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({
            message: "Falha ao processar sua requisição",
            Erro: error
        })
    }
};

exports.getVoluntarioListarEventosInscritos = async(req, res, next) => {
    try {
        const query = `SELECT eventos.idEvento,
                              eventos.nomeEvento, 
                              DATE_FORMAT(eventos.dataEvento,'%d/%m/%Y') 'dataEvento'
                         FROM eventos_voluntarios 
                   INNER JOIN eventos 
                           ON eventos.idEvento = eventos_voluntarios.idEvento
                        WHERE idVoluntario = ?;`
        const resultado = await mysql.execute(query, [
            req.Voluntario.idVoluntario
        ])
        return res.status(200).send(resultado)
    } catch (error) {
        return res.status(500).send({
            message: "Falha ao processar sua requisição",
            Erro: error
        })
    }
};