import { Router } from "express";
const router = Router();

// importing Controls
import { getAllTempData } from "../controller/tempControl.js";

router.get("/", getAllTempData);

export default router;
