const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 100,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 50,
  },
});

const validateUser = (body) => {
  const user = Joi.object({
    username: Joi.string().required().min(3).max(100),
    password: Joi.string().required().min(8).max(50),
  });

  return user.validate(body);
};

const Users = mongoose.model("user", userSchema);

module.exports = { Users, validateUser };
