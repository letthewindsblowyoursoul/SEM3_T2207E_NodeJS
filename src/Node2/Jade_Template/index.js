const express=require("express");
const app=express();
const jade=require("jade");

app.set("view engine","jade");
app.get("/user",(req,res)=>{
    var users={
        name:"Nguyen Van Binh",
        email:"nvbinh@gmail.com",
        address:"Ha Noi"
    };
    res.render('user',users);
});

app.listen(9006,()=>{
    console.log("Star listen on 9006");
});