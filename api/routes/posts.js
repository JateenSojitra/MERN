const router=require("express").Router();
const User=require("../models/User");
const Post=require("../models/Post");
const Comment=require("../models/Comment");
// const [post,setPost]=useState({})
const Username = 'admin';

router.post("/:id/comments",async(req,res)=>{
    //  console.log(req.params.id);
    // console.log(req.body.comment);

    try{
        const newComment=new Comment(req.body);

        // const newComment=new Comment({
            
        //     author:req.body.username,
        //     comment:req.body.comment,
        // });
        //  Post.findById(req.params.id,(err,Post)=>{
        //     if(err){
        //         console.log(err)
        //     }
        //     else{
        //         console.log(Post.comments)
        //     }
        //  })
        const saveComment= await newComment.save();
        res.status(200).json(saveComment)
        // res.redirect("/");
    }
    catch(err){
        res.status(500).json(err)
    }
});

//comment
router.get("/getComments/:id",async(req,res)=>{

    const comment = await Comment.find({postId:req.params.id});
    if(comment!=null){
        res.status(200).json(comment)
    }
    else{
        res.status(401).json("you can't show a comment");
    }
})

//Create new post
router.post("/",async(req,res)=>{
    const newPost=new Post(req.body);
    try{
 
        res.status(200).json(savePost)
        
        
    }
    catch(err){
        res.status(500).json(err)
    }
});

//Update post
router.put("/:id",async(req,res)=>{
    try{

        // const {user}=useContext(Context)
        
        const post =await Post.findById(req.params.id);
        // const user= await User.findOne(req.body.username);
        if(post.username == req.body.username  || Username){
        // if(post.username == req.body.username || user.username === "admin" ){

            try{
                const updatedPost=await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body,
                },
                {new:true}
                );
                res.status(200).json(updatedPost);
            }
            catch(err){

                res.status(500).json(err);
            }
        }
        else{
            res.status(401).json("you can update only your post!");
        }
    }
    catch(err){
        res.status(500).json(err)
    }
})
//DElete post
router.delete("/:id",async(req,res)=>{
    try{

        const post =await Post.findById(req.params.id);
        // const user= await User.find(req.body.username);

        // if(post.username == req.body.username || user.username === "admin"){
        if(post.username == req.body.username || Username){

            try{
                // const p=await  post.delete();
                // res.status(200).json(p);

                await  post.delete();
                res.status(200).json("post has been deleted..");
            }
            catch(err){

                res.status(500).json(err);
            }
        }
        else{
            res.status(401).json("you can delete only your post!");
        }
    }
    catch(err){
        res.status(500).json(err)
    }
})


//likes and dislike post
 router.put("/:id/like",async(req,res)=>{
     try{
         const post=await Post.findById(req.params.id);
         if(!post.likes.includes(req.body.username)){
             await post.updateOne({$push:{likes:req.body.username}});
             res.status(200).json("The post has been liked");

         }
         else{
             await post.updateOne({$pull:{likes:req.body.username}});
             res.status(200).json("The post has been disliked");
         }

     }
     catch(err){
         res.status(500).json(err);
     }

 });

 //Comment post
/* router.put("/:id/comment",async(req,res)=>{
    const comment={
        text:req.body.text,
        //postedBy:req.user._id,
        postedBy:req.params._id,
       //  username:req.body.username,
    }
    try{
        const post=await Post.findById(req.params.id);
        await post.findByIdAndUpdate({$push:{comments:comment}});
        res.status(200).json("Comment added successfully");

       

    }
    catch(err){
        res.status(500).json(err);
    }

});*/

/*router.put("/:id/comment",async(req,res)=>{
     const comment={
         text:req.body.text,
         //postedBy:req.user._id,
         postedBy:req.User._id,
        //  username:req.body.username,
     }
    Post.findByIdAndUpdate(req.body.params,{
        $push:{comments:comment}
    },{
        new:true
    })
    // .populate("comments.username","name")
    // .populate("comments.postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
             res.json(result)
        }
    })

});*/

//Get post
router.get("/:id",async(req,res)=>{
    try{

        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err);
    }
})

//Get all post
router.get("/",async(req,res)=>{
    const username=req.query.user;
    const catName=req.query.cat;
    try{
        let posts;
        if(username){
            posts=await Post.find({username}).lean()
        }
        else if(catName){
            posts=await Post.find({categories:{
                $in:[catName]
            }}).lean()
        }
        else{
            posts=await Post.aggregate([{ $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "postId",
                as: "totalComments"
            } },
            { $addFields: { 
                totalComments: { $size: "$totalComments" }
            } }]);
        }
        res.status(200).json(posts);
    }
    catch(err){
        res.status(500).json(err);
    }
})




module.exports=router;