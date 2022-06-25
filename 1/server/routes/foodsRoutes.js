import { Router } from "express";
import {
  getAllFoods,
  addingNewFood,
  getFoodByID,
  deleteFoodById,
  updateFoodById,
} from "../controllers/foodsControls.js";
const foodsRouter = Router();

// CRUD FOODS
foodsRouter.get("/", getAllFoods);
foodsRouter.get("/:id", getFoodByID);
foodsRouter.post("/", addingNewFood);
foodsRouter.delete("/:id", deleteFoodById);
foodsRouter.put("/:id", updateFoodById);

export default foodsRouter;
