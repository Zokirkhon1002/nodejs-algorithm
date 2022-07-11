const { Router } = require("express");
const router = Router();
const {
  getAllProducts,
  addNewProduct,
  getProductByCategory,
  getProductBySearch,
} = require("../controllers/productsControl");

const { auth } = require("../middleware/auth");

router.get("/", getAllProducts);
router.get("/category/:category", getProductByCategory);
router.get("/search", getProductBySearch);
router.post("/", auth, addNewProduct);

module.exports = router;
