const express = require("express");
var mongoose = require("mongoose");
const fs = require("fs");
var dotenv = require("dotenv");
const ejs = require("ejs");
const path = require('path')



dotenv.config({ path: "./config/config.env" });

var app = express();
app.use(express.static("public"));
app.use('/', express.static(path.join(__dirname, "node_modules/bootstrap/dist")))
app.use("/", express.static("node_modules/bootstrap/dist/"))
app.use(express.urlencoded({ extended: true }));


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

//--------------------------------------------------------------------------//

app.get("/", async (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*",
    });
    try {
        const users = await User.find();
        res.render('Home.ejs', { users });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

//--------------------------------------------------------------------------//


app.post("/post", (req, res) => {
    const newUser = new User(req.body);
    newUser.save()
        .then((doc) => {
            console.log(doc);
            res.status(201).json({ message: "User created successful", data: doc })
        })
        .catch((err) => {
            console.error("Erro creating user", err);
            res.status(500).json({ error: "Unale to create user" })
        })
})

//--------------------------------------------------------------------------//

app.delete('/delete/:id', async (req, res) => {
    try {
        const userId = req.params.userId;
        await User.findOneAndDelete({ UserId: userId });
        res.status(200).send('User deleted successfully');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }

});

app.listen(8080, () => {
    console.log("Port 8080")
})