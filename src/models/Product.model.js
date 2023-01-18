const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    price: { type: Number, require: true },
  },
  { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);

module.exports = {
  productModel,
};
