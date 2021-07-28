let data = [
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

module.exports = {
  get() {
    return data;
  },
  create(newJob) {
    data.push(newJob);
  },
  update(Job) {
    data = Job;
  },
  delete(jobId) {
    data = data.filter(({ id }) => Number(id) !== Number(jobId));
  },
};
