const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const tokenOng = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(tokenOng, process.env.JWT_KEY);
        req.Ong = decode;
        next();
    } catch (error) {
        return res.status(401).send({mensagem: "Falha na verificação da autenticação"})
    }

}