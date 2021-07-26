let data = {
  name: "Pedro",
  avatar: "https://github.com/xpedroleonardo.png",
  monthlyBudget: 4000,
  hoursPerDay: 6,
  daysPerWeek: 5,
  vacationPerYear: 4,
  valueHour: 50,
};

function get() {
  return data;
}

function set(newData) {
  data = newData;
}

module.exports = { get, set };
