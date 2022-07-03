const { Router } = require("express");
const router = Router();

const {
  getAllLaptops,
  addNewLaptop,
  getLaptopById,
  removeLaptopById,
  updateLaptopById,
} = require("../controllers/laptopControl");

router.get("/", getAllLaptops);
router.post("/", addNewLaptop);
router.get("/:id", getLaptopById);
router.put("/:id", updateLaptopById);
router.delete("/:id", removeLaptopById);

module.exports = router;
