const mysql = require('../mysql');
const bcrypt = require('bcrypt');
const { response } = require('express');
const jwt = require('jsonwebtoken');

exports.get = (req, res, next) => {

}

exports.postCadastrarOngs = async (req, res, next) => {
    try {
        var query = `SELECT * FROM ongs WHERE emailOng = ?`;
        var result = await mysql.execute(query, [req.body.emailOng]);

        if (result.length > 0) {
            return res.status(409).send({ message: 'Usuário já cadastrado' })
        }

        const hash = await bcrypt.hashSync(req.body.password, 10);

        query = `INSERT INTO Ongs 
                             (nomeOng, 
                             emailOng, 
                             password, 
                             cnpjOng, 
                             cepOng, 
                             enderecoOng, 
                             numeroOng, 
                             bairroOng, 
                             cidadeOng, 
                             ufOng) 
                      VALUES (?,?,?,?,?,?,?,?,?,?)`
        const resultado = await mysql.execute(query, [
            req.body.nomeOng,
            req.body.emailOng,
            hash,
            req.body.cnpjOng,
            req.body.cepOng,
            req.body.enderecoOng,
            req.body.numeroOng,
            req.body.bairroOng,
            req.body.cidadeOng,
            req.body.ufOng
        ]);

        const response = {
            mensagem: "Ong criada com Sucesso",
            Detalhes: {
                idOng: resultado.insertId,
                'Nome da Ong': req.body.nomeOng,
                'E-mail da Ong': req.body.emailOng,
                CNPJ: req.body.cnpjOng
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

exports.postLoginOngs = async (req, res, next) => {
    try {
        const query = `SELECT * 
                         FROM Ongs 
                        WHERE emailOng = ?`;
        var resultado = await mysql.execute(query, [req.body.emailOng]);

        if (resultado.length < 1) {
            return res.status(401).send({ message: 'E-mail ou senha inválidos' })
        }

        if (await bcrypt.compareSync(req.body.password, resultado[0].password)) {
            const tokenOng = jwt.sign({
                idOng: resultado[0].idOng,
                nomeOng: resultado[0].nomeOng,
                emailOng: resultado[0].emailOng
            },
                process.env.JWT_KEY,
                {
                    expiresIn: "30m"
                });
            return res.status(200).send({
                message: 'Autenticado com sucesso',
                token: tokenOng
            });
        }
        return res.status(401).send({ message: 'E-mail ou senha inválidos' })
    } catch (error) {
        return res.status(500).send({
            Mensagem: "Falha ao processar sua requisição, verifique os dados e tente novamente",
            Erro: error
        });
    }
};

exports.getOngListarEventos = async(req, res, next) => {
    try {
        const resultado = await mysql.execute(
            `SELECT * 
               FROM Eventos 
              WHERE idOng = ?`,
            [req.Ong.idOng]
        )

        return res.status(200).send(resultado)
    } catch (error) {
        return res.status(500).send({
            message: "Erro ao processar sua requisição",
            Erro: error
        })
    }
};