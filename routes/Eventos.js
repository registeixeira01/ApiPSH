const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const { response } = require('express');
const controller = require('../controllers/eventoController');
const loginOng = require('../middleware/loginOng');

router.post( '/cadastrarEvento', loginOng, controller.postCadastrarEventos);

router.get('/listar', controller.getEventos);

module.exports = router;