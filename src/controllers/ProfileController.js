const Profile = require('../model/Profile');


module.exports = {
  index(req, res) { 
    return res.render("profile", {profile : Profile.get()}) 
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

    Profile.update(data);



    return res.redirect('/profile');
  }
}