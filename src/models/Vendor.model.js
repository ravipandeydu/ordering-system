const mongoose = require("mongoose");
const vendorSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    full_name: { type: String, require: true },
    password: { type: String, require: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    selling_price: { type: Number, require: true },
    role: { type: String, default: "vendor", require: true },
  },
  { timestamps: true }
);

const vendorModel = mongoose.model("vendor", vendorSchema);

module.exports = {
  vendorModel,
};
