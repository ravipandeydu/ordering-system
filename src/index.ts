import express from "express";
const cors = require("cors");
const { userRoutes } = require("./routes/user.route");
const { orderRoutes } = require("./routes/order.route");
const { customerRoutes } = require("./routes/customer.route");
const { vendorRoutes } = require("./routes/vendor.route");
const { productRoutes } = require("./routes/product.route");

const { connection } = require("./config/db");

const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home page");
});

app.use(cors());

app.use("/user", userRoutes);

app.use("/order", orderRoutes);

app.use("/customer", customerRoutes);

app.use("/vendor", vendorRoutes);
app.use("/product", productRoutes);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (err) {
    console.log("Error connnecting to DB");
    console.log(err);
  }
  console.log(`listening on PORT ${PORT}`);
});
