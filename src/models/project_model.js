const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const customerSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
});
const leaderSchema = new mongoose.Schema({
  username: String,
  email: String,
});

// config type data for database user
const projectSchema = new mongoose.Schema(
  {
    username: String,
    startDate: String,
    endDate: String,
    description: String,
    customerInfor: customerSchema,
    userInfor: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    leader: leaderSchema,
    task: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

projectSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});
// config model
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
