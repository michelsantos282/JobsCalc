const Profile = require('../model/Profile');


module.exports = {
  async index(req, res) { 
    return res.render("profile", {profile : await Profile.get()}) 
  },
  
  async update(req, res) {
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
    const valueHour = data["monthly-budget"] / monthlyTotalHours;

    const profile = await Profile.get();

    await Profile.update({
      ...profile,
      ...req.body,
      "value-hour": valueHour
    })
    /*Profile.update(data);*/



    return res.redirect('/profile');
  }
}