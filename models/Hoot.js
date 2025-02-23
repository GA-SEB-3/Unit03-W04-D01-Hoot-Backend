const {Schema, model} = require("mongoose")

const commentSchema = new Schema({
    text:{
        type:String,
        required:true
    },
    author:{
        type: Schema.Types.ObjectId,
        ref:"User"
       }
},{timestamps:true})

const hootSchema = new Schema({
   title:{
    type:String,
    required:true
   },
   text:{
    type:String,
    required:true,
    maxLength:240
   },
   category:{
    type:String,
    requied:true,
    enum:['News', 'Sports', 'Games', 'Movies', 'Music', 'Television']
   },
   author:{
    type: Schema.Types.ObjectId,
    ref:"User"

   },
   comments:[commentSchema]
},{timestamps:true}
)
