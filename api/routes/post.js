
// const router=require("express").Router();
// const Comment=require("../models/Comment");


// // add comment
// router.post("/post/:id/comment",async(req,res)=>{
//     //  console.log(req.params.id);
//     // console.log(req.body.comment);
    
//     // const newComment=new Comment(req.body);
//     try{
//         const newComment=new Comment({
//             author:"samir",
//             Comment:req.body.Comment,
//         });

//         const saveComment= await newComment.save();
//         res.status(200).json(saveComment)
//         res.redirect("/");
        
        
//     }
//     catch(err){
//         res.status(500).json(err)
//     }
// });

// module.exports=router;