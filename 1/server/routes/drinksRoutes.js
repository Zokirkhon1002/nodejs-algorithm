import { Router } from "express";
import {
  getAllDrinks,
  addingNewDrink,
  getDrinkById,
  deleteDrinkById,
  updateDrinkById,
} from "../controllers/drinksControls.js";
const drinksRouter = Router();

// CRUD DRINKS
drinksRouter.get("/", getAllDrinks);
drinksRouter.get("/:id", getDrinkById);
drinksRouter.post("/", addingNewDrink);
drinksRouter.delete("/:id", deleteDrinkById);
drinksRouter.put("/:id", updateDrinkById);

export default drinksRouter;
