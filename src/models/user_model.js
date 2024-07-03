const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

// config type data for database user
const userSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    phone: String,
    age: String,
  },
  { timestamps: true }
);

userSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});
// config model
const User = mongoose.model("User", userSchema);

module.exports = User;
