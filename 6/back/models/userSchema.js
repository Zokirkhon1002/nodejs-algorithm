const mongoose = require("mongoose")
const joi = require("joi")
const Joi = require("joi")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("user", userSchema)

const userValidate = (body)=>{
    const schema = Joi.object({
        username: Joi.string().required().min(3).max(50),
        password: Joi.string().required().min(8).max(50)
    })
    return schema.validate(body)
}

exports.User = User
exports.userValidate = userValidate