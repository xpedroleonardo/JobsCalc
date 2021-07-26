let JobList = [
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
    dailyHours: 1,
    totalHours: 1,
    created_at: Date.now(),
  },
];

const controllers = {
  index(req, res) {
    const updateJobs = JobList.map((job) => {
      const remaining = services.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      return {
        ...job,
        remaining,
        status,
        budget: services.calculateBudget(job, profile.data.valueHour),
      };
    });

    return res.render("index", { jobs: updateJobs });
  },
  create(req, res) {
    return res.render("job");
  },
  save(req, res) {
    const job = req.body;
    job.id = (JobList[JobList.length - 1]?.id || 0) + 1;
    job.created_at = Date.now();

    JobList.push(job);
    return res.redirect("/");
  },
  show(req, res) {
    const jobId = req.params.id;
    const job = JobList.find(({ id }) => Number(id) === Number(jobId));

    if (!job) {
      return res.send("Job not found...");
    }

    job.budget = services.calculateBudget(job, profile.data.valueHour);

    return res.render("job-edit", { job });
  },
  update(req, res) {
    const jobId = req.params.id;
    const job = JobList.find(({ id }) => Number(id) === Number(jobId));

    if (!job) {
      return res.send("Job not found...");
    }

    const updatedJob = {
      ...job,
      name: req.body.name,
      totalHours: req.body.totalHours,
      dailyHours: req.body.dailyHours,
    };

    JobList = JobList.map((job) => {
      if (Number(job.id) === Number(jobId)) {
        job = updatedJob;
      }
      return job;
    });

    res.redirect("/job/" + jobId);
  },
  delete(req, res) {
    const jobId = req.params.id;
    JobList = JobList.filter(({ id }) => Number(id) !== Number(jobId));

    return res.redirect("/");
  },
};

const profile = {
  data: {
    name: "Pedro",
    avatar: "https://github.com/xpedroleonardo.png",
    monthlyBudget: 4000,
    hoursPerDay: 6,
    daysPerWeek: 5,
    vacationPerYear: 4,
    valueHour: 50,
  },
};

const services = {
  remainingDays(job) {
    const remainingDaysInitial = (job.totalHours / job.dailyHours).toFixed();

    const createdDate = new Date(job.created_at);
    const dueDay = createdDate.getDate() + Number(remainingDaysInitial);
    const dueDateInMs = createdDate.setDate(dueDay);

    const timeDiffInMs = dueDateInMs - Date.now();
    const daysInMs = 1000 * 60 * 60 * 24;
    const dayDiff = Math.floor(timeDiffInMs / daysInMs);

    return dayDiff;
  },
  calculateBudget: (job, valueHour) => valueHour * job.totalHours,
};

module.exports = { controllers, services, profile };
