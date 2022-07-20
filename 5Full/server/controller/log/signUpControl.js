// @ts-nocheck
import { User, validateUser } from "../../modules/userSchema.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
config();

// Method: POST
// Desc: Creating a new user
const createAdmin = async (req, res) => {
  try {
    const { body } = req;
    const { error } = validateUser(body);
    if (error) {
      return res.status(400).json({
        state: false,
        msg: error.details[0].message,
        data: [],
      });
    }

    const { username, password } = body;

    const user = await User.findOne({ username });
    if (user) {
      return res.status(401).json({
        state: false,
        msg: "This username has already been used",
        data: [username],
      });
    }

    const newUser = await User.create({ username, password });
    const saltEnv = process.env.SALT_FOR_HASH;
    const salt = await bcrypt.genSalt(Number(saltEnv));

    newUser.password = await bcrypt.hash(newUser.password, salt);

    const savedUser = await newUser.save();

    if (!savedUser) {
      return res.status(401).json({
        state: false,
        msg: "can not saved",
        data: savedUser,
      });
    }

    res.status(201).json({
      state: true,
      msg: "successfully created",
      user: savedUser,
    });
  } catch (err) {
    res.status(500).json({
      state: false,
      msg: err,
      data: [],
    });
  }
};

export { createAdmin }
