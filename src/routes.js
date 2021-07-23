const express = require("express");
const { url, controllers } = require("./job");
const routes = express.Router();

// const Job = {
//   controllers: {
//     index(req, res) {
//       const updateJobs = Job.data.map((job) => {
//         const remaining = Job.services.remainingDays(job);
//         const status = remaining <= 0 ? "done" : "progress";

//         return {
//           ...job,
//           remaining,
//           status,
//           budget: profile.valueHour * job.totalHours,
//         };
//       });

//       return res.render(url + "index", { jobs: updateJobs });
//     },
//     create(req, res) {
//       const job = req.body;
//       job.id = (Job.data[Job.data.length - 1]?.id || 0) + 1;
//       job.created_at = Date.now();

//       Job.data.push(job);
//       return res.redirect("/");
//     },
//   },
//   services: {
//     remainingDays(job) {
//       const remainingDaysInitial = (job.totalHours / job.dailyHours).toFixed();

//       const createdDate = new Date(job.created_at);
//       const dueDay = createdDate.getDate() + Number(remainingDaysInitial);
//       const dueDateInMs = createdDate.setDate(dueDay);

//       const timeDiffInMs = dueDateInMs - Date.now();
//       const daysInMs = 1000 * 60 * 60 * 24;
//       const dayDiff = Math.floor(timeDiffInMs / daysInMs);

//       return dayDiff;
//     },
//   },
// };

routes.get("/", controllers.index);

routes.get("/job", controllers.create);
routes.post("/job", controllers.save);

routes.get("/job/edit", (req, res) => res.render(url + "job-edit"));
routes.get("/profile", (req, res) => res.render(url + "profile", { profile }));

module.exports = routes;
