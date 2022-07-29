const express = require("express")
const router = express.Router()

const data = [
    {title: "Galaxy", price: 1450},
    {title: "iPhone", price: 1550},
    {title: "Red mi", price: 850}
]

router.get("/", async(req, res)=>{
    res.json({msg:"success", data: data, state: true})
})

module.exports = router