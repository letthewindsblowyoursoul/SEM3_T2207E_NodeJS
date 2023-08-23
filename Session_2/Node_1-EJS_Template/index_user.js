const express = require('express');
const ejs = require('ejs');
const app = express();

//set view engine
app.set("view engine", "ejs");

app.get("/user",(req,res)=>{
    var users = {
        name : "Vu Xuan Du",
        email: "vudu151@gmail.com",
        address: "Ha Noi"
    };
    res.render('user',users);
});
const port = 9007;
app.listen(port,()=>{
    console.log(`Listening on ${port}`);
});