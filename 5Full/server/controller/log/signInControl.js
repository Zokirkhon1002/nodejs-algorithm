// @ts-nocheck
import { User, validateUser } from "../../modules/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

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
        data: [],
      });
    }
    const { username, password } = body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        state: false,
        msg: "username or password is not match",
        data: [],
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(404).json({
        state: false,
        msg: "username or password is not match",
        data: [],
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

    res.status(200).json({
      state: true,
      msg: "successfully logged in",
      "auth-token": token,
    });
  } catch (err) {
    res.status(500).json({
      state: false,
      msg: err,
      data: [],
    });
  }
};

export { signIn };
