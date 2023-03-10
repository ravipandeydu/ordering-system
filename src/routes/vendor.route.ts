const { Router } = require("express");
const { vendorModel } = require("../models/Vendor.model");
import { Request, Response } from "express";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const vendorRoutes = Router();

// Vendor Signup
vendorRoutes.post("/signup", async (req: Request, res: Response) => {
  let { username, full_name, password, product, selling_price } = req.body;
  try {
    let vendor = await vendorModel.findOne({ username: username });
    if (vendor) {
      return res.send({ error: "Already Registered, Please Login" });
    } else {
      bcrypt.hash(password, 6, async function (err: string, hash: string) {
        if (err) {
          res.send({ error: "Something wrong" });
          console.log(err);
        } else {
          const newVendor = new vendorModel({
            username,
            full_name,
            password: hash,
            product,
            selling_price,
          });
          await newVendor.save();
          res.send({ message: "Succesfully Registered", vendor: newVendor });
        }
      });
    }
  } catch (err: any) {
    return res.status(401).send(err.message);
  }
});

module.exports = {
  vendorRoutes,
};
