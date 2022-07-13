import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";

config();

// routes importing
import tempRoute from "./routes/product.js";

const app = express();
app.use(json());
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

// Temp Route
app.use("/products", tempRoute);

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
