const jobUtils = require('../utils/jobUtils');
const Job = require('../model/Job');
const Profile = require('../model/Profile');

module.exports = {

  create (req, res) { 
    return res.render("job") 
  },
  
  async save (req, res) {
    const jobs = await Job.get();
    const lastId = jobs[jobs.length - 1]?.id || 0;

    Job.create({
      id: lastId + 1,
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      createdAt: Date.now()
    }
  );
    
    return res.redirect('/');
  },

  async show (req, res) {
    const profile = await Profile.get();
    const jobs = await Job.get();
    const jobId = req.params.id;

    const job = jobs.find(job => Number(job.id) === Number(jobId));

    if(!job) {
      return res.send("Job not Found!")
    }
    
    job.budget = jobUtils.calculateBudget(job, profile["value-hour"])

    return res.render("job-edit", {job}) 
  },

  async update (req, res) {
    const jobs = await Job.get();
    const jobId = req.params.id;

    const job = jobs.find(job => Number(job.id) === Number(jobId));

    if(!job) {
      return res.send("Job Not found!");
    }

    const updatedJob = {
      ...job,
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"]
    }

    const newJobs = jobs.map(job => {
    if(Number(job.id) === Number(jobId)){
      job = updatedJob
    }

    return job;
    
    })

    Job.update(newJobs);

    res.redirect('/job/' + jobId);
  },

  delete (req, res) {
   
    const jobId = req.params.id

    Job.delete(jobId);

    return res.redirect('/')
  }
}