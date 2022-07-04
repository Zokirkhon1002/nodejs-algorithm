const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Mobile = require("./routes/mobileRoute");
const Laptop = require("./routes/laptopRoute");
const SignUp = require("./routes/log/sign-up");
const SignIn = require("./routes/log/sign-in");

// initialize
const app = express();
// necessery for "restful api"
app.use(express.json());
app.use(cors());

// connection of MongoDB
let [userName, password] = [process.env.USER_NAME, process.env.PASSWORD];
const LINK = `mongodb+srv://${userName}:${password}@boburmirzoalgoritm.l1kojgb.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(LINK)
  .then(() => console.log("MongoDb is connected: "))
  .catch((e) => console.log(`Mongodb is not connected: ${e}`));

// Home | default;
app.get("/", async (req, res) => {
  res.send("App is running perfectly");
});

// laptop route
app.use("/mobile", Mobile);

// mobile route
app.use("/laptop", Laptop);

// sign-up route
app.use("/sign-up", SignUp);

// sign-up route
app.use("/sign-in", SignIn);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
