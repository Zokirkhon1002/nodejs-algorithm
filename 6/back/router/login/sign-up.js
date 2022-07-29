const express = require("express")
const router = express.Router()
const {User, userValidate } = require("../../models/userSchema")
const bcrypt = require("bcrypt")

router.get("/", async(req, res)=>{
    const users = await User.find()
    res.json(users)
})

router.post("/", async(req, res)=>{
    try{
        const {error} = userValidate(req.body)
        if(error){
            return res.json({msg:error.details[0].message, user: {}, state: false } )
        }
        const {username, password} = req.body

        const user = await User.findOne({username})
        if(user){
            return res.json({msg:"username is already been declared", user: {}, state: false } )
        }

        const newUser = await User.create({username, password})

        const salt = await bcrypt.genSalt(10)
        newUser.password = await bcrypt.hash(newUser.password, salt)

        const savedUser = await newUser.save()

        res.json({msg:"successfully user is saved", user: savedUser, state: true })
    }
    catch{
        res.json("something went wrong")
    }
})



module.exports = router
