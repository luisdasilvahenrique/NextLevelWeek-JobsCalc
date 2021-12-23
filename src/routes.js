const express = require("express");
const routes = express.Router();

const views = __dirname + "/views/";

const Profile = {
  data: {
    name: "Luis Henrique",
    avatar: "https://github.com/luisdasilvahenrique.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 2,
    "value-hour": 75,
  },

  controllers: {
    index(req, res){
      return res.render(views + "profile", { profile: Profile.data })
    },

      update(req, res){
        //req.body para pegar os dados
        //quantas semanas tem no ano
        //remover as semanas de férias do ano
        //quantas horas por semana estou trabalhando
        //total de horas trabalhadas no mes
      }
    }
  }

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

  controllers: {
    index(req, res) {
        const updateJobs = Job.data.map((job) => {
          //ajustes no job
          const remaining = Job.services.remainingDays(job);
          const status = remaining <= 0 ? "done" : "progress";
      
          return {
            ...job,
            remaining,
            status,
            budget: Profile.data["value-hour"] * job["total-hours"],
          };
        });
      
        return res.render(views + "index", { jobs: updateJobs })
    },  
    
    create(req, res){
      return res.render(views, "job")
    },

    save(req, res){
      const lastId = Job.data[Job.data.length - 1]?.id || 1;

      Job.data.push({//aqui antes era jobs
        // estou mandando isto para o const jobs = []
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now() // atribuindo data de hoje
      })
      return res.redirect("/")
        }
    },  

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
      }
    }
  }


//req, res
routes.get("/", Job.controllers.index)

routes.get("/job", Job.controllers.create)
routes.post("/job", Job.controllers.save)
routes.get("/job/edit", (req, res) => res.render(views + "job-edit"))
routes.get("/profile", Profile.controllers.index)
routes.post("/profile", Profile.controllers.update)

module.exports = routes;
