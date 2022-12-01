const express = require('express');
const router = express.Router();

const PostCadastrarOngs = require('../controllers/ongController')
const PostLoginOngs = require('../controllers/ongController')

// cadastro de Doador
router.post('/cadastrarOng', PostCadastrarOngs.postCadastrarOngs );

// login de Doador
router.post('/loginOng', PostLoginOngs.postLoginOngs );
        


module.exports = router;