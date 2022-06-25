import { Router } from "express";
import { homePage } from "../controllers/home.js";
const homeRouter = Router();

homeRouter.get("/", homePage);

export default homeRouter;
