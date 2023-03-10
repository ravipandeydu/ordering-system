const { Router } = require("express");
const { customerModel } = require("../models/Customer.model");
import { Request, Response } from "express";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const customerRoutes = Router();

// Customer Sign Up
customerRoutes.post("/signup", async (req: Request, res: Response) => {
  let { username, full_name, password } = req.body;
  try {
    let customer = await customerModel.findOne({ username: username });
    if (customer) {
      return res.send({ error: "Already Registered, Please Login" });
    } else {
      bcrypt.hash(password, 6, async function (err: string, hash: string) {
        if (err) {
          res.send({ error: "Something wrong" });
          console.log(err);
        } else {
          const newCustomer = new customerModel({
            username,
            full_name,
            password: hash,
          });
          await newCustomer.save();
          res.send({
            message: "Succesfully Registered",
            customer: newCustomer,
          });
        }
      });
    }
  } catch (err: any) {
    return res.status(401).send(err.message);
  }
});

module.exports = {
  customerRoutes,
};
