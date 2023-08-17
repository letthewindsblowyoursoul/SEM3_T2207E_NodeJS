const express = require("express");
var mongoose = require("mongoose");
const fs = require("fs");
var dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });



var app = express();

mongoose.connect(process.env.DATABASE_LOCAL)
.then(()=>{
    console.log("Connection succesful");
})
.catch((err) => {console.error("Connecttion fail",err)})
.finally(()=>{
    console.log("finally..");
})


var userSchema = mongoose.Schema ({
    username:{
        type: String,
    },
    fullname :String,
    age: Number,
    address : String,

});
const User = mongoose.model("User", userSchema);
app.use(express.json());
app.post("/user", (req, res) =>{
    const newUser = new User(req.body);
    newUser.save()
    .then((doc) => {
        console.log(doc);
        res.status(201).json({ message: "User created successful" , data: doc})
    })
    .catch((err) => {
        console.error("Erro creating user", err);
        res.status(500).json({ error: "Unale to create user" })
    })
})




app.listen(8080,() => {
    console.log("Port 8080")
})