const mysql = require('../mysql').pool;

exports.postCadastrarEventos = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        // // criptorafia de senha 
        // bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
        //     if (errBcrypt) {
        //         return res.status(500).send({ error: errBcrypt })
        //     }
            conn.query(
                "INSERT INTO Eventos (idOng, ongResponsavel, nomeEvento, dataEvento, cepEvento, enderecoEvento, numeroEvento, bairroEvento, cidadeEvento, UfEvento, qtdVoluntarios, duracaoEvento, pontuacaoHora, pontuacao) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                [
                    req.Ong.idOng,
                    req.Ong.nomeOng,
                    req.body.nomeEvento,
                    req.body.dataEvento,
                    req.body.cepEvento,
                    req.body.enderecoEvento,
                    req.body.numeroEvento,
                    req.body.bairroEvento,
                    req.body.cidadeEvento,
                    req.body.ufEvento,
                    req.body.qtdVoluntarios,
                    req.body.duracaoEvento,
                    req.body.pontuacaoHora,
                    req.body.pontuacao  
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
                            Ong_idOng: resultado.Ong_idOng,
                        }
                        
                    }
                    return res.status(201).send(response);
                })
        });
    }