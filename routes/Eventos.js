const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const { response } = require('express');
const  PostCadastrarEventos  = require('../controllers/eventoController');
const loginOng = require('../middleware/loginOng');



// router.get = (req, res) => {
//     mysql.getConnection((error, conn) => {
//         if (error) { return res.status(500).send({ error: error }) }
//         conn.query(
//             'SELECT * FROM Evento;',
//             (error, resultado, fields) => {
//                 if (error) { return res.status(500).send({ error: error }) }
//                 return res.status(200).send({response : resultado})
//             }
//         )
//     })
// }

router.post( '/cadastrarEvento', loginOng, PostCadastrarEventos.postCadastrarEventos);

module.exports = router;