const router = require('express').Router()
const Hoot = require("../models/Hoot")
const verifyToken = require("../middleware/verify-token")

router.get("/",verifyToken,async(req,res)=>{
    try{
        const allHoots = await Hoot.find()
        res.json(allHoots)    
    }
    catch(err){
        res.status(500).json({err:err.message})
    }
})


router.post("/",verifyToken,async(req,res)=>{
    try{
        // add the id from the token to the body so we can save the author in the DB
        req.body.author = req.user._id
        // creating the new Hoot in my DB
        const newHoot = await Hoot.create(req.body)
        newHoot.author = req.user
        // Returning the response
        res.status(201).json(newHoot)

    }catch(err){
        res.status(500).json({err:err.message})
    }
})


module.exports = router