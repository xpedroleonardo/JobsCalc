const express = require("express");
const routes = express.Router();

const url = __dirname + "/views/";

const profile = {
  name: "Pedro",
  avatar: "https://avatars.githubusercontent.com/u/50972494?v=4",
  monthlyBudget: 4000,
  hoursPerDay: 6,
  daysPerWeek: 5,
  vacationPerYear: 4,
};

routes.get("/", (req, res) => res.render(url + "index"));
routes.get("/job", (req, res) => res.render(url + "job"));
routes.get("/job/edit", (req, res) => res.render(url + "job-edit"));
routes.get("/profile", (req, res) => res.render(url + "profile", { profile }));

module.exports = routes;
