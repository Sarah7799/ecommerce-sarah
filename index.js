const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");
const app = express();

dotenv.config();
app.use(
    cors({
      origin: "*",
    })
  );

app.use(express.json());
const MONGO_URL = "mongodb+srv://sarahchat:sarahchat@chatapp.evjgx.mongodb.net/chatapp?retryWrites=true&w=majority";

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/products", productRoute);
  app.use("/api/carts", cartRoute);
  app.use("/api/orders", orderRoute);
  app.use("/api/checkout", stripeRoute);

  app.listen(process.env.PORT || 5000, () => {
      console.log("Success");
  });
