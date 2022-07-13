import mongoose from "mongoose";
import Joi from "joi";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  url: {
    type: Array,
  },
  category: {
    type: String,
    required: true,
  },
});

const Products = mongoose.model("mernstack", productSchema);

const validateProduct = (body) => {
  let newSchema = Joi.object({
    title: Joi.string().required().min(3),
    price: Joi.string().required(),
    url: Joi.string().required(),
    category: Joi.string().required().min(3),
  });

  return newSchema.validate(body);
};

export { Products, validateProduct };
