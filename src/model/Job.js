let data = [
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
];

module.exports = {
  get() {
    return data;
  },

  update(newData) {
    data = newData;
  },

  delete(jobId) {
    data = data.filter(job => Number(job.id) !== Number(jobId))
  } // Parei aqui 2:01:32 do video


}