const Database = require("./config");

const initDb = {
  async init() {
    const db = await Database();

    await db.exec(`
      CREATE TABLE profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        monthlyBudget INT,
        hoursPerDay INT,
        daysPerWeek INT,
        vacationPerYear INT,
        valueHour INT
      )
    `);

    await db.exec(`
      CREATE TABLE jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        dailyHours INT,
        totalHours INT,
        created_at DATETIME
      )
    `);

    await db.run(`
      INSERT INTO profile (
        name,
        avatar,
        monthlyBudget,
        hoursPerDay,
        daysPerWeek,
        vacationPerYear,
        valueHour
        ) VALUES (
        "Pedro",
        "https://github.com/xpedroleonardo.png",
        4000,
        6,
        5,
        4,
        50
        )
    `);

    await db.close();
  },
};

initDb.init();
