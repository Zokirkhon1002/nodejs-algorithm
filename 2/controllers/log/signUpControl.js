const { Users, validateUser } = require("../../models/userSchema");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Method: GET
// Desc:   Get users test
const getUserTest = async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    res.send(err);
  }
};

// Method: POST
// Desc:   creating new User
const createUser = async (req, res) => {
  try {
    const { body } = req;
    const { error } = validateUser(body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const { username, password } = body;

    const user = await Users.findOne({ username });
    if (user) {
      return res.json("This user name has already ben used");
    }

    let newUser = await Users.create({
      username,
      password,
    });

    const saltEnv = process.env.SALT_FOR_HASH;

    const salt = await bcrypt.genSalt(Number(saltEnv));
    newUser.password = await bcrypt.hash(newUser.password, salt);

    const savedUser = await newUser.save();

    res.status(201).json({
      msg: "successfully created",
      user: savedUser,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  getUserTest,
  createUser,
};
