// @ts-nocheck
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Home = require("./router/home");
require("dotenv/config");

const Products = require("./router/product");
const SignUp = require("./router/login/sign-up");
const SignIn = require("./router/login/sign-in");
const Files = require("./router/file");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Mongodb is connected"))
  .catch(() => console.log("Mongodb is not connected"));

app.use("", Home);
app.use("/products", Products);
app.use("/sign-up", SignUp);
app.use("/sign-in", SignIn);
app.use("/files", Files);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`${PORT} is listened`));
