import express from "express";
import cors from "cors";
import HomePage from "./routes/homePage.js";
import FoodsRoute from "./routes/foodsRoutes.js";
import DrinksRoute from "./routes/drinksRoutes.js";

const app = express();
app.use(express.json());

// for frontend
app.use(cors());

// home page
app.use("/", HomePage);
// /foods route
app.use("/foods", FoodsRoute);
// /drinks route
app.use("/drinks", DrinksRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running port on ${PORT}`);
});
