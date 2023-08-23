const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = express();

//Set engine
app.set('view engine', 'ejs');

//Connect to MongoDB
mongoose.connect(process.env.DATABASE_LOCAL)
        .then(()=>{
            console.log("Connection successful");
        })
        .catch((err)=>{
            console.log("Connection failed: ", err);
        })
        .finally(()=>{
            console.log("finally...");
        });

//Create Schema Object
var userSchema = new mongoose.Schema({
    UserId: Number,
    Username: String,
    Fullname: String,
    Address: String,
});

//Get Schema User
const User = mongoose.model("User", userSchema);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Add User
app.post("/addUser",(req, res) =>{
    const newUser = new User(req.body);
    newUser
    .save()
    .then((doc) => {
        console.log(doc);
        res.status(201).json({ message: "User create user successful", data: doc });
    })
    .catch((err) =>{
        console.error("Error creat user", err);
        res.status(404).json({ error: "User create user failed"});
    });
});

//Get Users
app.get("/users", (req, res) =>{
    User.find()
    .then((users) =>{
        res.status(200).json(users);
    })
    .catch((err) =>{
        console.log("Error fetching users", err);
        res.status(500).json({error: "Unable to fetch users"});
    });
    //Mai xem lại phần render xem nó có ở đây không
})

//Delete User
app.delete('/deleteUser/:userId',(req,res) =>{
    const userId = req.params.userId;
    User.findOneAndDelete({UserId: userId})
    .then((deleteUser) =>{
        if(!deleteUser){
            return res.status(404).json({message: 'User not found'});
        }
        res.json({message: 'User deleted successfully', data:deleteUser});
    })
    .catch((err) => {
        console.error("Error: ", err);
        res.status(500).json({message: 'Unable to delete user'});
    });
});


// Handle route to render index.ejs
app.get('/', (req, res) => {
    res.render('index');
});


//Listening
const port = 9000;
app.listen(port, "127.0.0.1", ()=>{
    console.log(`Listening on ${port}`);
});