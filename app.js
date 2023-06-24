const express = require("express");
const bodyParser = require("body-parser");

const routes = require("express").Router();
const tasksInfo = require("./routes/tasksInfo");

const app = express();
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json);

const PORT = 3000;

routes.get("/", (req, res) => {
  res.send("welocme to task manager");
  console.log("from home page");
});

//routes.get('/tasks')
routes.use("/tasks", tasksInfo);
app.listen(PORT, (err) => {
  if (!err) console.log("app listening on port " + PORT);
  else console.log("Could not launch server app due to " + err);
});
