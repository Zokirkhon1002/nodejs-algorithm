const jwt = require("jsonwebtoken")
require("dotenv/config")

module.exports = function  auth(req, res, next){
    // tekshirish ikki qismdan iborat bo'ladi
    
    // 1. token bormi
    const token = req.header("token")
    if(!token){
        return res.json({msg:"Token is not defined", state: false})
    }

    // 2. token haqiqiymi
    try{
        const decoded = jwt.verify(token, process.env.private_key)
        req.user = decoded
        next()
    }
    catch{
        return res.json({msg: "Invalid token", state: false})
    }

}
