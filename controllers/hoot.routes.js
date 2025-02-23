const router = require('express').Router()
const Hoot = require("../models/Hoot")
const verifyToken = require("../middleware/verify-token")

router.get("/",(req,res)=>{
    res.json({message:"All Hoots!"})
})


module.exports = router