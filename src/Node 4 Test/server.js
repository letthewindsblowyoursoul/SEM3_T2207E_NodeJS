var express = require("express");
var mongoose = require("mongoose");
var dotenv = require("dotenv");

dotenv.config({path: "./config.env"});
var app = express();



mongoose.connect(process.env.DATABASE_LOCAL)
        .then(()=> {
            console.log("Connection successful");
        })
        .catch((err)=> console.error("Connection failed",err))
        .finally(()=>{
            console.log("finally...")
        });


const userSchema = new mongoose.Schema({
    username:{
        type:String
    },
    fullname:String,
    age:Number,
    address:String
});
const User = mongoose.model("User", userSchema);
app.use(express.json());



app.post("/user",(req,res)=>{
    console.log("create new user");
    const newUser = new User(req.body);
    newUser
        .save()
        .then((doc)=>{
            console.log(doc);
            res.status(201).json({message: "User created successfully", data: doc})
        .catch((err)=>{
            console.error("Error creating user:",err);
            res.status(500).json({error: "Unable create sucessfull"});
            });
        });

});

app.listen(9009,"127.0.0.1",()=>{
    console.log("Listening to request on port");
});