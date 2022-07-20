import mongoose from "mongoose";
import Joi from "joi";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    reuquired: true,
  },
});

const User = mongoose.model("mernStackUser", userSchema);

const validateUser = (/** @type {Object} */ body) => {
  const user = Joi.object({
    username: Joi.string().required().min(3).max(100),
    password: Joi.string().required().min(8).max(50),
  });

  return user.validate(body);
};

export { User, validateUser };
