const { Router } = require("express");
const router = Router();
const { getUserTest, signIn } = require("../../controllers/log/signInControl");

router.get("/auth", getUserTest);
router.post("/auth", signIn);

module.exports = router;
