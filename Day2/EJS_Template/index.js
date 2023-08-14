const express = require("express");
const ejs = require("ejs");
var app = express();

app.set("view engine","ejs");

app.get("/user", (req, res) => {
    var users = {
        name: "Ngo Minh Khoi",
        email: "nmk@gmail.com",
        address: "Ha Noi"
    }
    res.render('user',users);
});

app.get("/product", (req, res) => {
    var products = {
        
        product: [
            {
                name: "AAAA",
                price: "12",
                quantity: "123123"
            },
            {
                name: "BBBB",
                price: "3",
                quantity: "1231"
            },
            {
                name: "CCCC",
                price: "23",
                quantity: "111"
            }
        ]
    }
    res.render('product', products);
});

app.listen(9000,"127.0.0.1",()=>{
    console.log("Listening to request on port 9000");
});