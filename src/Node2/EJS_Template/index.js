const express=require('express');
const ejs=require('ejs');

var app=express();

app.set("view engine","ejs");
app.get("/user",(req,res)=>{
    var users={
        name:"Nguyen Van Binh",
        email:"nvbinh@gmail.com",
        address:"Ha Noi"
    };
    res.render('user',users);
});
app.get("/product",(req,res)=>{
    var products={
        name:"Iphone 14",
        price:"200.000",
        category:"phone",
    };
    res.render('product',products);
});
app.listen(9000,"127.0.0.1",()=>{
    console.log("Listening to request on port 9000");
});