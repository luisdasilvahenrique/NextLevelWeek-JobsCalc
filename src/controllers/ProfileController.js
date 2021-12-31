const Profile = require('../model/Profile.js')

module.exports = {
  index(req, res) {
    return res.render("profile", { profile: Profile.get() });
  },

  update(req, res) {
    //req.body para pegar os dados
    const data = req.body;

    //quantas semanas tem no ano: 52
    const weeksPerYear = 52;

    //remover as semanas de férias do ano, para pegar quantas semanas tem em 1 mês
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;

    //quantas horas por semana estou trabalhando
    const weeksTotalHours = data["hours-per-day"] * data["days-per-week"];

    //total de horas trabalhadas no mes
    const monthlyTotalHours = weeksTotalHours * weeksPerMonth;

    //qual será o valor da hora?
    const valueHour = data["monthly-budget"] / monthlyTotalHours;

    

    Profile.update = ({
    ...Profile.get(),
    ...req.body,
    "value-hour": valueHour,
    })

    return res.redirect("/profile");
  },
};
