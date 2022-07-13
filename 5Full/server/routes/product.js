import { Router } from "express";
const router = Router();

// importing Controls
import {
  addNewProduct,
  getProductByCategory,
  getAllProducts,
  getProductBySearch,
} from "../controller/productControl.js";

router.get("/", getAllProducts);
router.get("/category/:category", getProductByCategory);
router.get("/search", getProductBySearch);
router.post("/", addNewProduct);

export default router;
