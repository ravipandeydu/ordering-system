const { Router } = require("express");
require("dotenv").config();

const { productModel } = require("../models/Product.model");

const productRoutes = Router();

// To Create Products
productRoutes.post("/create", async (req, res) => {
  const newProduct = new productModel({ ...req.body, status: "created" });
  try {
    await newProduct.save();
    res.send(newProduct);
  } catch (err) {
    res.send("something went wrong");
    console.log(err);
  }
});

module.exports = {
  productRoutes,
};
