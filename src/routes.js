const express = require("express");
const routes = express.Router();
const { controllers } = require("./job");

const profileControler = require("./controllers/profileController");

routes.get("/", controllers.index);

routes.get("/job", controllers.create);
routes.post("/job", controllers.save);

routes.get("/job/:id", controllers.show);
routes.post("/job/:id", controllers.update);
routes.post("/job/delete/:id", controllers.delete);

routes.get("/profile", profileControler.index);
routes.post("/profile", profileControler.update);

module.exports = routes;
