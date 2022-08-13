const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema.Types
const commentSchema=new mongoose.Schema({
    postId:{type:ObjectId,
            ref:"Post"      },
    author:{type:String,
            require:true},
    comment:{type:String,
            require:true},
},{timestamps:true});
 
module.exports=mongoose.model("Comment",commentSchema);