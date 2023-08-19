var express = require('express');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
const uniqueValidator = require('mongoose-unique-validator');

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
                    userid: { type: Number, unique: true },
                    username: String,
                    fullname: String,
                    address: String,
});

userSchema.plugin(uniqueValidator);
                
const User = mongoose.model("User", userSchema);
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*",
    });
 
    // res.send("Hello World");
    return res.redirect("index.html");
});


app.post("/add-user", async (req , res) => {
    const { username, fullname, address } = req.body;

    
    const newUser = new User({
        username,
        fullname,
        address
      });

    await newUser
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