const express = require("express");
const taskController = require("../controllers/taskController");
const router = express.Router();
const authController = require("../controllers/authController");

router
  .route("/task")
  .post(authController.isLoggedIn, taskController.addTask)
  .get(authController.isLoggedIn,  taskController.getAllTasks);

router
  .route("/task/:id")
  .get(authController.isLoggedIn,taskController.getTask)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
