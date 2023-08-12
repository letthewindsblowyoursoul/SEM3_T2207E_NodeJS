const express = require('express');
var app = express();

//set view engine

app.set("view engine","jade")

app.get('/',(req,res)=>{
    res.render('Sample');
});

app.listen(9004,()=>{
    console.log("Start listening on 9004");
});