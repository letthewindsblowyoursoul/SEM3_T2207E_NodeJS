const express = require("express");

const port = 9001;
const app = express();

//Get
app.get('/',(req,res)=>{
    res.status(200).send("Get");
});
//Post
app.post('/',(req,res)=>{
    res.status(200).send("Post");
});
//Put
app.put('/',(req,res)=>{
    res.status(200).send("Put");
});
//Delete
app.delete('/',(req,res)=>{
    res.status(200).send("Delete");
});
app.listen(port,"127.0.0.1",()=>{
    console.log("Listening to request on port 9001");
});