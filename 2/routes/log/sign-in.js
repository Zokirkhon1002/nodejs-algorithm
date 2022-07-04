const { Router } = require("express");
const router = Router();

const { getUserTest, signIn } = require("../../controllers/log/signInControl");

router.get("/", getUserTest);
router.post("/", signIn);

module.exports = router;
