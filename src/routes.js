const express = require("express");
const routes = express.Router();

const url = __dirname + "/views/";

const profile = {
  name: "Pedro",
  avatar: "https://github.com/xpedroleonardo.png",
  monthlyBudget: 4000,
  hoursPerDay: 6,
  daysPerWeek: 5,
  vacationPerYear: 4,
};

const jobs = [
  {
    id: 1,
    name: "App",
    dailyHours: "10",
    totalHours: "2132",
    created_at: Date.now(),
  },
];

routes.get("/", (req, res) => res.render(url + "index", { jobs }));

routes.get("/job", (req, res) => res.render(url + "job"));
routes.post("/job", (req, res) => {
  const job = req.body;
  job.id = (jobs[jobs.length - 1]?.id || 0) + 1;
  job.created_at = Date.now();

  jobs.push(job);
  return res.redirect("/");
});

routes.get("/job/edit", (req, res) => res.render(url + "job-edit"));
routes.get("/profile", (req, res) => res.render(url + "profile", { profile }));

module.exports = routes;
