const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// importing routes
const productsRoute = require("./routes/products");

const app = express();

app.use(express.json());
app.use(cors());

// connection of MongoDB
let [userName, password, lastPart] = [
  process.env.USER_NAME,
  process.env.PASSWORD,
  process.env.LAStPART,
];
const LINK = `mongodb+srv://${userName}:${password}${lastPart}`;

mongoose
  .connect(LINK)
  .then(() => console.log("MongoDb is connected: "))
  .catch((e) => console.log(`Mongodb is not connected: ${e}`));

// Home | default;
app.get("/", async (req, res) => {
  res.send("App is running perfectly");
});

// products route
app.use("/products", productsRoute);

// Listinging
let PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
