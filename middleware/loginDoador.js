const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const tokenDoador = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(tokenDoador, process.env.JWT_KEY);
        req.Doador = decode;
        next();
    } catch (error) {
        return res.status(401).send({mensagem: "Falha na verificação da autenticação"})
    }

}