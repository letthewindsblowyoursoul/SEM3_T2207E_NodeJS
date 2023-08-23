const express = require('express');
const fs = require('fs');

var app = express();

var users = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`));  //Đọc và phân tích file JSON

// GET METHOD
app.get("/api/v1/users", (req, res) => {
    res.status(200).json({
        status: "Success",
        data: {
            users,
        },
    });
});


// POST METHOD
app.post("/api/v1/users", (req, res) => {
    
});


app.listen(9002, (req, res) => {
    console.log('Listening on ...');
});