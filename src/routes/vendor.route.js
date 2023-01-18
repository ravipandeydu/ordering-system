const { Router } = require("express");
const { vendorModel } = require("../models/Vendor.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const vendorRoutes = Router();

// Vendor Signup
vendorRoutes.post("/signup", async (req, res) => {
  let { username, full_name, password, product, selling_price } = req.body;
  try {
    let vendor = await vendorModel.findOne({ username: username });
    if (vendor) {
      return res.send({ error: "Already Registered, Please Login" });
    } else {
      bcrypt.hash(password, 6, async function (err, hash) {
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
  } catch (err) {
    return res.status(401).send(err.message);
  }
});

module.exports = {
  vendorRoutes,
};
