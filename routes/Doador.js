const express = require('express');
const router = express.Router();


const DoadorController = require('../controllers/doadorController');
// cadastro de Doador
router.post('/cadastrarDoador', DoadorController.postCadastroDoador);

// login de Doador
router.post('/loginDoador', DoadorController.postLoginDoador);

module.exports = router;