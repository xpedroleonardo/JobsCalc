const express = require("express");
const routes = express.Router();

const baseURL = __dirname + "/views/";

routes.get("/", (request, response) => response.sendFile(baseURL));

routes.get("/job", (request, response) =>
  response.sendFile(baseURL + "job.html")
);

routes.get("/job/edit", (request, response) =>
  response.sendFile(baseURL + "job-edit.html")
);

routes.get("/profile", (request, response) =>
  response.sendFile(baseURL + "profile.html")
);

module.exports = routes;
