const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema.Types
const PostSchema =new mongoose.Schema({
    // userId:{
    //     type:String,
    //     required:true
    // },

    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:false
    },
    // likes:[{type:ObjectId,ref:"User"}],
    likes:{
        type:Array,
        default:[],
    },
    // comments:[
    //     {type:ObjectId,
    //     ref:"Comment"}
    // ],
    // comments:[{
    //     text:String,
    //     created:{type:Date,default:Date.now},
    //     postedBy:{
    //             type:ObjectId,
    //             ref:"User",
    //         }
    //     username:{
    //         type:String,
    //         ref:"User",
    //     }
    // }],
    // postedBy:{
    //     type:ObjectId,
    //     ref:"User",
    // },
    username:{
        type:String,
        required:true
    },
    categories:{
        type:Array,
        required:false
    },
    
},{timestamps:true});

module.exports=mongoose.model("Post",PostSchema);