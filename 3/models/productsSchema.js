const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 3,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    min: 3,
  },
});

const Products = mongoose.model("product", productSchema);

const validateProduct = (body) => {
  let newSchema = Joi.object({
    title: Joi.string().required().min(3),
    price: Joi.number().required(),
    category: Joi.string().required().min(3),
  });

  return newSchema.validate(body);
};

module.exports = {
  Products,
  validateProduct,
};
