const { Users, validateUser } = require("../../models/userSchema");
const bcrypt = require("bcrypt");

// Method: GET
// Desc:   Get users test

const getUserTest = async (req, res) => {
  const users = await Users.find();
  res.json(users);
};

// Method: POST
// Desc:   signing in a User
const signIn = async (req, res) => {
  try {
    const { body } = req;
    const { error } = validateUser(body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const { username, password } = body;

    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(404).json({
        msg: "username or password is not match",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(404).json({
        msg: "username or password is not match",
      });
    }

    res.json({
      msg: "success",
      user,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};
module.exports = {
  getUserTest,
  signIn,
};
