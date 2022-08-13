// package.json file replace with scripts  /"test": "echo \"Error: no test specified\" && exit 1"/

const express =require("express");
const app=express();
const dotenv=require("dotenv");
const mongoose= require("mongoose");
const authRoute=require("./routes/auth");
const userRoute=require("./routes/users");
const postRoute=require("./routes/posts");
const categoryRoute=require("./routes/categories");
const contactRoute=require("./routes/contacts");
const multer=require("multer");
const path = require("path");


dotenv.config();
app.use(express.json())
app.use("/images", express.static(path.join(__dirname,"/images")))
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true,
    // useFindAndModify:true

}).then(console.log("console log connect"))
.catch((err)=>console.log(err));

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },
    filename:(req,file,cb)=>{
        // cb(null,"hello.jpg");
        cb(null,req.body.name);
    },
})

const upload=multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("file has been uploded")
})


app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/categories",categoryRoute);
app.use("/api/contacts",contactRoute);

// app.use(function(req,res,next){

//     user=req.user;
//     next();
// });



// console.warn("nodemon");

// app.use("/sam",(req,res)=>{
//     console.log("hey this is sam url ")
// })

app.listen(2000,()=>{
    console.warn("backend is running");
})