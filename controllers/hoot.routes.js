const router = require('express').Router()
const Hoot = require("../models/Hoot")

router.get("/",(req,res)=>{
    res.json({message:"All Hoots!"})
})


module.exports = router