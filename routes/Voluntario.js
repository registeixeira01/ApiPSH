const express = require('express');
const router = express.Router();
const { token } = require('morgan');
//criacao de toke payload = informacoes do usuario que vao ser enviadas pra formar o token. expiresIn = tempo que token fica disponivel antes de expirar

const PostCadastrarVoluntario = require('../controllers/voluntarioController');
const PostLoginVoluntario = require('../controllers/voluntarioController');

// cadastro de Doador
router.post('/cadastrarVoluntario', PostCadastrarVoluntario.postCadastrarVoluntario );

// login de Doador
router.post('/loginVoluntario', PostLoginVoluntario.postLoginVoluntario)







module.exports = router;