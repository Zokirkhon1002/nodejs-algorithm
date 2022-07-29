const express = require("express")
const router = express.Router()
const {User, userValidate } = require("../../models/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv/config")

router.post("/", async(req, res)=>{
    try{
        // inputdagi qiymatlarni tekshirish yani schema ga mosligini
        const {error} = userValidate(req.body)
        if(error){
            return res.json({msg:error.details[0].message, user: {}, state: false })
        }
        // aynan shu username bazada borligini tekshiradi
        const user = await User.findOne({username: req.body.username})
        if(!user){
            return res.json({msg:"username is not defined", user: {}, state: false } )
        }
        // password to'g;riligini tekshiradi
        const validUser = await bcrypt.compare(req.body.password, user.password)
        if(!validUser){
            return res.json({msg:"password is incorrect", user: {}, state: false })
        }

        let token = jwt.sign(
            { username: user.username, _id: user._id }, 
            process.env.private_key, 
            {expiresIn: 60 * 60 * 24} )

        res.json({msg: "Successfully sign in", user: {token}, state: true})
    }
    catch{
        res.json("something went wrong")
    }
})



module.exports = router