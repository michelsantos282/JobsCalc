const express = require('express') //Pegando o express e colocando em uma variavel
const routes = express.Router() //Pegando o modulo Routes do express para criar todas as rotas

const views = __dirname + "/views/"

const profile = {
    name: "Michel",
    "monthly-budget": 3000,
    "hours-per-day": 6,
    "days-per-week": 5,
    "vacation-per-year": 3    
}

routes.get('/', (req, res) => { return res.render(views + "index")})

routes.get('/profile', (req, res) => { return res.render(views + "profile", {profile}) })

routes.get('/job', (req, res) => { return res.render(views + "job") })

routes.get('/job/edit', (req, res) => { return res.render(views + "job-edit") })


module.exports = routes; //Exportando o metodo routes