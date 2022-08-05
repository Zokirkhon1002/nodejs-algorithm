const mongoose = require("mongoose");
const Joi = require("joi");

const fileSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  urls: {
    type: Array,
  },
});

const Files = mongoose.model("file", fileSchema);

const validateFile = (body) => {
  let schema = Joi.object({
    title: Joi.string().required().min(3).max(1024),
    urls: Joi.array(),
  });
  return schema.validate(body);
};

exports.Files = Files;
exports.validateFile = validateFile;
