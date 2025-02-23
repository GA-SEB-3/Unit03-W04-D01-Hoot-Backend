const router = require('express').Router()
const Hoot = require("../models/Hoot")
const verifyToken = require("../middleware/verify-token")

router.get("/",verifyToken,async(req,res)=>{
    try{
        const allHoots = await Hoot.find().populate([
            "author",
            "comments.author"
        ])
        res.json(allHoots)    
    }
    catch(err){
        res.status(500).json({err:err.message})
    }
})

// Exercise 1: create the route for getting 1 Hoot
// hints: /:hootId, findById(), req.params.hootId

router.get("/:hootId",verifyToken,async(req,res)=>{
    try{
        const foundHoot = await Hoot.findById(req.params.hootId)
        res.json(foundHoot)

    }catch(err){
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


router.put("/:hootId",verifyToken,async(req,res)=>{
    try{
           // 1. find the tweet that matches the Id
    const foundTweet = await Hoot.findById(req.params.hootId)
    // 2. check if the person sending the request wrote the tweet

    console.log(foundTweet.author)
    console.log(req.user._id)
        if(!foundTweet.author.equals(req.user._id)){
           return res.status(409).json({err:"Cannot edit tweet that you didnt make"})
        }
    // 3. update the tweet with the new information
        const updatedHoot = await Hoot.findByIdAndUpdate(req.params.hootId,req.body,{new:true})
    // 4. send backt the updated tweet
    res.json(updatedHoot)
    }
    catch(err){
        res.status(500).json({err:err.message})
    }
})

router.delete("/:hootId",verifyToken,async(req,res)=>{
    try{
        const {hootId} = req.params
        console.log("first")
        // 1. find the tweet by the id
        const foundHoot = await Hoot.findById(req.params.hootId)
        // 2. check if the id matches the id of the user who sent the request
        console.log("After finding in DB")
        if(!foundHoot.author.equals(req.user._id)){
            return res.status(409).json({err:"Cannot delete tweet that you didnt make"})
         }
         console.log("after validation")

        // 3.Delete the tweet
        const deletedHoot = await Hoot.findByIdAndDelete(req.params.hootId)

        console.log(deletedHoot)

        // 4. send back the deleted tweet
        res.json(deletedHoot)
    }
    catch(err){
        res.status(500).json({err:err.message})
    }
})


router.post("/:hootId/comment",verifyToken,async(req,res)=>{
    try{
        req.body.author = req.user._id
        // 1. find the hoot by the Id
        const foundHoot = await Hoot.findById(req.params.hootId)
        console.log(foundHoot)

        // 2. add the comment to the hoot
        foundHoot.comments.push(req.body)

        // 3. Save the hoot with the new comment
        foundHoot.save()

        // 4. send back the comment created
        res.status(201).json(foundHoot)
    }  catch(err){
        res.status(500).json({err:err.message})
    }
})

module.exports = router