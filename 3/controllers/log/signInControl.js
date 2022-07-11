// @ts-nocheck
const { User, validateUser } = require("../../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Method: GET
// Desc:   Get users test
const getUserTest = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      state: true,
      msg: "success",
      data: users,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

// Method: POST
// Desc: user singing in (auth)
const signIn = async (req, res) => {
  try {
    const { body } = req;
    const { error } = validateUser(body);
    if (error) {
      return res.status(400).json({
        state: false,
        msg: error.details[0].message,
        data: error,
      });
    }
    const { username, password } = body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        state: false,
        msg: "username or password is not match",
        data: user,
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(404).json({
        state: false,
        msg: "username or password is not match",
        data: validPassword,
      });
    }

    // watch out!!!!!
    // private key
    let privateKey = process.env.PRIVATE_KEY;

    // creating token
    let token = jwt.sign(
      { username: user.username, _id: user._id },
      privateKey,
      { expiresIn: 60 }
    );

    // authName
    let authName = process.env.AUTH_TOKEN_NAME;

    res.header(authName, token).json({
      state: true,
      msg: "success",
      data: true,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  getUserTest,
  signIn,
};
