const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    full_name: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, default: "customer", require: true },
  },
  { timestamps: true }
);

const customerModel = mongoose.model("customer", customerSchema);

module.exports = {
  customerModel,
};
