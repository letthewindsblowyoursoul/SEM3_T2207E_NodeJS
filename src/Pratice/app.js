var express = require('express');
var mongoose = require('mongoose');
var dotenv = require('dotenv');

dotenv.config({ path: "./config.env"});
var app = express();

mongoose.connect(process.env.DATABASE_LOCAL)
                .then(() => {
                    console.log("Connect successfull");
                })
                .catch((err) => console.error("Connect failed:",err))
                .finally(() => {
                    console.log("Finally...");
})

                var userSchema = mongoose.Schema({
                    userID: {
                        type: String
                    },
                    username: String,
                    fullname: String,
                    address: String,
});
                
const User = mongoose.model("User", userSchema);
app.use(express.json());

app.post("/user", (req , res) => {
    const newUser = new User(req.body);

    newUser
    .save()
    .then((doc) => {
        console.log(doc);
        res.status(201).json({message: "User create successfully", data : doc});
    })
    .catch((err) => {
        console.error("Error creating user:", err);
        res.status(500).json({error : "Unable to create user"});
    })
});

app.listen(9000,"127.0.0.1",()=>{
    console.log("Listening to request on port 9000");
});