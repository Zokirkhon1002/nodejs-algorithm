const { Router } = require("express");
const router = Router();
const {
  getAllProducts,
  addNewProduct,
  getProductByCategory,
  getProductBySearch,
} = require("../controllers/productsControl");

router.get("/", getAllProducts);
router.get("/category/:category", getProductByCategory);
router.get("/search", getProductBySearch);
router.post("/", addNewProduct);

module.exports = router;
