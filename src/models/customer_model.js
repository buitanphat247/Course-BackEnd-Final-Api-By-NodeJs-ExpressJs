const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

// config type data for database user
const customerSchema = new mongoose.Schema(
  {
    username: String,
    address: String,
    email: String,
    phone: String,
    age: String,
    description: String,
    image: String,
  },
  { timestamps: true }
);

customerSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});
// config model
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
