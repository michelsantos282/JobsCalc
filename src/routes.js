const express = require('express') //Pegando o express e colocando em uma variavel
const routes = express.Router() //Pegando o modulo Routes do express para criar todas as rotas
const ProfileController = require('./controllers/ProfileController');
const JobController = require('./controllers/JobController');
const DashboardController = require('./controllers/DashboardController');

routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

routes.get('/', DashboardController.index)
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)

routes.get('/login', (req, res) => {
    return res.render("login");
})
routes.get('/register', (req, res) => {
    return res.render("register");
})

module.exports = routes; //Exportando o metodo routes