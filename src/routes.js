const express = require("express");
const routes = express.Router();

routes.get("/", (request, response) => {
  return response.sendFile(__dirname + "/views/");
});

module.exports = routes;
