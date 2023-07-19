const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: [true, "You Should enter the task description to be added"],
      trim: true,
    },
   /*  compeleted: {
      type: Boolean,
      default: false,
    }, */
    taskOwner: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Task have to be added for specific user"],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
