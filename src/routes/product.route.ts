const { Router } = require("express");
require("dotenv").config();
import { Request, Response } from "express";
const { productModel } = require("../models/Product.model");

const productRoutes = Router();

// To Create Products
productRoutes.post("/create", async (req:Request, res:Response) => {
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
