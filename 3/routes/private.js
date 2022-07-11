const {Router} = require("express");
const router = Router();
const { auth } = require("../middleware/auth");

router.get("/", auth, privateRoute);

async function privateRoute(req, res) {
  res.json(req.user);
}

module.exports = router;
