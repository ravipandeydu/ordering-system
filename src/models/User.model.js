const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    full_name: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, default: "sales_person", require: true },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = {
  userModel,
};
