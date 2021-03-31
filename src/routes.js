const express = require('express') //Pegando o express e colocando em uma variavel
const routes = express.Router() //Pegando o modulo Routes do express para criar todas as rotas

const views = __dirname + "/views/"


const Job = {

	data: [
		{
			id: 1,
			name: "Pizzaria Guloso",
			"daily-hours": 2,
			"total-hours": 40,
			createdAt: Date.now(),
		},
		{
			id: 2,
			name: "OneTwoo Project",
			"daily-hours": 3,
			"total-hours": 47,
			createdAt: Date.now(),
		},
	
	],

	controllers: {
		index (req, res) {
				const updatedJobs = Job.data.map((job) => {
					
				const remaining = Job.services.remainingDays(job);
				const status = remaining <= 0 ? 'done' : 'progress';
				
				return {
					...job,
					remaining,
					status,
					budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
				};
			})

			return res.render(views + "index", { jobs:updatedJobs })
		},
		create (req, res) { 
			return res.render(views + "job") 
		},
		save (req, res) {
			const jobs = Job.data;
			const lastId = jobs[jobs.length - 1]?.id || 0;
		
			jobs.push({
				id: lastId + 1,
				name: req.body.name,
				"daily-hours": req.body["daily-hours"],
				"total-hours": req.body["total-hours"],
				createdAt: Date.now()
			});
		
			return res.redirect('/');
		},
		show (req, res) {
			const jobId = req.params.id;

			const job = Job.data.find(job => Number(job.id) === Number(jobId));

			if(!job) {
				return res.send("Job not Found!")
			}
			
			job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

			return res.render(views + "job-edit", {job}) 
		},
		update (req, res) {
			const jobId = req.params.id;

			const job = Job.data.find(job => Number(job.id) === Number(jobId));

			if(!job) {
				return res.send("Job Not found!");
			}

			const updatedJob = {
				...job,
				name: req.body.name,
				"total-hours": req.body["total-hours"],
				"daily-hours": req.body["daily-hours"]
			}

			Job.data = Job.data.map(job => {
			if(Number(job.id) === Number(jobId)){
				job = updatedJob
			}

			return job;
			
			})

			res.redirect('/job/' + jobId);
		},
		delete (req, res) {
			const jobId = req.params.id

			Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

			return res.redirect('/')
		}
	},

	services: {
		remainingDays(job){
			//Calculo de tempo restante
			
			const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed();
				
			const createdDate = new Date(job['createdAt']);
			const dueDay = createdDate.getDate() + Number(remainingDays);
			const dueDate = createdDate.setDate(dueDay);
		
			const timeDiffInMs = dueDate - Date.now();
			//transformar milisegundos em dias;
			const daiInMs = 1000 * 60 * 60 * 24;
			//dividir os dias em ms pela diferença
			const dayDiff = (timeDiffInMs / daiInMs).toFixed();
		
			return dayDiff
		},

		calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
	},
}

const Profile = {
	data: {
		name: "Chechel",
		"monthly-budget": 3000,
		"hours-per-day": 6,
		"days-per-week": 5,
		"vacation-per-year": 3,
		"value-hour": 75
	},

	controllers: {
		index(req, res) { 
			return res.render(views + "profile", {profile : Profile.data}) 
		},

		update(req, res) {
			//req body para pegar os dados
			const data = req.body;
			//definir quantas semanas tem um ano: 52
			const weeksPerYear = 52;
			//remover as semanas de ferias do ano, para pegar quantas semanas tem em um mes
			const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;

			//total de horas trabalhadas na semanas
			const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

			//horas trabalhadsas no mes
			const monthlyTotalHours = weekTotalHours * weeksPerMonth;

			//qual o valor da minha hora
			data["value-hour"] = data["monthly-budget"] / monthlyTotalHours;

			Profile.data = data;



			return res.redirect('/profile');
		}
	}
}


routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)

routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)

routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)

module.exports = routes; //Exportando o metodo routes