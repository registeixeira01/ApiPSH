const express = require('express');
const app = express(); //instancia do express
const morgan = require('morgan'); 
const bodyParser = require('body-parser');

const rotaProdutos = require('./routes/produtoResgate');
const rotaDoador = require('./routes/Doador');
const rotaEventos = require('./routes/Eventos');
const rotaOng = require('./routes/Ong');
const rotaVoluntario = require('./routes/Voluntario');

app.use(morgan('dev')); //monitora a execução e exibe um log
app.use(bodyParser.urlencoded({extended: false})); //apenas aceitar dados simples
app.use(bodyParser.json()); // so aceitar formato json de entrada

app.use((req, res, next) => { //Permissao de origin de acesso, servidor que api tera acesso
    res.header('Access-Control-Allow-Origin', '*'),
    res.header(
        'Access-Control-Allow-Header',
         'Origin, X-Requested-With, Content-Type, Accept, Authorization '
         ); //qual as propriedades que vai aceitar

         if(req.method === "OPTIONS") {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATH, DELETE, GET'); //tipos de dados que aceita
            return res.status(200).send({});
         }

         next();
})
app.use('/produtoResgate', rotaProdutos);
app.use('/Doador', rotaDoador);
app.use('/Eventos', rotaEventos);
app.use('/Ong', rotaOng);   rotaVoluntario
app.use('/Voluntario', rotaVoluntario); 
// rotas não encontrada
app.use((req, res, next) => {
    const erro = new Error(':( Nenhuma Rota encontrada')
    erro.status = 404;
    next(erro)
});

app.use((error,req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.mensage
        }
    })
});

module.exports = app; //exportar