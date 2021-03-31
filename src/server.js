const express = require('express') //Biblioteca para criar o servidor
const server = express() //A variavel server recebe tudo do express()
const routes = require('./routes') //Importando o routes do nosso arquivo routes.js e cria todas as rotas



// Configurando o server para renderizar as views pela template engine
server.set('view engine', 'ejs') 

//Habilitar arquivos estaticos
server.use(express.static("public")) // Falando para o servidor usar os arquivos estaticos que estão na pasta public

//usar o req Body para receber formularios
server.use(express.urlencoded({extended: true}));

//Request, Response
server.use(routes) // Usando todas as nossas rotas do routes.js

server.listen(3000, () => console.log('rodando'))// Fazendo o servidor escutar a porta 3000 e dar uma mensagem de callback