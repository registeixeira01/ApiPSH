const express = require('express');
const router = express.Router();

const controller = require('../controllers/ongController')

// cadastro de Doador
router.post('/cadastrarOng', controller.postCadastrarOngs );

// login de Doador
router.post('/loginOng', controller.postLoginOngs );
        
module.exports = router;