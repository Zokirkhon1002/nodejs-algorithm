// @ts-nocheck
import { Router } from "express";
import { auth } from "../middleware/auth.js";
const router = Router();

// importing Controls
import {
  addNewProduct,
  getProductByCategory,
  getAllProducts,
  getProductBySearch,
  deleteProductById,
  updateLaptopById,
} from "../controller/productControl.js";

router.get("/", getAllProducts);
router.get("/category/:category", getProductByCategory);
router.get("/search", getProductBySearch);
router.delete("/:id", auth, deleteProductById);
router.put("/:id", auth, updateLaptopById);
router.post("/", auth, addNewProduct);

export default router;
