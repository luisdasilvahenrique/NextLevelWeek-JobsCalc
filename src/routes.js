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

const jobs = []

//req, res
routes.get('/', (req, res) =>   res.render(views + "index"))
routes.get('/job', (req, res) =>   res.render(views + "job"))
routes.post('/job', (req, res) => {
    // req.body{ name: 'asdf', 'daily-hours': '3', 'total-hours': '12' }

    const job = req.body
    job.createdAt =  Date.now() //atribuindo uma nova data

    jobs.push(job)
    return res.redirect("/")
})
routes.get('/job/edit', (req, res) =>   res.render(views + "job-edit"))
routes.get('/profile', (req, res) =>   res.render(views + "profile", { profile }))

module.exports = routes;
