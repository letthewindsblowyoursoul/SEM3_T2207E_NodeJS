const express = require("express");
const fs = require("fs");
var app = express();
var user = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`));
var PORT = process.env.PORT||3900
app.listen(PORT, (req,res) => {
    console.log("server is running...");
 });
 

app.get('/app',(req,res)=>{
res.status(200).json({
    status:"success",
    data:{
        user,
    },
});
});

app.get('/app/detail',(req,res)=>{
    var paramId = req.query.id
    var paramName = req.query.Username
    var detail;
    for(var i = 0; i < user.length; i++ ){
            if(paramId== user[i].id || paramName == user[i].Username ){
                detail = user[i];
            }
    }
    res.status(200).json({
        data:{
            
           detail,
        },
    });
})
 

