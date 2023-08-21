var express = require('express');
var mongoose = require('mongoose');
var dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

var app = express();

mongoose.connect(process.env.DATABASE_LOCAL)
        .then(() => {
            console.log("Connection successful");
        })
        .catch((err) => console.error("CF", err))
        .finally(() => {
            console.log("finally....")
        });

var userSchema = mongoose.Schema({
    username: {
        type: String
    },
    fullname: String,
    age: Number,
    address: String,
});

const User = mongoose.model("User", userSchema);
app.use(express.json());

app.post("/user", (req, res) => {
    console.log("Create....");
    const newUser = new User(req.body);
    newUser
        .save()
        .then((doc) => {
            console.log(doc);
            res.status(201).json({message: "User cs", data: doc});
        })
        .catch((err) => {
            console.error("Error create", err);
            res.status(500).json({ error: "Unable"});
        });
});

app.listen(9003,"127.0.0.1",()=>{
    console.log("Listening to request on port 9000");
});