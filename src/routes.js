const express = require("express");
const routes = express.Router();
const ProfileController = require('./controllers/ProfileController')

const Job = {
  data: [
    {
      id: 1,
      name: "Pizzaria Guloso",
      "daily-hours": 2,
      "total-hours": 1,
      created_at: Date.now(),
    },
    {
      id: 2,
      name: "Onetwo Project",
      "daily-hours": 4,
      "total-hours": 35,
      created_at: Date.now(),
    },
  ],

    services: {
      remainingDays(job) {
        // ajustes no job
        // calculo de tempo restante
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
      
        const createdDate = new Date(job.created_at);
        const dueDay = createdDate.getDate() + Number(remainingDays);
        const dueDateInMs = createdDate.setDate(dueDay);
      
        const timeDiffInsMs = dueDateInMs - Date.now();
        // transformar milissegundos em dias
        const dayInMs = 1000 * 60 * 60 * 24;
        const dayDiff = Math.floor(timeDiffInsMs / dayInMs);
      
        // restam ox dias
        return dayDiff
      },
      calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
    }
  }


//req, res
routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delele/:id', Job.controllers.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

module.exports = routes;
