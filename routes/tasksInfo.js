const tasksRoutes = require("express").Router();
const tasksData = require("../tasksManagerData.json");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

tasksRoutes.use(bodyParser.urlencoded({ extended: false }));
console.log("flage 1");
tasksRoutes.use(bodyParser.json);

tasksRoutes.get("/", (req, res) => {
  res.status(200);
  console.log("/tasks being called");
  res.send("hello");
});

module.exports = tasksRoutes;
