const Database = require("../db/config");

module.exports = {
  async get() {
    const db = await Database();

    const data = await db.get(`SELECT * FROM profile`);

    await db.close();
    return data;
  },
  async update(newData) {
    const db = await Database();

    const {
      name,
      avatar,
      monthlyBudget,
      hoursPerDay,
      daysPerWeek,
      vacationPerYear,
      valueHour,
    } = newData;

    console.log(newData);

    await db.get(`
      UPDATE profile SET
        name = "${name}",
        avatar = "${avatar}",
        monthlyBudget = ${Number(monthlyBudget)},
        hoursPerDay = ${Number(hoursPerDay)},
        daysPerWeek = ${Number(daysPerWeek)},
        vacationPerYear = ${Number(vacationPerYear)},
        valueHour = ${Number(valueHour)}
    `);

    await db.close();
  },
};
