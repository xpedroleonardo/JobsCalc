module.exports = {
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
