const express = require('express');
const router = express.Router();
const loginDoador = require('../middleware/loginDoador')

const DoadorController = require('../controllers/doadorController');
// cadastro de Doador
router.post('/cadastrarDoador', DoadorController.postCadastroDoador);

// login de Doador
router.post('/loginDoador', DoadorController.postLoginDoador);

// listar doações
router.get('/listar', loginDoador, DoadorController.get);

module.exports = router;