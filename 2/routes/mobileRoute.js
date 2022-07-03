const { Router } = require("express");
const router = Router();

const {
  getAllMobiles,
  addNewMobile,
  getMobileById,
  removeMobileById,
  updateMobileById,
} = require("../controllers/mobileControl");

router.get("/", getAllMobiles);
router.get("/:id", getMobileById);
router.post("/", addNewMobile);
router.delete("/:id", removeMobileById);
router.put("/:id", updateMobileById);

module.exports = router;
