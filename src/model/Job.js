const Database = require("../db/config");

module.exports = {
  async get() {
    const db = await Database();

    const data = await db.all(`SELECT * FROM jobs`);

    await db.close();

    return data;
  },
  async create(newJob) {
    const { name, dailyHours, totalHours, created_at } = newJob;
    const db = await Database();

    await db.run(`
    INSERT INTO jobs (
      name,
      dailyHours,
      totalHours,
      created_at
      ) VALUES (
        "${name}",
        ${dailyHours},
        ${totalHours},
        ${created_at}
      )
    `);

    await db.close();
  },
  async update(updatedJob, id) {
    const { name, dailyHours, totalHours } = updatedJob;

    const db = await Database();

    await db.run(`
      UPDATE jobs SET
      name = "${name}",
      dailyHours = ${Number(dailyHours)},
      totalHours = ${Number(totalHours)}
      WHERE id = ${Number(id)}
    `);

    await db.close();
  },
  async delete(id) {
    const db = await Database();

    await db.run(`DELETE FROM jobs WHERE id = ${id}`);

    await db.close();
  },
};
