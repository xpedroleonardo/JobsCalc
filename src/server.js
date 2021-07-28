const express = require("express");
const routes = require("./routes");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); //req.body = true
app.use(express.static("public"));
app.use(routes);

app.listen(3000, () => console.log("Running in: http://localhost:3000/"));
