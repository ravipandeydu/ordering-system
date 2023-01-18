const { Router } = require("express");
require("dotenv").config();
const { authentication } = require("../middlewares/authentication");
const { vendorModel } = require("../models/Vendor.model");

const { OrderModel } = require("../models/Order.model");

const orderRoutes = Router();

// createOrder - (placed by sales guy)
orderRoutes.post("/create", authentication, async (req, res) => {
  const newOrder = new OrderModel({ ...req.body, status: "created" });
  try {
    await newOrder.save();
    res.send(newOrder);
  } catch (err) {
    res.send("something went wrong");
    console.log(err);
  }
});

// viewOrder - (with the vendor details assigned by the system)
orderRoutes.patch("/view/:orderId", authentication, async (req, res) => {
  const { orderId } = req.params;
  try {
    // To find the order
    const order = await OrderModel.find({ _id: orderId });

    // To find the product in the order
    const productId = order[0].productId._id;

    // To find the vendor with low selling price
    const venders = await vendorModel.find({ product: productId });
    const selected_vendor = venders.reduce((previous, current) => {
      return current.selling_price < previous.selling_price
        ? current
        : previous;
    });

    // To update the order with vender
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { _id: orderId },
      { ...order, vendorId: selected_vendor._id }
    ).populate(["userId", "productId", "customerId", "vendorId"]);
    if (updatedOrder) {
      res.send(updatedOrder);
    } else {
      res.send("couldn't update");
    }
  } catch (err) {
    res.send("something went wrong");
    console.log(err);
  }
});

// commitOrder - finalize the order and move it for fulfillment
orderRoutes.patch("/commit/:orderId", async (req, res) => {
  const { orderId } = req.params;
  try {
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { _id: orderId },
      { status: "Processed for fulfillment" }
    );
    if (updatedOrder) {
      res.send(updatedOrder);
    } else {
      res.send("couldn't update");
    }
  } catch (err) {
    res.send("something went wrong");
    console.log(err);
  }
});

module.exports = {
  orderRoutes,
};
