const tasksRoutes = require("express").Router();
const tasksData = require("../tasksManagerData.json");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

tasksRoutes.use(bodyParser.urlencoded({ extended: false }));

tasksRoutes.use(bodyParser.json());

tasksRoutes.get("/", (req, res) => {
  res.status(200);
  console.log("/tasks being called");
  res.send(tasksData);
});

tasksRoutes.post("/", (req, res) => {
  const newTask = req.body;
  if (newTask.hasOwnProperty("id") && newTask.hasOwnProperty("title") && newTask.hasOwnProperty("description") && newTask.hasOwnProperty("flag")) {
    let writePath = path.join(__dirname, "..", "taskManagerData");
    let modifiedTasks = tasksData;
    modifiedTasks.tasks.push(newTask);
    console.log("modifief tasks are ----");
    console.log(modifiedTasks);
    fs.writeFileSync(writePath, JSON.stringify(modifiedTasks), { encoding: "utf8", flag: "w" });
    res.status(200).send("Task has been added successfully");
  } else {
    res.status(400).send("Some fields are missing");
  }
});

//for deleting  a task

tasksRoutes.delete("/:id", (req, res) => {
  let tasks = tasksData.tasks;
  let taskId = req.params.id;
  let result = tasks.filter((T) => {
    console.log("inside filter with t.id is " + T.id);
    console.log("task id is  " + taskId);
    if (T.id != taskId) {
      console.log("hit");
      return T;
    }
  });

  let writePath = path.join(__dirname, "..", "taskManagerData");
  fs.writeFileSync(writePath, JSON.stringify(result), { encoding: "utf8", flag: "w" });

  res.status(200).send(result);
});

tasksRoutes.put("/:id", (req, res) => {
  let updateTask = req.body;
  let tasks = tasksData.tasks;
  updateTask.id = req.params.id;

  let taskId = req.params.id;
  let result = tasks.filter((T) => {
    console.log("inside filter with t.id is " + T.id);
    console.log("task id is  " + taskId);
    if (T.id != taskId) {
      console.log("hit");
      return T;
    }
  });

  result.push(updateTask);

  let writePath = path.join(__dirname, "..", "taskManagerData");
  fs.writeFileSync(writePath, JSON.stringify(result), { encoding: "utf8", flag: "w" });

  res.status(200).send(result);
});

tasksRoutes.get("/:id", (req, res) => {
  let tasks = tasksData.tasks;
  let taskId = req.params.id;
  let result = tasks.filter((T) => {
    console.log("inside filter with t.id is " + T.id);
    console.log("task id is  " + taskId);
    if (T.id == taskId) {
      console.log("hit");
      return T;
    }
  });
  res.status(200).send(result);
});

module.exports = tasksRoutes;
