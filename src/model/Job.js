const Database = require('../db/config');

module.exports = {
  async get() {
    const db = await Database()

    const jobs = await db.all(`SELECT * from jobs`)

    await db.close()

    return jobs.map(job => {
      return {
        id: job.id,
        name: job.name,
        "daily-hours": job.daily_hours,
        "total-hours": job.total_hours,
        createdAt: job.created_at
      }
    })
  },//parei aqui 3:32:01 no video

  update(newData) {
    data = newData;
  },

  create(newJob){
    data.push(newJob);
  },

  delete(jobId) {
    data = data.filter(job => Number(job.id) !== Number(jobId))
  } // Parei aqui 2:01:32 do video


}