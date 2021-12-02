const express = require('express');
const routes = express.Router()

const views = __dirname + "/views/"

const profile = {
    name: "Luis Henrique",
    avatar: "https://github.com/luisdasilvahenrique.png",
    "monthly-budget": 3000,
    "day-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-day": 4,
    "value-hour": 75
}

     const jobs = [
    {
        id: 1,
        name: "Pizzaria Guloso",
        "daily-hours": 2,
        "total-hours": 44,
        created_at: Date.now(),
    },
    {
        id: 2,
        name: "Onetwo Project",
        "daily-hours": 4,
        "total-hours": 35,
        created_at: Date.now(),
    },
    {
        id: 3,
        name: "Onethree Project",
        "daily-hours": 6,
        "total-hours": 40,
        created_at: Date.now(),
    },
]


function remainingDays(job){
    // ajustes no job
    // calculo de tempo restante
    const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()

    const createdDate = new Date(job.created_at)
    const dueDay = createdDate.getDate() + Number(remainingDays)
    const dueDateInMs = createdDate.setDate(dueDay)

    const timeDiffInsMs = dueDateInMs - Date.now()
    // transformar milissegundos em dias
    const dayInMs = 1000 * 60 * 60 * 24
    const dayDiff = Math.floor(timeDiffInsMs / dayInMs)

    
    // restam ox dias
    return dayDiff
}

//req, res
routes.get('/', (req, res) => {


    const updateJobs = jobs.map((job) => {
        //ajustes no job
     const remaining = remainingDays(job)
     const status = remaining  <= 0 ? 'done' : 'progress'

     return {
         ...job,
         remaining,
         status,
         budget: profile["value-hour"] = job["total-hours"]
     }
    })


    




   return res.render(views + "index", { jobs: updateJobs })

})
routes.get('/job', (req, res) =>   res.render(views + "job"))
routes.post('/job', (req, res) => {
    // req.body{ name: 'asdf', 'daily-hours': '3', 'total-hours': '12' }

    const lastId = jobs[jobs.length - 1]?.id || 1;

    jobs.push({// estou mandando isto para o const jobs = []
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now() // atribuindo data de hoje
    })
    return res.redirect("/")
})
routes.get('/job/edit', (req, res) =>   res.render(views + "job-edit"))
routes.get('/profile', (req, res) =>   res.render(views + "profile", { profile }))

module.exports = routes;
