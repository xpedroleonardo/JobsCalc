const express = require("express");

const app = express();

app.listen(3000, () => console.log("Server is Running!!"));

app.get("/", (request, response) => {
  return response.sendFile(__dirname + "/views/");
});
