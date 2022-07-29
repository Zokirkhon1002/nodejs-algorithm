const mongoose = require("mongoose")
const Joi = require("joi")

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    url: {
        type: Array
    },
    category: {
        type: String,
        required: true
    }
})

const Products = mongoose.model("product", productSchema)

const validateProduct = (body)=>{
    let schema = Joi.object({
        title: Joi.string().required().min(3).max(1024),
        price: Joi.string().required().min(3).max(1024),
        url: Joi.array(),
        category: Joi.string().required().max(1024)
    })
    return schema.validate(body)
}

exports.Products = Products
exports.validateProduct = validateProduct