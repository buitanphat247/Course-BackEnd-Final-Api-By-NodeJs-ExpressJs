const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
});

const projectSchema = new mongoose.Schema({
  name: String,
  startDate: String,
  endDate: String,
  description: String,
});

const taskSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    userInfor: userSchema,
    projectInfor: projectSchema,
    status: String,
    startDate: String,
    endDate: String,
  },
  { timestamps: true }
);
taskSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
