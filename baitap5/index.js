const express = require("express");
var mongoose = require('mongoose');
var dotenv = require('dotenv');
dotenv.config({ path: "./config.env" })
const fs = require("fs");

var app = express();

mongoose.connect(process.env.DATABASE_LOCAL).then(() => { console.log('DB Connected!'); })
    .catch((err) => { console.error('DB connection error:', err.message); })
    .finally(() => {
        console.log("Running");
    })







const Author = require(`${__dirname}/models/author.js`)

const Book = require(`${__dirname}/models/book.js`)


var userSchema = mongoose.Schema({
    username: {
        type: String,
    },
    fullname: String,
    age: Number,
    address: String,

});


const User = mongoose.model("User123", userSchema);
app.use(express.json());
app.post("/user", (req, res) => {
    const newUser = new User(req.body);
    const user1 = new User({
        username: 'user1',
        fullname: 'usera',
        age: 23,
        address: 'a'
    }
    );
    var jamieAuthor = new Author({
        _id: new mongoose.Types.ObjectId(),
        name: {
            firstName: 'Jamie',
            lastName: 'Munro'
        },
        biography: 'Jamie is the author of ASP.NET MVC 5 with Bootstrap and Knockout.js.',
        twitter: 'https://twitter.com/endyourif',
        facebook: 'https://www.facebook.com/End-Your-If-194251957252562/'
    });
    var mvcBook = new Book({
        _id: new mongoose.Types.ObjectId(),
        title: 'ASP.NET MVC 5 with Bootstrap and Knockout.js',
        author: jamieAuthor._id,
        ratings: [{
            summary: 'Great read'
        }]
    });
   
    var knockoutBook = new Book({
        _id: new mongoose.Types.ObjectId(),
        title: 'Knockout.js: Building Dynamic Client-Side Web Applications',
        author: jamieAuthor._id
    });

    
    jamieAuthor.save()
    .then( (doc)  => {
       // if (err) throw err;
       console.log(doc);
       res.status(200).json({ message: "Author successfully saved.", data: doc })
        })
    .catch((err) => {
        console.error("Erro creating user", err);
        res.status(500).json({ error: "Unale to create user" })
    })
    
    knockoutBook.save()
    /*.then((doc) => {
        //if (err) throw err;
        //console.log(doc);
        //res.status(200).json({ message: "Book successfully saved. ", data: doc })
    })
    .catch((err) => {
        console.error("Erro creating user", err);
        res.status(500).json({ error: "Unale to create user" })
    }) */

    mvcBook.save()
    /*.then((doc)=> {
        //if (err) throw err;
       // console.log(doc);
  // res.status(200).json({ message: "Book successfully saved. ", data: doc })
         
    })
    .catch((err) => {
        console.error("Erro creating user", err);
        res.status(500).json({ error: "Unale to create user" })
    })*/

    user1.save()
    newUser.save()
       /* .then((doc) => {
            console.log(doc);
            res.status(200).json({ message: "User created successful", data: doc })
        })
        .catch((err) => {
            console.error("Erro creating user", err);
            res.status(500).json({ error: "Unale to create user" })
        }) */
})
app.listen(2512, () => {
    console.log("Player Log in");
})