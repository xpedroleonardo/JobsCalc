const Job = require("../model/Job");
const Profile = require("../model/Profile");
const { remainingDays, calculateBudget } = require("../utils/JobUtils");

module.exports = {
  async index(req, res) {
    const jobs = await Job.get();
    const profile = await Profile.get();

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };

    let jobTotalHours = 0;

    const updateJobs = jobs.map((job) => {
      const remaining = remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      statusCount[status] += 1;

      if (status == "progress") {
        jobTotalHours += Number(job.dailyHours);
      }

      return {
        ...job,
        remaining,
        status,
        budget: calculateBudget(job, profile.valueHour),
      };
    });

    let freeHours = profile.hoursPerDay - jobTotalHours;

    return res.render("index", {
      jobs: updateJobs,
      profile: profile,
      statusCount: statusCount,
      freeHours: freeHours,
    });
  },
};
