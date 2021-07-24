const express = require("express");
const routes = express.Router();
const { url, controllers, profile } = require("./job");

routes.get("/", controllers.index);

routes.get("/job", controllers.create);
routes.post("/job", controllers.save);

routes.get("/job/:id", controllers.show);
routes.post("/job/:id", controllers.update);
routes.post("/job/delete/:id", controllers.delete);

routes.get("/profile", profile.index);
routes.post("/profile", profile.update);

module.exports = routes;
