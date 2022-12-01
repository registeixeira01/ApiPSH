const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const tokenVoluntario = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(tokenVoluntario, process.env.JWT_KEY);
        req.Voluntario = decode;
        next();
    } catch (error) {
        return res.status(401).send({mensagem: "Falha na verificação da autenticação"})
    }

}