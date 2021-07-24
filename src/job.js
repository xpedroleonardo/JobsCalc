const url = __dirname + "/views/";

const data = [
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
    const updateJobs = data.map((job) => {
      const remaining = services.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      return {
        ...job,
        remaining,
        status,
        budget: services.calculateBudget(job, profile.data.valueHour),
      };
    });

    return res.render(url + "index", { jobs: updateJobs });
  },
  create(req, res) {
    return res.render(url + "job");
  },
  save(req, res) {
    const job = req.body;
    job.id = (data[data.length - 1]?.id || 0) + 1;
    job.created_at = Date.now();

    data.push(job);
    return res.redirect("/");
  },
  show(req, res) {
    const jobId = req.params.id;
    const job = data.find(({ id }) => Number(id) === Number(jobId));
    job.budget = services.calculateBudget(job, profile.data.valueHour);

    return res.render(url + "job-edit", { job });
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
  index(req, res) {
    return res.render(url + "profile", { profile: profile.data });
  },
  update(req, res) {
    const data = req.body;

    const weeksPerYear = 52;
    const weeksPerMonth = (weeksPerYear - data.vacationPerYear) / 12;
    const weekTotalHours = data.hoursPerDay * data.daysPerWeek;
    const monthlyTotalHours = weekTotalHours * weeksPerMonth;
    const valueHour = data.monthlyBudget / monthlyTotalHours;

    profile.data = {
      ...profile.data,
      ...data,
      valueHour,
    };
    return res.redirect("/profile");
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

module.exports = { url, controllers, data, services, profile };
