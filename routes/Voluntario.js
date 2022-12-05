const express = require('express');
const router = express.Router();
const { token } = require('morgan');
const loginVoluntario = require('../middleware/loginVoluntario')
//criacao de toke payload = informacoes do usuario que vao ser enviadas pra formar o token. expiresIn = tempo que token fica disponivel antes de expirar

const controller = require('../controllers/voluntarioController');

// cadastro de voluntário
router.post('/cadastrarVoluntario', controller.postCadastrarVoluntario );

// login de voluntário
router.post('/loginVoluntario', controller.postLoginVoluntario);

// cadastrar voluntario em um evento
router.post('/cadastrarVoluntarioEvento/:idEvento', loginVoluntario, controller.postCadastrarVoluntarioEvento);

// listar eventos em que o voluntário está inscrito
router.get('/voluntariosListar', loginVoluntario, controller.getVoluntarioListarEventosInscritos);


module.exports = router;