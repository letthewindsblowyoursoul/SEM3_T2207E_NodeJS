const express = require("express");
const fs = require("fs");

var app = express();

var user = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`));
app.get('/api/v1/users', (req,res)=>{
    res.status(200).json({
        status : "Success",
        data: {
            user,
        },
    });
});

app.listen(9000,  ( req,res)=>{
    console.log('listening on ...');
});