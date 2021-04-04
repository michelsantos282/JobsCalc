module.exports = {
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
}