const { Router } = require("express");
const router = Router();
const {
  createUser,
  getUserTest,
} = require("../../controllers/log/signUpControl");

router.get("/", getUserTest);
router.post("/", createUser);

module.exports = router;
