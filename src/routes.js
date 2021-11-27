const express = require('express');
const routes = express.Router()

const views = __dirname + "/views/"

const profile = {
    name: "Luis Henrique",
    avatar: "https://github.com/luisdasilvahenrique.png",
    "monthly-budget": 3000,
    "day-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-day": 4
}

const jobs = [
    {
        id: 1,
        name: "Pizzaria Guloso",
        "daily-hours": 2,
        "total-hours": 44,
        created_at: Date.now()
    },
    {
        id: 2,
        name: "Onetwo Project",
        "daily-hours": 4,
        "total-hours": 35,
        created_at: Date.now()
    },
]

//req, res
routes.get('/', (req, res) =>   res.render(views + "index", { jobs }))
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
