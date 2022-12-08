const mysql = require('../mysql');

exports.getEventos = async (req, res, next) => {
    try {
        const resultado = await mysql.execute(
                  `SELECT idEvento,
                          idOng,
                          ongResponsavel,
                          nomeEvento,
                          DATE_FORMAT(dataEvento,'%d/%m/%Y') 'dataEvento',
                          TIME_FORMAT(horarioEvento,'%Hh%i') 'horarioEvento',
                          cepEvento,
                          enderecoEvento,
                          numeroEvento,
                          bairroEvento,
                          cidadeEvento,
                          ufEvento,
                          qtdVoluntarios,
                          TIME_FORMAT(duracaoEvento,'%Hh%i') 'duracaoEvento',
                          pontuacao
                     FROM eventos;`)
        return res.status(200).send(resultado)
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Falha ao processar sua requisição",
            Erro: error
        })
    }
};

exports.postCadastrarEventos = async (req, res, next) => {
    try {
        const query = "INSERT INTO Eventos (idOng, ongResponsavel, nomeEvento, dataEvento, horarioEvento, cepEvento, enderecoEvento, numeroEvento, bairroEvento, cidadeEvento, UfEvento, qtdVoluntarios, duracaoEvento, pontuacao) VALUES (?,?,?,date_format(?,'%Y/%m/%d'),?,?,?,?,?,?,?,?,?,?)"
        const resultado = await mysql.execute(query, [
            req.Ong.idOng,
            req.Ong.nomeOng,
            req.body.nomeEvento,
            req.body.dataEvento,
            req.body.horarioEvento,
            req.body.cepEvento,
            req.body.enderecoEvento,
            req.body.numeroEvento,
            req.body.bairroEvento,
            req.body.cidadeEvento,
            req.body.ufEvento,
            req.body.qtdVoluntarios,
            req.body.duracaoEvento,
            req.body.pontuacao
        ]);
        const response = {
            mensagem: "Evento Criado com Sucesso",
            Detalhes: {
                idEvento: resultado.insertId,
                nomeEvento: req.body.nomeEvento
            }
        }
        return res.status(201).send(response);

    } catch (error) {
        return res.status(500).send({
            message: "Falha ao processar sua requisição",
            Erro: error
        })
    }
}