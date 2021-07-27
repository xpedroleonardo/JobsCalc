const Profile = require("../model/Profile");

module.exports = {
  index(req, res) {
    return res.render("profile", { profile: Profile.get() });
  },

  update(req, res) {
    const data = req.body;

    const weeksPerYear = 52;
    const weeksPerMonth = (weeksPerYear - data.vacationPerYear) / 12;
    const weekTotalHours = data.hoursPerDay * data.daysPerWeek;
    const monthlyTotalHours = weekTotalHours * weeksPerMonth;
    const valueHour = data.monthlyBudget / monthlyTotalHours;

    Profile.update({
      ...Profile.get(),
      ...data,
      valueHour,
    });

    return res.redirect("/profile");
  },
};
