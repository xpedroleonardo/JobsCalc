const profile = require("../model/profile");

function index(req, res) {
  return res.render("profile", { profile: profile.get() });
}

function update(req, res) {
  const data = req.body;

  const weeksPerYear = 52;
  const weeksPerMonth = (weeksPerYear - data.vacationPerYear) / 12;
  const weekTotalHours = data.hoursPerDay * data.daysPerWeek;
  const monthlyTotalHours = weekTotalHours * weeksPerMonth;
  const valueHour = data.monthlyBudget / monthlyTotalHours;

  profile.set({
    ...profile.get(),
    ...data,
    valueHour,
  });

  return res.redirect("/profile");
}

module.exports = { index, update };
