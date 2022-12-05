const express = require('express');
const router = express.Router();

const controller = require('../controllers/ongController')
const loginOng = require('../middleware/loginOng');

// cadastro de Doador
router.post('/cadastrarOng', controller.postCadastrarOngs );

// login de Doador
router.post('/loginOng', controller.postLoginOngs );
router.get('/listar', loginOng, controller.getOngListarEventos );
        
module.exports = router;