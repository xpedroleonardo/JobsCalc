const Job = require("../model/Job");
const Profile = require("../model/Profile");
const { calculateBudget } = require("../utils/JobUtils");

module.exports = {
  create(req, res) {
    return res.render("job");
  },
  async save(req, res) {
    const newJob = req.body;
    newJob.created_at = Date.now();

    await Job.create(newJob);

    return res.redirect("/");
  },
  async show(req, res) {
    const jobId = req.params.id;
    const jobs = await Job.get();
    const profile = await Profile.get();

    const job = jobs.find(({ id }) => Number(id) === Number(jobId));

    if (!job) {
      return res.send("Job not found...");
    }

    job.budget = calculateBudget(job, profile.valueHour);

    return res.render("job-edit", { job });
  },
  async update(req, res) {
    const jobId = req.params.id;
    const jobs = await Job.get();

    const job = jobs.find(({ id }) => Number(id) === Number(jobId));

    if (!job) {
      return res.send("Job not found...");
    }

    const updatedJob = {
      // ...job,
      name: req.body.name,
      totalHours: req.body.totalHours,
      dailyHours: req.body.dailyHours,
    };

    const newJob = jobs.find((job) => {
      if (Number(job.id) === Number(jobId)) {
        job = updatedJob;
        return job;
      }
    });

    Job.update(updatedJob);

    res.redirect("/job/" + jobId);
  },
  async delete(req, res) {
    await Job.delete(req.params.id);

    return res.redirect("/");
  },
};
