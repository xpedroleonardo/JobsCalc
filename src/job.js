const url = __dirname + "/views/";

const controllers = {
  index(req, res) {
    const updateJobs = data.map((job) => {
      const remaining = services.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      return {
        ...job,
        remaining,
        status,
        budget: profile.valueHour * job.totalHours,
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
};

const profile = {
  name: "Pedro",
  avatar: "https://github.com/xpedroleonardo.png",
  monthlyBudget: 4000,
  hoursPerDay: 6,
  daysPerWeek: 5,
  vacationPerYear: 4,
  valueHour: 50,
};

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
};

module.exports = { url, controllers, data, services };
