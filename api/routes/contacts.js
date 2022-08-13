const router=require("express").Router();
const Contact=require("../models/Contact")

router.post("/contacts",async(req,res)=>{

    try{
        const newCon=new Contact(req.body);

        // const newComment=new Comment({
            
        //     author:req.body.username,
        //     comment:req.body.comment,
        // });
        const saveCon= await newCon.save();
        res.status(200).json(saveCon)
        // res.redirect("/");
    }
    catch(err){
        res.status(500).json(err)
    }
});

module.exports=router;