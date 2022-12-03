const http = require('http');
const app = require('./app');
// localhost:3000
const port = process.env.PORT || 3000; //porta padrao
const server = http.createServer(app); //cria o server
server.listen(port);
console.log("Servidor rodando na porta " + port);

