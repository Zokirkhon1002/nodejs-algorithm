// @ts-nocheck
const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  try {
    // 1. token bormi?
    let authName = process.env.AUTH_TOKEN_NAME;
    const token = req.header(authName);
    if (!token) {
      return res.status(401).json({
        state: false,
        msg: "Token is not defined",
        data: false,
      });
    }

    // 2. token haqiqiymi
    try {
      let privateKey = process.env.PRIVATE_KEY;
      const decoded = jwt.verify(token, privateKey);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({
        state: false,
        msg: err,
        data: false,
      });
    }
  } catch (err) {
    res.status(500).json({
      state: false,
      msg: err,
      data: false,
    });
  }
};

module.exports = {
  auth,
};
