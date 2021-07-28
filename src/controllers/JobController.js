const Job = require("../model/Job");
const Profile = require("../model/Profile");
const { calculateBudget } = require("../utils/JobUtils");

module.exports = {
  create(req, res) {
    return res.render("job");
  },
  save(req, res) {
    const newJob = req.body;
    const jobs = Job.get();
    newJob.id = (jobs[jobs.length - 1]?.id || 0) + 1;
    newJob.created_at = Date.now();

    Job.create(newJob);

    return res.redirect("/");
  },
  show(req, res) {
    const jobId = req.params.id;
    const jobs = Job.get();
    const profile = Profile.get();

    const job = jobs.find(({ id }) => Number(id) === Number(jobId));

    if (!job) {
      return res.send("Job not found...");
    }

    job.budget = calculateBudget(job, profile.valueHour);

    return res.render("job-edit", { job });
  },
  update(req, res) {
    const jobId = req.params.id;
    const jobs = Job.get();

    const job = jobs.find(({ id }) => Number(id) === Number(jobId));

    if (!job) {
      return res.send("Job not found...");
    }

    const updatedJob = {
      ...job,
      name: req.body.name,
      totalHours: req.body.totalHours,
      dailyHours: req.body.dailyHours,
    };

    const newJobs = jobs.map((job) => {
      if (Number(job.id) === Number(jobId)) {
        job = updatedJob;
      }
      return job;
    });

    Job.update(newJobs);

    res.redirect("/job/" + jobId);
  },
  delete(req, res) {
    Job.delete(req.params.id);

    return res.redirect("/");
  },
};
