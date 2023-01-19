import mongoose from "mongoose";
require("dotenv").config();
const mongo_url: string = process.env.MONGO_URL as string;
const connection = mongoose.connect(mongo_url);

module.exports = {
  connection,
};
