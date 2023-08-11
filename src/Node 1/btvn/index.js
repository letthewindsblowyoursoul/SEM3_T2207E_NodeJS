const express=require("express");
const btvn=express();
const port=9002;
//Use Get mothod
btvn.get('/',(req,res)=>{
    res.status(200).send("Server say hello client");
});
//Use Post mothod
btvn.post('/',(req,res)=>{
    res.status(200).send("Post btvn");
});
btvn.put('/',(req,res)=>{
    res.status(200).send("put btvn");
});
btvn.delete('/',(req,res)=>{
    res.status(200).send("delete btvn");
});
btvn.listen(port,"127.0.0.1",()=>{
    console.log("Listening to request on port 9002");
})