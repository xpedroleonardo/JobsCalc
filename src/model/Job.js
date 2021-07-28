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
  async update(Job) {
    const { id, name, dailyHours, totalHours } = Job;

    console.log(Job);

    const db = await Database();

    await db.get(`
      UPDATE jobs SET
      name = "${name}",
      dailyHours = ${Number(dailyHours)},
      totalHours = ${Number(totalHours)}
      WHERE id = ${Number(id)}
    `);

    await db.close();
  },
  async delete(jobId) {
    const db = await Database();

    await db.get(`DELETE FROM jobs WHERE id = ${jobId}`);

    await db.close();
  },
};
