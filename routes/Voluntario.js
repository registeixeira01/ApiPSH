const express = require('express');
const router = express.Router();
const { token } = require('morgan');
const loginVoluntario = require('../middleware/loginVoluntario')
//criacao de toke payload = informacoes do usuario que vao ser enviadas pra formar o token. expiresIn = tempo que token fica disponivel antes de expirar

const controller = require('../controllers/voluntarioController');

// cadastro de Doador
router.post('/cadastrarVoluntario', controller.postCadastrarVoluntario );

// login de Doador
router.post('/loginVoluntario', controller.postLoginVoluntario);

router.post('/cadastrarVoluntarioEvento/:idEvento', loginVoluntario, controller.postCadastrarVoluntarioEvento);

module.exports = router;