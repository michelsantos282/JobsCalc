const Job = require('../model/Job');
const Profile = require('../model/Profile');
const jobUtils = require('../utils/jobUtils');

module.exports = {

  index (req, res) {
    const jobs = Job.get();
    const profile = Profile.get();

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    }
    
    //Total de horas por dia de cada projeto em progresso
    let jobTotalHours = 0;

    const updatedJobs = jobs.map((job) => {
  
      const remaining = jobUtils.remainingDays(job);
      const status = remaining <= 0 ? 'done' : 'progress';

      //Somando a quantidade de estados
      statusCount[status] += 1;

      jobTotalHours = status == 'progress' 
      ? jobTotalHours += Number(job["daily-hours"]) 
      : jobTotalHours

      
      return {
        ...job,
        remaining,
        status,
        budget: jobUtils.calculateBudget(job, profile["value-hour"])
      };
    });
   
    //Qtde de horas que quero trabalhar - a qtde de horas/dia de cada job em progresso
    const freeHours = profile["hours-per-day"] - jobTotalHours;
  
    return res.render("index", { 
      jobs:updatedJobs, 
      profile, 
      statusCount,
      freeHours
    });
  },
}