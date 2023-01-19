import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
      required: true,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendor",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    quantity: { type: Number, require: true },
    delivery_date: { type: Date, require: true },
    status: { type: String, require: true },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("order", orderSchema);

module.exports = {
  OrderModel,
};
