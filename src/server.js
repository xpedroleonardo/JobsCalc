const express = require("express");
const routes = require("./routes");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); //req.body = true
app.use(express.static("public"));
app.use(routes);

app.listen(3000, () => console.log("Server is Running!!"));
