import { Router } from "express";
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
router.delete("/:id", deleteProductById);
router.put("/:id", updateLaptopById);
router.post("/", addNewProduct);

export default router;
