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
  valueHour: 50,
};

const jobs = [
  {
    id: 1,
    name: "App",
    dailyHours: 5,
    totalHours: 25,
    created_at: Date.now(),
  },
  {
    id: 2,
    name: "WebSite",
    dailyHours: 5,
    totalHours: 25,
    created_at: Date.now(),
  },
];

function remainingDays(job) {
  const remainingDaysInitial = (job.totalHours / job.dailyHours).toFixed();

  const createdDate = new Date(job.created_at);
  const dueDay = createdDate.getDate() + Number(remainingDaysInitial);
  const dueDateInMs = createdDate.setDate(dueDay);

  const timeDiffInMs = dueDateInMs - Date.now();
  const daysInMs = 1000 * 60 * 60 * 24;
  const dayDiff = Math.floor(timeDiffInMs / daysInMs);

  return dayDiff;
}

routes.get("/", (req, res) => {
  const updateJobs = jobs.map((job) => {
    const remaining = remainingDays(job);
    const status = remaining <= 0 ? "done" : "progress";

    return {
      ...job,
      remaining,
      status,
      budget: profile.valueHour * job.totalHours,
    };
  });

  return res.render(url + "index", { jobs: updateJobs });
});

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
