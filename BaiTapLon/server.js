var express = require('express');
var ejs = require("ejs");
var mongoose = require('mongoose');
var dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

var app = express();

app.set("view engine","ejs");

mongoose.connect(process.env.DATABASE_LOCAL)
        .then(() => {
            console.log("Connection successful");
        })
        .catch((err) => console.error("Create false", err))
        .finally(() => {
            console.log("finally....")
        });

var userSchema = mongoose.Schema({
    userId: Number,
    username: {
        type: String
    },
    fullname: String,
    address: String,
});

const User = mongoose.model("User", userSchema);
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.post("/", (req, res) => {
    console.log("Create....");
    const newUser = new User(req.body);
    newUser
        .save()
        .then((doc) => {
            console.log(doc);
            res.status(201).json({message: "User create successful", data: doc});
        })
        .catch((err) => {
            console.error("Error create", err);
            res.status(500).json({ error: "Unable"});
        });
});

app.get("/", (req, res) => {
    User.find({})
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error("Error fetching", err);
            res.status(500).json({ error: "Unable"});
        });
});

app.delete("/:userId", (req, res) => {
    const userId = req.params.userId;
    User.findOneAndDelete({ userId: userId})
        .then((deletedUser) => {
            if (deletedUser) {
                res.status(200).json({ message: "User deleted successfully", data: deletedUser });
            } 
            else {
                res.status(404).json({ error: "User not found" });
            }
        })
        .catch((err) => {
            console.error("Error delete", err);
            res.status(500).json({ error: "Unable"});
        });

});

app.get("/add", (req, res) => {
    res.render("user");
});

app.post("/add", (req, res) => {
    console.log("Create....");
    const newUser = new User({
        userId: req.body.userId,
        username: req.body.username,
        fullname: req.body.fullname,
        address: req.body.address
    });

    newUser
        .save()
        .then((doc) => {
            console.log(doc);
            res.status(201).json({message: "User create successful", data: doc});
        })
        .catch((err) => {
            console.error("Error create", err);
            res.status(500).json({ error: "Unable"});
        });
});

app.get("/del", (req, res) => {
    res.render("delete");
});

app.delete("/del/:userId", (req, res) => {
    console.log("Delete....");
    console.log(req.params.userId);
    const userId = req.params.userId;

    User.findOneAndDelete({ userId: userId })
        .then((deletedUser) => {
            if (deletedUser) {
                res.status(200).json({ message: "User deleted successfully", data: deletedUser });
            } else {
                res.status(404).json({ error: "User not found" });
            }
        })
        .catch((err) => {
            console.error("Error deleting user", err);
            res.status(500).json({ error: "Unable to delete user" });
        });
});


app.listen(9000,"127.0.0.1",()=>{
    console.log("Listening to request on port 9000");
});